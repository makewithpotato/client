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
