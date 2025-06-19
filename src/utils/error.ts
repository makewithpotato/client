import type { AxiosError } from 'axios';
import type { TError } from '@/services/api/types';

interface ErrorInfo {
    code: number;
    message: string;
}

/**
 * Axios 에러 정보를 추출하여 표준화된 형식으로 반환합니다.
 * @param error Axios 에러 객체
 * @returns 표준화된 에러 정보
 * @author 김동현
 */
export const getErrorInfo = (error: AxiosError): ErrorInfo => {
    // 서버에서 반환한 에러 정보가 있는 경우
    if (error.response?.data) {
        const errorData = error.response.data as { error: TError };
        return {
            code: errorData.error.code,
            message: errorData.error.message,
        };
    }

    // 네트워크 에러인 경우
    if (error.code === 'ERR_NETWORK') {
        return {
            code: 503,
            message: '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.',
        };
    }

    // 기타 에러인 경우
    return {
        code: error.response?.status || 500,
        message: error.message || '알 수 없는 오류가 발생했습니다.',
    };
};
