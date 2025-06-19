import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieRow, MovieCell, MovieTitle, Director, Genre, ReleaseDate, ViewButton } from './index.styled';

export interface MovieItemProps {
    id: string;
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    onView?: () => void;
}

export const MovieItem: React.FC<MovieItemProps> = ({ id, title, director, genre, releaseDate }) => {
    const navigate = useNavigate();

    const handleAnalyze = () => {
        navigate(`/mymovies/analyze/${id}`);
    };

    return (
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
                <ViewButton onClick={handleAnalyze}>Analyze</ViewButton>
            </MovieCell>
        </MovieRow>
    );
};
