import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, LoginContainer, Title, Subtitle, SocialButtonsContainer } from './index.styled';
import { SocialLoginButton, TermsText } from './components';
import { googleLogin } from '@/services/api/auth';

export const LoginScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleGoogleCallback = async () => {
            const code = searchParams.get('code');
            if (!code) return;

            try {
                console.log('Attempting login with code:', code);
                await googleLogin(code);
                navigate('/');
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        handleGoogleCallback();
    }, [searchParams, navigate]);

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

                <TermsText />
            </LoginContainer>
        </Container>
    );
};
