/**
 * 토큰 관리를 위한 유틸리티 함수들
 * @author 김동현
 */

// 토큰 저장소 키
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Access Token을 로컬 스토리지에서 가져옵니다.
 */
export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Refresh Token을 로컬 스토리지에서 가져옵니다.
 */
export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Access Token을 로컬 스토리지에 저장합니다.
 */
export const setAccessToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Refresh Token을 로컬 스토리지에 저장합니다.
 */
export const setRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * 모든 토큰을 삭제합니다.
 */
export const clearTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
