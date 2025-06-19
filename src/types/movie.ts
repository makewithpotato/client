/**
 * 영화 상태 타입
 */
export type MovieStatus = 'UPLOADING' | 'ANALYZE' | 'COMPLETE' | string;

/**
 * 영화 정보 타입
 */
export interface Movie {
    movieId: number;
    title: string;
    thumbnailUrl: string;
    status: MovieStatus;
    director: string;
    actor: string;
    genre: string;
    releaseDate: string | null;
}

/**
 * 영화 API 응답 타입
 */
export interface MovieResponse {
    status: number;
    message: string;
    data: Movie[];
}

/**
 * 멀티파트 업로드 요청 타입
 */
export interface MovieUploadRequest {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    actor: string;
    totalParts: number;
}

/**
 * 멀티파트 업로드 파트 정보 타입
 */
export interface PresignedPart {
    partNumber: number;
    presignedUrl: string;
}

/**
 * 멀티파트 업로드 응답 타입
 */
export interface MovieUploadResponse {
    status: number;
    message: string;
    data: {
        movieId: number;
        uploadId: string;
        objectKey: string;
        presignedParts: PresignedPart[];
    };
}

/**
 * 업로드된 파트 정보 타입
 */
export interface UploadedPart {
    partNumber: number;
    etag: string;
}

/**
 * 업로드 완료 요청 타입
 */
export interface MovieUploadCompleteRequest {
    movieId: number;
    title: string;
    uploadId: string;
    objectKey: string;
    presignedParts: UploadedPart[];
}

/**
 * 업로드 완료 응답 타입
 */
export interface MovieUploadCompleteResponse {
    status: number;
    message: string;
    data: null;
}
