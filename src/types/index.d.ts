// 공통 API 응답 타입
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
}

// 페이지네이션 타입
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
}

// 에러 타입
export interface AppError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

// Joke API 타입
export interface Joke {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export interface MovieInfo {
    title: string;
    englishTitle: string;
    showTime: string;
    movieInfo: string;
    staff: string;
}

export interface Movie {
    id: string;
    title: string;
    originalTitle: string;
    releaseDate: string;
    runtime: number;
    overview: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
    genres: string[];
}

export interface DraggedItem {
    id: string;
    title: string;
    content: string;
    zone: string;
}

export interface MovieLayoutData {
    movieId: string;
    movie: Movie;
    layoutId: string;
    draggedItems: DraggedItem[];
}

export interface ProgramBookData {
    id: string;
    title: string;
    movies: MovieLayoutData[];
    createdAt: string;
    updatedAt: string;
}
