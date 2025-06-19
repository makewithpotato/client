import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Container, LoginContainer, Title, Subtitle, SocialButtonsContainer } from './index.styled';
import { SocialLoginButton, TermsText } from './components';
import { googleLogin } from '@/services/auth';
import { Message } from './components/Message';

export const LoginScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

    React.useEffect(() => {
        const handleGoogleCallback = async () => {
            const code = searchParams.get('code');
            if (!code) return;

            try {
                setMessage({ text: '로그인 처리 중...', isError: false });
                await googleLogin(code);
                setMessage({ text: '로그인 성공! 이동합니다.', isError: false });

                // 로그인 성공 후 원래 가려던 페이지로 이동
                setTimeout(() => {
                    const from = location.state?.from?.pathname || '/';
                    navigate(from, { replace: true });
                }, 1000);
            } catch (error) {
                console.error('Login failed:', error);
                setMessage({
                    text: '로그인에 실패했습니다. 다시 시도해주세요.',
                    isError: true,
                });
            }
        };

        handleGoogleCallback();
    }, [searchParams, navigate, location]);

    return (
        <Container>
            <LoginContainer>
                <Title>Sign in to PotatoBook</Title>
                <Subtitle>Continue with your social account</Subtitle>

                <SocialButtonsContainer>
                    <SocialLoginButton provider="google" />
                    {/* <SocialLoginButton provider="social1" />
                    <SocialLoginButton provider="social2" /> */}
                </SocialButtonsContainer>

                {message && <Message isError={message.isError}>{message.text}</Message>}

                <TermsText />
            </LoginContainer>
        </Container>
    );
};
