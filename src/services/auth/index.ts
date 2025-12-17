import axios from 'axios';
import type { TAuthResponse } from '@/services/api/types';
import { setAccessToken, setRefreshToken } from '@/utils/auth';

// 소셜 로그인 전용 인스턴스 (토큰이 없는 상태의 요청)
const authInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

/**
 * Google 소셜 로그인
 * @param code Google OAuth 인증 코드
 * @returns Promise<void>
 */
export const googleLogin = async (code: string): Promise<void> => {
    try {
        const response = await authInstance.post<TAuthResponse>('/api/user/login', null, {
            params: { code },
        });

        const { accessToken, refreshToken } = response.data.data;

        // 토큰 저장
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
    } catch (error) {
        console.error('Google login failed:', error);
        if (axios.isAxiosError(error)) {
            console.error('Error details:', {
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
        }
        throw error;
    }
};
