import { TableWrapper, Table, TableHeader, HeaderRow, HeaderCell, TableBody } from './index.styled';
import { MovieItem } from '../MovieItem';

export interface Movie {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
}

export interface MovieTableProps {
    movies: Movie[];
    onViewMovie: (index: number) => void;
}

export const MovieTable = ({ movies, onViewMovie }: MovieTableProps) => (
    <TableWrapper>
        <Table>
            <TableHeader>
                <HeaderRow>
                    <HeaderCell>Movie Title</HeaderCell>
                    <HeaderCell>Director</HeaderCell>
                    <HeaderCell>Genre</HeaderCell>
                    <HeaderCell>Release Date</HeaderCell>
                    <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
            </TableHeader>
            <TableBody>
                {movies.map((movie, index) => (
                    <MovieItem key={index} {...movie} onView={() => onViewMovie(index)} />
                ))}
            </TableBody>
        </Table>
    </TableWrapper>
);
