import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { programBooksAtom, programBooksLoadingAtom, programBooksErrorAtom } from '@/atoms/programBook';
import PROGRAMBOOK_API from '@/services/progarmBook';

/**
 * 프로그램북 목록 관리 훅
 * @returns 프로그램북 목록 관련 상태와 함수들
 * @author 김동현
 */
export const useProgramBooks = () => {
    const [programBooks, setProgramBooks] = useAtom(programBooksAtom);
    const [isLoading, setIsLoading] = useAtom(programBooksLoadingAtom);
    const [error, setError] = useAtom(programBooksErrorAtom);

    /**
     * 프로그램북 목록을 가져옵니다.
     */
    const fetchProgramBooks = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await PROGRAMBOOK_API.getProgramBookList();

            if (response.status === 200) {
                setProgramBooks(response.data);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : '프로그램북 목록을 가져오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [setProgramBooks, setIsLoading, setError]);

    return {
        programBooks,
        isLoading,
        error,
        fetchProgramBooks,
    };
};
