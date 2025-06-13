import { useAtom } from 'jotai';
import { selectedMoviesAtom, currentMovieIndexAtom } from '@/atoms';
import {
    MovieInfoContainer,
    MovieImage,
    MovieInfo,
    MovieTitle,
    MovieProgress,
    ButtonGroup,
    MovieButton,
} from './index.styled';

export const MovieInfoCard = () => {
    const [selectedMovies] = useAtom(selectedMoviesAtom);
    const [currentMovieIndex, setCurrentMovieIndex] = useAtom(currentMovieIndexAtom);

    const handlePreviousMovie = () => {
        setCurrentMovieIndex(Math.max(0, currentMovieIndex - 1));
    };

    const handleNextMovie = () => {
        setCurrentMovieIndex(Math.min(selectedMovies.length - 1, currentMovieIndex + 1));
    };

    const currentMovie = selectedMovies[currentMovieIndex];

    if (!selectedMovies.length || !currentMovie) {
        return null;
    }

    return (
        <MovieInfoContainer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MovieImage src={currentMovie.image} alt={currentMovie.title} />
                <MovieInfo>
                    <MovieTitle>{currentMovie.title}</MovieTitle>
                    <MovieProgress>
                        Movie {currentMovieIndex + 1} of {selectedMovies.length}
                    </MovieProgress>
                </MovieInfo>
            </div>
            <ButtonGroup>
                <MovieButton onClick={handlePreviousMovie} disabled={currentMovieIndex === 0}>
                    Previous Movie
                </MovieButton>
                <MovieButton onClick={handleNextMovie} disabled={currentMovieIndex === selectedMovies.length - 1}>
                    Next Movie
                </MovieButton>
            </ButtonGroup>
        </MovieInfoContainer>
    );
};
