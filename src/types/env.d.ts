/// <reference types="vite/client" />

/**
 * 환경변수 타입 정의
 * 환경 변수를 설정할 때에는 해당 파일에 타입을 정의해야 한다.
 * ------------------------
 * 사용 예시
 * import { APP_SERVER_URL } from '@env';
 * ------------------------
 * @author 김동현
 */
declare module '@env' {
    export const VITE_APP_SERVER_URL: string;
    export const VITE_APP_AI_URL: string;
    export const VITE_GOOGLE_AUTH_URL: string;
    export const VITE_GOOGLE_CLIENT_ID: string;
    export const VITE_GOOGLE_REDIRECT_URI: string;
}
