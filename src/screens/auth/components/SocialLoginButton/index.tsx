import React from 'react';
import { Button } from './index.styled';

interface SocialLoginButtonProps {
    provider: 'google' | 'social1' | 'social2';
}

const providerNames = {
    google: 'Continue with Google',
    social1: 'Continue with Social Media 1',
    social2: 'Continue with Social Media 2',
};

// Google OAuth URL 구성
const constructGoogleAuthUrl = () => {
    const baseUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // 환경변수에서 리다이렉트 URI를 가져오거나, 기본값으로 콜백 경로 사용
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'email profile',
    });

    return `${baseUrl}?${params.toString()}`;
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider }) => {
    const handleClick = () => {
        if (provider === 'google') {
            // Google OAuth 페이지로 리다이렉트
            const authUrl = constructGoogleAuthUrl();
            console.log('Redirecting to:', authUrl);
            window.location.href = authUrl;
        } else {
            console.log(`Logging in with ${provider}`);
        }
    };

    return <Button onClick={handleClick}>{providerNames[provider]}</Button>;
};
