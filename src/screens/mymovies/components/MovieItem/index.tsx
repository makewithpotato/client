import { MovieRow, MovieCell, MovieTitle, Director, Genre, ReleaseDate, ViewButton } from './index.styled';

export interface MovieItemProps {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    onView: () => void;
}

export const MovieItem = ({ title, director, genre, releaseDate, onView }: MovieItemProps) => (
    <MovieRow>
        <MovieCell>
            <MovieTitle>{title}</MovieTitle>
        </MovieCell>
        <MovieCell>
            <Director>{director}</Director>
        </MovieCell>
        <MovieCell>
            <Genre>{genre}</Genre>
        </MovieCell>
        <MovieCell>
            <ReleaseDate>{releaseDate}</ReleaseDate>
        </MovieCell>
        <MovieCell>
            <ViewButton onClick={onView}>View</ViewButton>
        </MovieCell>
    </MovieRow>
);
