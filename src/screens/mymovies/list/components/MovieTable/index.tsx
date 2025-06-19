import React from 'react';
import { TableWrapper, Table, TableHeader, HeaderRow, HeaderCell, TableBody } from './index.styled';
import { MovieItem } from '../MovieItem';
import type { Movie } from '@/types/movie';

interface MovieTableProps {
    movies: Movie[];
    onMovieClick?: (movie: Movie) => void;
}

export const MovieTable: React.FC<MovieTableProps> = ({ movies, onMovieClick }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <HeaderRow>
                        <HeaderCell>Title</HeaderCell>
                        <HeaderCell>Director</HeaderCell>
                        <HeaderCell>Genre</HeaderCell>
                        <HeaderCell>Release Date</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                    </HeaderRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <MovieItem key={movie.movieId} movie={movie} onClick={() => onMovieClick?.(movie)} />
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};
