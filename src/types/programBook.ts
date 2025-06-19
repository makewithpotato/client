/**
 * 프로그램북 정보 타입
 */
export interface ProgramBook {
    programbookId: number;
    title: string;
    thumbnailUrl: string;
}

/**
 * 프로그램북 상세 정보 타입
 */
export interface ProgramBookDetail {
    title: string;
    thumbnailUrl: string;
    pdfUrl: string;
}

/**
 * 프로그램북 생성 요청 타입
 */
export interface ProgramBookCreateRequest {
    title: string;
    pdfFile: File;
}

/**
 * 프로그램북 목록 API 응답 타입
 */
export interface ProgramBookResponse {
    status: number;
    message: string;
    data: ProgramBook[];
}

/**
 * 프로그램북 상세 API 응답 타입
 */
export interface ProgramBookDetailResponse {
    status: number;
    message: string;
    data: ProgramBookDetail;
}

/**
 * 프로그램북 생성 API 응답 타입
 */
export interface ProgramBookCreateResponse {
    status: number;
    message: string;
    data: null;
}

export interface ProgramBookData {
    id?: string;
    title: string;
    description: string;
    movies: MovieLayoutData[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MovieData {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    overview: string;
    analysisResults: AnalysisResult[];
}

export interface AnalysisResult {
    id: string;
    type: string;
    content: string;
}

export interface MovieLayoutData {
    movieId: string;
    movie: MovieData;
    layout: 'poster' | 'text' | 'grid' | 'basic';
    layoutId: string;
    draggedItems: DraggedItem[];
}

export interface DraggedItem {
    id: string;
    type: string;
    title: string;
    content: string;
    zone?: string;
}
