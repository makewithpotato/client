import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { moviesAtom, moviesLoadingAtom, moviesErrorAtom } from '@/atoms/movies';
import MOVIE_API from '@/services/movie';

/**
 * 영화 목록 관리 훅
 * @returns 영화 목록 관련 상태와 함수들
 * @author 김동현
 */
export const useMovies = () => {
    const [movies, setMovies] = useAtom(moviesAtom);
    const [isLoading, setIsLoading] = useAtom(moviesLoadingAtom);
    const [error, setError] = useAtom(moviesErrorAtom);

    /**
     * 영화 목록을 가져옵니다.
     * @param options.silent 로딩 상태를 변경하지 않고 조용히 데이터를 갱신합니다 (폴링 등에서 사용)
     */
    const fetchMovies = useCallback(
        async (options?: { silent?: boolean }) => {
            try {
                if (!options?.silent) {
                    setIsLoading(true);
                }
                setError(null);

                const response = await MOVIE_API.getMovieList();

                if (response.status === 200) {
                    setMovies(response.data);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : '영화 목록을 가져오는데 실패했습니다.');
            } finally {
                if (!options?.silent) {
                    setIsLoading(false);
                }
            }
        },
        [setMovies, setIsLoading, setError]
    );

    return {
        movies,
        isLoading,
        error,
        fetchMovies,
    };
};
