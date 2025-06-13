import { atom } from 'jotai';

// 선택한 영화 타입 정의
export interface SelectedMovie {
    id: string;
    title: string;
    image: string;
}

// 선택한 영화들을 저장하는 atom
export const selectedMoviesAtom = atom<SelectedMovie[]>([]);

// 현재 레이아웃 작업 중인 영화 인덱스
export const currentMovieIndexAtom = atom<number>(0);

// 현재 선택된 레이아웃 인덱스
export const currentLayoutIndexAtom = atom<number>(0);
