import { useJokeQuery } from '@/services/queries/joke';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { ThemeType } from '@/theme/theme';

const Container = styled.div<{ theme: ThemeType }>`
    padding: 2rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    min-height: 100vh;
`;

export const JokeScreen = () => {
    const { data, isLoading } = useJokeQuery();
    return (
        <Container>
            <h1>Joke</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                data && (
                    <p>
                        {data.setup} - {data.punchline}
                    </p>
                )
            )}
            <Link to="/">홈으로</Link>
        </Container>
    );
};
