import { getAccessToken } from '@/utils/auth';
import axios, { type AxiosInstance } from 'axios';
import { applyPrivateInterceptors } from './privateInterceptor';

const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const APP_AI_URL = import.meta.env.VITE_APP_AI_URL;

/**
 * 인증이 필요한 API 인스턴스 설정
 * 토큰이 필요한 API 요청에 사용
 * @author 김동현
 */
export const privateServerInstance: AxiosInstance = axios.create({
    baseURL: APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
});

/**
 * AI API 인스턴스 설정
 * AI API 요청에 사용
 * @author 김동현
 */
export const privateAIInstance: AxiosInstance = axios.create({
    baseURL: APP_AI_URL,
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
});

// 인터셉터 적용
applyPrivateInterceptors(privateServerInstance);
applyPrivateInterceptors(privateAIInstance);
