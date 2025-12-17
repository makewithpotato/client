import { privateServerInstance } from '../api/axios';
import axios from 'axios';
import type {
    MovieResponse,
    MovieUploadRequest,
    MovieUploadResponse,
    MovieUploadCompleteRequest,
    MovieUploadCompleteResponse,
    MovieAnalysisResponse,
} from '@/types/movie';

const MOVIE_API = {
    /**
     * 영화 목록을 가져옵니다.
     * @returns 영화 목록 응답
     * @author 김동현
     */
    getMovieList: async (): Promise<MovieResponse> => {
        const response = await privateServerInstance.get<MovieResponse>('/api/movie');
        return response.data;
    },

    /**
     * 멀티파트 업로드를 위한 presigned URL을 요청합니다.
     * @param data 업로드 요청 데이터
     * @returns 업로드 응답 (presigned URL 포함)
     * @author 김동현
     */
    requestMultipartUpload: async (data: MovieUploadRequest): Promise<MovieUploadResponse> => {
        const response = await privateServerInstance.post<MovieUploadResponse>('/api/movie/url', data);
        return response.data;
    },

    /**
     * 파일 청크를 presigned URL을 통해 업로드합니다.
     * @param presignedUrl presigned URL
     * @param chunk 파일 청크
     * @returns etag 값
     * @author 김동현
     */
    uploadPart: async (presignedUrl: string, chunk: Blob): Promise<string> => {
        const response = await axios.put(presignedUrl, chunk, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        // etag는 응답 헤더에서 추출 (따옴표 제거)
        const etag = response.headers.etag?.replace(/"/g, '');
        if (!etag) {
            throw new Error('Failed to get ETag from response');
        }

        return etag;
    },

    /**
     * 멀티파트 업로드를 완료합니다.
     * @param data 업로드 완료 요청 데이터
     * @returns 업로드 완료 응답
     * @author 김동현
     */
    completeMultipartUpload: async (data: MovieUploadCompleteRequest): Promise<MovieUploadCompleteResponse> => {
        const response = await privateServerInstance.post<MovieUploadCompleteResponse>('/api/movie/complete', data);
        return response.data;
    },

    /**
     * 특정 영화의 분석 정보를 가져옵니다.
     * @param movieId 영화 ID
     * @returns 영화 분석 상세 응답
     * @author 김동현
     */
    getMovieAnalysis: async (movieId: number | string): Promise<MovieAnalysisResponse> => {
        const response = await privateServerInstance.get<MovieAnalysisResponse>(`/api/movie/${movieId}`);
        return response.data;
    },
};

export default MOVIE_API;
