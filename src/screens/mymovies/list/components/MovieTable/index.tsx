import React from 'react';
import { TableWrapper, Table, TableHeader, HeaderRow, HeaderCell, TableBody } from './index.styled';
import { MovieItem } from '../MovieItem';

interface Movie {
    id: string;
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
}

interface MovieTableProps {
    movies: Movie[];
}

export const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <HeaderRow>
                        <HeaderCell>Title</HeaderCell>
                        <HeaderCell>Director</HeaderCell>
                        <HeaderCell>Genre</HeaderCell>
                        <HeaderCell>Release Date</HeaderCell>
                        <HeaderCell>Actions</HeaderCell>
                    </HeaderRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            director={movie.director}
                            genre={movie.genre}
                            releaseDate={movie.releaseDate}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};
