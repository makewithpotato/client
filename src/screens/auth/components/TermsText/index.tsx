import { Container, Link } from './index.styled';

export const TermsText = () => {
    return (
        <Container>
            By continuing, you agree to our <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>
        </Container>
    );
};
