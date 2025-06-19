import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { programBookDetailAtom, programBookDetailLoadingAtom, programBookDetailErrorAtom } from '@/atoms/programBook';
import PROGRAMBOOK_API from '@/services/progarmBook';

/**
 * 프로그램북 상세 정보 관리 훅
 * @returns 프로그램북 상세 정보 관련 상태와 함수들
 * @author 김동현
 */
export const useProgramBookDetail = () => {
    const [programBookDetail, setProgramBookDetail] = useAtom(programBookDetailAtom);
    const [isLoading, setIsLoading] = useAtom(programBookDetailLoadingAtom);
    const [error, setError] = useAtom(programBookDetailErrorAtom);

    /**
     * 프로그램북 상세 정보를 가져옵니다.
     * @param programbookId 프로그램북 ID
     */
    const fetchProgramBookDetail = useCallback(
        async (programbookId: number) => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await PROGRAMBOOK_API.getProgramBookDetail(programbookId);

                if (response.status === 200) {
                    setProgramBookDetail(response.data);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : '프로그램북 상세 정보를 가져오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        },
        [setProgramBookDetail, setIsLoading, setError]
    );

    /**
     * 프로그램북 상세 정보를 초기화합니다.
     */
    const clearProgramBookDetail = useCallback(() => {
        setProgramBookDetail(null);
        setError(null);
    }, [setProgramBookDetail, setError]);

    return {
        programBookDetail,
        isLoading,
        error,
        fetchProgramBookDetail,
        clearProgramBookDetail,
    };
};
