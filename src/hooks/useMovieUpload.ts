import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import MOVIE_API from '@/services/movie';
import { uploadingMovieIdAtom, uploadProgressAtom } from '@/atoms/movies';
import type { UploadedPart, MovieUploadRequest } from '@/types/movie';

// 청크 크기: 5MB
const CHUNK_SIZE = 5 * 1024 * 1024;

// 동시 업로드 청크 수
const CONCURRENT_UPLOAD_LIMIT = 5;

interface UploadResult {
    success: boolean;
    movieId?: number;
}

interface MovieUploadData {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    actor: string;
    file: File;
    customPrompts?: string[];
    customRetrievals?: string[];
}

const buildUploadRequest = (data: MovieUploadData, totalParts: number): MovieUploadRequest => {
    const request: MovieUploadRequest = {
        title: data.title,
        director: data.director,
        genre: data.genre,
        releaseDate: data.releaseDate,
        actor: data.actor,
        totalParts,
    };

    if (data.customPrompts && data.customPrompts.length > 0) {
        request.customPrompts = data.customPrompts;
    }

    if (data.customRetrievals && data.customRetrievals.length > 0) {
        request.customRetrievals = data.customRetrievals;
    }

    return request;
};

interface ChunkUploadTask {
    index: number;
    partNumber: number;
    presignedUrl: string;
    chunk: Blob;
}

/**
 * 동시성을 제한하여 청크를 병렬 업로드합니다.
 * @param tasks 업로드할 청크 작업 배열
 * @param concurrencyLimit 동시 업로드 제한 수
 * @param onProgress 진행률 콜백
 * @returns 업로드된 파트 정보 배열
 */
const uploadChunksWithConcurrency = async (
    tasks: ChunkUploadTask[],
    concurrencyLimit: number,
    onProgress: (completedCount: number, totalCount: number) => void
): Promise<UploadedPart[]> => {
    const results: UploadedPart[] = [];
    let completedCount = 0;
    let currentIndex = 0;

    const executeTask = async (): Promise<void> => {
        while (currentIndex < tasks.length) {
            const taskIndex = currentIndex++;
            const task = tasks[taskIndex];

            try {
                const etag = await MOVIE_API.uploadPart(task.presignedUrl, task.chunk);
                results.push({ partNumber: task.partNumber, etag });
                completedCount++;
                onProgress(completedCount, tasks.length);
                console.log(`[uploadChunksWithConcurrency] 청크 ${task.partNumber} 업로드 완료:`, etag);
            } catch (error) {
                throw new Error(
                    `Failed to upload part ${task.partNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`
                );
            }
        }
    };

    // 동시성 제한만큼 워커 생성
    const workers = Array(Math.min(concurrencyLimit, tasks.length))
        .fill(null)
        .map(() => executeTask());

    await Promise.all(workers);

    // partNumber 순서대로 정렬하여 반환
    return results.sort((a, b) => a.partNumber - b.partNumber);
};

/**
 * 영화 업로드 훅
 * @returns 영화 업로드 관련 상태와 함수들
 * @author 김동현
 */
export const useMovieUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadingMovieId, setUploadingMovieId] = useAtom(uploadingMovieIdAtom);
    const [progress, setProgress] = useAtom(uploadProgressAtom);

    /**
     * 파일을 청크로 분할합니다.
     * @param file 업로드할 파일
     * @returns 청크 배열
     */
    const splitFileIntoChunks = useCallback((file: File): Blob[] => {
        const chunks: Blob[] = [];
        let start = 0;

        while (start < file.size) {
            const end = Math.min(start + CHUNK_SIZE, file.size);
            chunks.push(file.slice(start, end));
            start = end;
        }

        return chunks;
    }, []);

    /**
     * 영화 파일을 업로드합니다.
     * @param data 영화 업로드 데이터 (메타데이터 + 파일)
     * @returns 업로드 결과 (성공 여부와 영화 ID)
     */
    const uploadMovie = useCallback(
        async (data: MovieUploadData): Promise<UploadResult> => {
            let movieId: number | null = null;

            try {
                setIsLoading(true);
                setError(null);
                setProgress(0);

                // 파일을 청크로 분할
                const chunks = splitFileIntoChunks(data.file);

                // 멀티파트 업로드 초기화
                const uploadRequest = buildUploadRequest(data, chunks.length);

                const uploadResponse = await MOVIE_API.requestMultipartUpload(uploadRequest);

                // movieId 저장
                movieId = uploadResponse.data.movieId;
                setUploadingMovieId(movieId);

                // 청크 업로드 작업 생성
                const uploadTasks: ChunkUploadTask[] = chunks.map((chunk, i) => ({
                    index: i,
                    partNumber: uploadResponse.data.presignedParts[i].partNumber,
                    presignedUrl: uploadResponse.data.presignedParts[i].presignedUrl,
                    chunk,
                }));

                // 병렬 업로드 (동시 5개)
                const uploadedParts = await uploadChunksWithConcurrency(
                    uploadTasks,
                    CONCURRENT_UPLOAD_LIMIT,
                    (completedCount, totalCount) => {
                        setProgress(Math.round((completedCount / totalCount) * 100));
                    }
                );

                // 업로드 완료 요청
                const completeRequestData = {
                    movieId,
                    title: data.title,
                    uploadId: uploadResponse.data.uploadId,
                    objectKey: uploadResponse.data.objectKey,
                    presignedParts: uploadedParts,
                };
                console.log('[uploadMovie] 업로드 완료 요청 데이터:', JSON.stringify(completeRequestData, null, 2));
                console.log('[uploadMovie] uploadedParts 개수:', uploadedParts.length);
                console.log('[uploadMovie] uploadedParts 상세:', uploadedParts);

                let completeResponse;
                try {
                    completeResponse = await MOVIE_API.completeMultipartUpload(completeRequestData);
                    console.log('[uploadMovie] 업로드 완료 응답:', JSON.stringify(completeResponse, null, 2));
                } catch (completeError) {
                    console.error('[uploadMovie] 업로드 완료 API 에러:', completeError);
                    console.error('[uploadMovie] 에러 타입:', typeof completeError);
                    if (completeError instanceof Error) {
                        console.error('[uploadMovie] 에러 메시지:', completeError.message);
                        console.error('[uploadMovie] 에러 스택:', completeError.stack);
                    }
                    throw completeError;
                }

                if (completeResponse.status !== 200) {
                    console.error('[uploadMovie] 완료 응답 상태 코드 실패:', completeResponse.status);
                    console.error('[uploadMovie] 완료 응답 메시지:', completeResponse.message);
                    throw new Error(completeResponse.message || 'Failed to complete multipart upload');
                }

                return {
                    success: true,
                    movieId,
                };
            } catch (error) {
                // 업로드 실패 시 서버에 알림
                if (movieId !== null) {
                    try {
                        await MOVIE_API.reportUploadFail(movieId);
                        console.log('[uploadMovie] 업로드 실패 보고 완료:', movieId);
                    } catch (failError) {
                        console.error('[uploadMovie] 업로드 실패 보고 에러:', failError);
                    }
                }
                setError(error instanceof Error ? error.message : '영화 업로드에 실패했습니다.');
                return { success: false };
            } finally {
                setIsLoading(false);
                setUploadingMovieId(null);
            }
        },
        [splitFileIntoChunks, setUploadingMovieId, setProgress]
    );

    /**
     * 백그라운드로 업로드를 시작하고 즉시 반환합니다.
     * 업로드 초기화 후 movieId를 반환하고, 실제 업로드/완료 요청은 비동기로 진행됩니다.
     */
    const startUploadInBackground = useCallback(
        async (data: MovieUploadData): Promise<UploadResult> => {
            try {
                setError(null);
                setProgress(0);

                // 파일을 청크로 분할
                const chunks = splitFileIntoChunks(data.file);

                // 멀티파트 업로드 초기화
                const uploadRequest = buildUploadRequest(data, chunks.length);

                const uploadResponse = await MOVIE_API.requestMultipartUpload(uploadRequest);

                const movieId = uploadResponse.data.movieId;
                const uploadId = uploadResponse.data.uploadId;
                const objectKey = uploadResponse.data.objectKey;
                const presignedParts = uploadResponse.data.presignedParts;

                setUploadingMovieId(movieId);

                // 실제 업로드와 완료 요청을 백그라운드에서 수행
                (async () => {
                    try {
                        // 청크 업로드 작업 생성
                        const uploadTasks: ChunkUploadTask[] = chunks.map((chunk, i) => ({
                            index: i,
                            partNumber: presignedParts[i].partNumber,
                            presignedUrl: presignedParts[i].presignedUrl,
                            chunk,
                        }));

                        // 병렬 업로드 (동시 5개)
                        const uploadedParts = await uploadChunksWithConcurrency(
                            uploadTasks,
                            CONCURRENT_UPLOAD_LIMIT,
                            (completedCount, totalCount) => {
                                setProgress((prev) => {
                                    const next = Math.round((completedCount / totalCount) * 100);
                                    return next !== prev ? next : prev;
                                });
                            }
                        );

                        const bgCompleteRequestData = {
                            movieId,
                            title: data.title,
                            uploadId,
                            objectKey,
                            presignedParts: uploadedParts,
                        };
                        console.log(
                            '[startUploadInBackground] 업로드 완료 요청 데이터:',
                            JSON.stringify(bgCompleteRequestData, null, 2)
                        );
                        console.log('[startUploadInBackground] uploadedParts 개수:', uploadedParts.length);
                        console.log('[startUploadInBackground] uploadedParts 상세:', uploadedParts);

                        try {
                            const bgCompleteResponse = await MOVIE_API.completeMultipartUpload(bgCompleteRequestData);
                            console.log(
                                '[startUploadInBackground] 업로드 완료 응답:',
                                JSON.stringify(bgCompleteResponse, null, 2)
                            );
                        } catch (completeError) {
                            console.error('[startUploadInBackground] 업로드 완료 API 에러:', completeError);
                            console.error('[startUploadInBackground] 에러 타입:', typeof completeError);
                            if (completeError instanceof Error) {
                                console.error('[startUploadInBackground] 에러 메시지:', completeError.message);
                                console.error('[startUploadInBackground] 에러 스택:', completeError.stack);
                            }
                            throw completeError;
                        }
                    } catch (bgError) {
                        // 업로드 실패 시 서버에 알림
                        try {
                            await MOVIE_API.reportUploadFail(movieId);
                            console.log('[startUploadInBackground] 업로드 실패 보고 완료:', movieId);
                        } catch (failError) {
                            console.error('[startUploadInBackground] 업로드 실패 보고 에러:', failError);
                        }
                        console.error('[startUploadInBackground] 백그라운드 업로드 전체 에러:', bgError);
                        setError(bgError instanceof Error ? bgError.message : '영화 업로드에 실패했습니다.');
                    } finally {
                        setUploadingMovieId(null);
                    }
                })();

                // 초기화 직후 즉시 반환하여 호출 측이 네비게이션 가능하도록 함
                return { success: true, movieId };
            } catch (e) {
                setError(e instanceof Error ? e.message : '영화 업로드 초기화에 실패했습니다.');
                return { success: false };
            }
        },
        [splitFileIntoChunks, setUploadingMovieId, setProgress]
    );

    return {
        isLoading,
        error,
        progress,
        uploadMovie,
        startUploadInBackground,
        uploadingMovieId,
    };
};
