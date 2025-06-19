import React from 'react';
import { MovieRow, MovieCell, MovieTitle, Director, Genre, ReleaseDate } from './index.styled';
import type { Movie } from '@/types/movie';

export interface MovieItemProps {
    movie: Movie;
    onClick?: () => void;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movie, onClick }) => {
    const getStatusText = (status: Movie['status']) => {
        switch (status) {
            case 'UPLOADING':
                return 'Preparing...';
            case 'ANALYZE':
                return 'Ready to Analyze';
            case 'COMPLETE':
                return 'Completed';
            default:
                return status;
        }
    };

    return (
        <MovieRow onClick={onClick} style={{ cursor: movie.status === 'ANALYZE' ? 'pointer' : 'default' }}>
            <MovieCell>
                <MovieTitle>{movie.title}</MovieTitle>
            </MovieCell>
            <MovieCell>
                <Director>{movie.director}</Director>
            </MovieCell>
            <MovieCell>
                <Genre>{movie.genre}</Genre>
            </MovieCell>
            <MovieCell>
                <ReleaseDate>{movie.releaseDate || 'N/A'}</ReleaseDate>
            </MovieCell>
            <MovieCell>{getStatusText(movie.status)}</MovieCell>
        </MovieRow>
    );
};
