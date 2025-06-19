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
                if (status.startsWith('PROCEEDING[')) {
                    const progressMatch = status.match(/PROCEEDING\[(\d+)\/(\d+)\]/);
                    if (progressMatch) {
                        const [_, current, total] = progressMatch;
                        const percentage = Math.round((Number(current) / Number(total)) * 100);
                        if (percentage === 100) {
                            return 'Analyzing... 99%';
                        } else {
                            return `Analyzing... ${percentage}%`;
                        }
                    }
                }
                return status;
        }
    };

    return (
        <MovieRow onClick={onClick} style={{ cursor: movie.status === 'COMPLETE' ? 'pointer' : 'default' }}>
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
