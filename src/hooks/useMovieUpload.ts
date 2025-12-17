import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import MOVIE_API from '@/services/movie';
import { uploadingMovieIdAtom } from '@/atoms/movies';
import type { UploadedPart, MovieUploadRequest } from '@/types/movie';

// 청크 크기: 5MB
const CHUNK_SIZE = 5 * 1024 * 1024;

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

/**
 * 영화 업로드 훅
 * @returns 영화 업로드 관련 상태와 함수들
 * @author 김동현
 */
export const useMovieUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [uploadingMovieId, setUploadingMovieId] = useAtom(uploadingMovieIdAtom);

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
                const movieId = uploadResponse.data.movieId;
                setUploadingMovieId(movieId);

                // 각 청크 업로드
                const uploadedParts: UploadedPart[] = [];
                for (let i = 0; i < chunks.length; i++) {
                    const { partNumber, presignedUrl } = uploadResponse.data.presignedParts[i];
                    const chunk = chunks[i];

                    try {
                        const etag = await MOVIE_API.uploadPart(presignedUrl, chunk);
                        uploadedParts.push({ partNumber, etag });

                        // 진행률 업데이트
                        setProgress(Math.round(((i + 1) / chunks.length) * 100));
                    } catch (error) {
                        throw new Error(
                            `Failed to upload part ${partNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`
                        );
                    }
                }

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
                setError(error instanceof Error ? error.message : '영화 업로드에 실패했습니다.');
                return { success: false };
            } finally {
                setIsLoading(false);
                setUploadingMovieId(null);
            }
        },
        [splitFileIntoChunks, setUploadingMovieId]
    );

    /**
     * 백그라운드로 업로드를 시작하고 즉시 반환합니다.
     * 업로드 초기화 후 movieId를 반환하고, 실제 업로드/완료 요청은 비동기로 진행됩니다.
     */
    const startUploadInBackground = useCallback(
        async (data: MovieUploadData): Promise<UploadResult> => {
            try {
                setError(null);

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
                        const uploadedParts: UploadedPart[] = [];
                        for (let i = 0; i < chunks.length; i++) {
                            const { partNumber, presignedUrl } = presignedParts[i];
                            const chunk = chunks[i];
                            const etag = await MOVIE_API.uploadPart(presignedUrl, chunk);
                            uploadedParts.push({ partNumber, etag });
                            // 진행률은 내부적으로만 갱신 (화면 전환 이후를 고려하여 상태 의존 최소화)
                            setProgress((prev) => {
                                const next = Math.round(((i + 1) / chunks.length) * 100);
                                return next !== prev ? next : prev;
                            });
                        }

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
                        // 오류는 훅 상태에만 기록
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
        [splitFileIntoChunks, setUploadingMovieId]
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
