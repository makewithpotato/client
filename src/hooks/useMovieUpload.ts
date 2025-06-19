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
}

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
                const uploadRequest: MovieUploadRequest = {
                    title: data.title,
                    director: data.director,
                    genre: data.genre,
                    releaseDate: data.releaseDate,
                    actor: data.actor,
                    totalParts: chunks.length,
                };

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
                const completeResponse = await MOVIE_API.completeMultipartUpload({
                    movieId,
                    title: data.title,
                    uploadId: uploadResponse.data.uploadId,
                    objectKey: uploadResponse.data.objectKey,
                    presignedParts: uploadedParts,
                });

                if (completeResponse.status !== 200) {
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

    return {
        isLoading,
        error,
        progress,
        uploadMovie,
        uploadingMovieId,
    };
};
