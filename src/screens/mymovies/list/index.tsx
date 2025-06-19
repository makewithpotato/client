import { TopBar } from '@/components';
import { Wrapper, Section, Header, NewMovieButton } from './index.styled';
import { MovieTable } from './components';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import { useEffect } from 'react';
import type { Movie } from '@/types/movie';

export const MyMoviesScreen = () => {
    const navigate = useNavigate();
    const { movies, isLoading, error, fetchMovies } = useMovies();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleNewMovie = () => {
        navigate('/mymovies/upload');
    };

    const handleMovieClick = (movie: Movie) => {
        if (movie.status === 'COMPLETE') {
            navigate(`/mymovies/analyze/${movie.movieId}`);
        }
    };

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <Header>
                        <h1>My Movies</h1>
                        <NewMovieButton onClick={handleNewMovie}>New Movie</NewMovieButton>
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
                    <h1>My Movies</h1>
                    <NewMovieButton onClick={handleNewMovie}>New Movie</NewMovieButton>
                </Header>
                {isLoading ? <div>Loading...</div> : <MovieTable movies={movies} onMovieClick={handleMovieClick} />}
            </Section>
        </Wrapper>
    );
};
