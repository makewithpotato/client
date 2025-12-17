import type { MovieData } from '@/types/programBook';

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
    description: string;
    movies: MovieData[];
}

export interface MovieLayoutData {
    id: string;
    title: string;
    zones: string[];
}

export interface DraggedItemData {
    id: string;
    title: string;
    content: string;
    type: 'analysis' | 'image';
    zone: string;
}
