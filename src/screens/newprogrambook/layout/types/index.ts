export interface AnalysisResult {
    id: string;
    label: string;
    content: string;
}

export interface LayoutOption {
    id: number;
    name: string;
    description: string;
    previewImage?: string;
}

export interface ProgramBookData {
    title: string;
    movies: MovieLayoutData[];
}

export interface MovieLayoutData {
    movieId: string;
    layoutId: number;
    draggedItems: DraggedItemData[];
}

export interface DraggedItemData {
    resultId: string;
    position: string; // 레이아웃 내 위치 정보
}
