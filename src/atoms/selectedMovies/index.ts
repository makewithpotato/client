import { atom } from 'jotai';

// 선택한 영화 ID들을 저장하는 atom
export const selectedMoviesAtom = atom<string[]>([]);

// 현재 레이아웃 작업 중인 영화 인덱스
export const currentMovieIndexAtom = atom<number>(0);

// 현재 선택된 레이아웃 인덱스
export const currentLayoutIndexAtom = atom<number>(0);
