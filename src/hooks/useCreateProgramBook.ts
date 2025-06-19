import { useState, useCallback } from 'react';
import PROGRAMBOOK_API from '@/services/progarmBook';
import type { ProgramBookCreateRequest } from '@/types/programBook';

/**
 * 프로그램북 생성 훅
 * @returns 프로그램북 생성 관련 상태와 함수들
 * @author 김동현
 */
export const useCreateProgramBook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 프로그램북을 생성합니다.
     * @param data 프로그램북 생성 요청 데이터
     * @returns 생성 성공 여부
     */
    const createProgramBook = useCallback(async (data: ProgramBookCreateRequest): Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await PROGRAMBOOK_API.createProgramBook(data);

            // 200번대 응답은 모두 성공으로 처리
            if (response.status >= 200 && response.status < 300) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : '프로그램북 생성에 실패했습니다.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        createProgramBook,
    };
};
