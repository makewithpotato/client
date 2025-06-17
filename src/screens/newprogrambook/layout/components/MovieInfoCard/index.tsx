import React from 'react';
import { Card, MoviePoster, MovieInfo, MovieTitle, MovieOverview, MovieReleaseDate } from './index.styled';
import type { MovieData } from '@/atoms/programBook';

interface MovieInfoCardProps {
    movie: MovieData;
    isSelected: boolean;
    onClick: () => void;
}

export const MovieInfoCard: React.FC<MovieInfoCardProps> = ({ movie, isSelected, onClick }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
    };

    return (
        <Card isSelected={isSelected} onClick={handleClick} role="button" tabIndex={0}>
            <MoviePoster src={movie.posterPath} alt={movie.title} />
            <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieReleaseDate>{movie.releaseDate}</MovieReleaseDate>
                <MovieOverview>{movie.overview}</MovieOverview>
            </MovieInfo>
        </Card>
    );
};
