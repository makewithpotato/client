import { atom } from 'jotai';
import type { MovieLayoutData, DraggedItemData } from '@/screens/newprogrambook/layout/types';
import type { ProgramBookData as ProgramBookDataType } from '@/types/programBook';
import type { ProgramBook, ProgramBookDetail } from '@/types/programBook';

// 프로그램북 전체 데이터
export const programBookAtom = atom<ProgramBookDataType>({
    title: '',
    description: '',
    movies: [],
});

// 현재 작업 중인 영화의 레이아웃 데이터
export const currentMovieLayoutAtom = atom<MovieLayoutData | null>(null);

// 각 영화별 드래그된 아이템들을 저장하는 atom
export interface MovieDraggedItems {
    [movieId: string]: DraggedItemData[];
}

export const movieDraggedItemsAtom = atom<MovieDraggedItems>({});

// 각 영화별 선택된 레이아웃을 저장하는 atom
export interface MovieLayouts {
    [movieId: string]: string; // movieId -> layoutId mapping
}

export const movieLayoutsAtom = atom<MovieLayouts>({});

export interface MovieData {
    id: string;
    title: string;
    overview: string;
    releaseDate: string;
    layoutId: string;
    analysisResults: AnalysisResult[];
}

export interface AnalysisResult {
    id: string;
    type: string;
    content: string;
    zone?: string;
}

// PDF 파일 경로를 저장하는 atom
export const pdfFilePathAtom = atom<string>('');

export const selectedLayoutAtom = atom<string>('1'); // 기본 레이아웃

/**
 * 프로그램북 목록 상태를 관리하는 atom
 * @author 김동현
 */
export const programBooksAtom = atom<ProgramBook[]>([]);

/**
 * 프로그램북 로딩 상태를 관리하는 atom
 * @author 김동현
 */
export const programBooksLoadingAtom = atom<boolean>(false);

/**
 * 프로그램북 에러 상태를 관리하는 atom
 * @author 김동현
 */
export const programBooksErrorAtom = atom<string | null>(null);

/**
 * 프로그램북 상세 정보 상태를 관리하는 atom
 * @author 김동현
 */
export const programBookDetailAtom = atom<ProgramBookDetail | null>(null);

/**
 * 프로그램북 상세 정보 로딩 상태를 관리하는 atom
 * @author 김동현
 */
export const programBookDetailLoadingAtom = atom<boolean>(false);

/**
 * 프로그램북 상세 정보 에러 상태를 관리하는 atom
 * @author 김동현
 */
export const programBookDetailErrorAtom = atom<string | null>(null);
