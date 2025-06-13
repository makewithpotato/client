import { atom } from 'jotai';
import type { ProgramBookData, MovieLayoutData, DraggedItemData } from '@/screens/newprogrambook/layout/types';

// 프로그램북 전체 데이터
export const programBookDataAtom = atom<ProgramBookData>({
    title: '',
    movies: [],
});

// 현재 작업 중인 영화의 레이아웃 데이터
export const currentMovieLayoutAtom = atom<MovieLayoutData | null>(null);

// 드래그된 아이템들을 저장하는 atom
export const draggedItemsAtom = atom<DraggedItemData[]>([]);
