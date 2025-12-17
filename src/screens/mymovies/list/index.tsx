import { TopBar } from '@/components';
import { Wrapper, Section, Header, NewMovieButton } from './index.styled';
import { MovieTable } from './components';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import { useEffect } from 'react';
import type { Movie } from '@/types/movie';
import { usePayment } from '@/hooks/usePayment';

export const MyMoviesScreen = () => {
    const navigate = useNavigate();
    const { movies, isLoading, error, fetchMovies } = useMovies();
    const { isMoviePaid } = usePayment();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // // 창 포커스 시 최신 상태로 갱신
    // useEffect(() => {
    //     const onFocus = () => {
    //         fetchMovies();
    //     };
    //     window.addEventListener('focus', onFocus);
    //     return () => window.removeEventListener('focus', onFocus);
    // }, [fetchMovies]);

    // 진행 중 상태가 있을 때 가벼운 폴링
    useEffect(() => {
        const hasInProgress = movies.some((m) => {
            const s = m.status || '';
            return s === 'UPLOADING' || s === 'ANALYZE' || (typeof s === 'string' && s.startsWith('PROCEEDING['));
        });

        if (!hasInProgress) return;

        const id = setInterval(() => {
            fetchMovies({ silent: true });
        }, 7000);
        return () => clearInterval(id);
    }, [movies, fetchMovies]);

    const handleNewMovie = () => {
        navigate('/mymovies/upload');
    };

    const handleMovieClick = (movie: Movie) => {
        // Check payment status before navigation
        const isPaid = isMoviePaid(movie.movieId);

        // If payment is required (status is PENDING, ANALYZE, COMPLETE, etc.) and not paid, prevent navigation
        // Exception: 'UPLOADING' usually doesn't need payment check yet, but we can be safe.
        // The logic in MovieItem is strict: PENDING|ANALYZE|COMPLETE|PROCEEDING -> PAYMENT_REQUIRED if not paid.
        // Here we enforce: only navigate if status is COMPLETE AND paid.

        if (movie.status === 'COMPLETE' && isPaid) {
            navigate(`/mymovies/analyze/${movie.movieId}`);
        }
    };

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <Header>
                        <h1>My Videos</h1>
                        <NewMovieButton onClick={handleNewMovie}>New Video</NewMovieButton>
                    </Header>
                    <div>Error: {error}</div>
                </Section>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Header>
                    <h1>My Videos</h1>
                    <NewMovieButton onClick={handleNewMovie}>New Video</NewMovieButton>
                </Header>
                {isLoading ? <div>Loading...</div> : <MovieTable movies={movies} onMovieClick={handleMovieClick} />}
            </Section>
        </Wrapper>
    );
};
