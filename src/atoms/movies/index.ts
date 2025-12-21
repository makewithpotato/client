import { atom } from 'jotai';
import type { Movie } from '@/types/movie';

/**
 * 영화 목록 상태를 관리하는 atom
 * @author 김동현
 */
export const moviesAtom = atom<Movie[]>([]);

/**
 * 영화 로딩 상태를 관리하는 atom
 * @author 김동현
 */
export const moviesLoadingAtom = atom<boolean>(false);

/**
 * 영화 에러 상태를 관리하는 atom
 * @author 김동현
 */
export const moviesErrorAtom = atom<string | null>(null);

/**
 * 업로드 중인 영화 ID를 관리하는 atom
 * @author 김동현
 */
export const uploadingMovieIdAtom = atom<number | null>(null);

/**
 * 업로드 진행률을 관리하는 atom (0-100)
 * @author 김동현
 */
export const uploadProgressAtom = atom<number>(0);