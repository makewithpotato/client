import React from 'react';
import { Document } from '@react-pdf/renderer';
import { CoverPage } from './components/CoverPage';
import { MoviePage } from './components/MoviePage';
import type { ProgramBookData, MovieData } from '@/types/programBook';
import type { MovieLayoutData } from '@/types/index';

interface ProgramBookDocumentProps {
    data: ProgramBookData;
}

export const ProgramBookDocument: React.FC<ProgramBookDocumentProps> = ({ data }) => {
    const totalPages = data.movies.length + 1; // Cover page + movie pages

    // Transform MovieData to MovieLayoutData if needed
    const movieLayoutData = data.movies.map((movie): MovieLayoutData => {
        if ('layout' in movie) {
            // Need to transform the movie data to match the expected type
            const layoutData = movie as unknown as { movieId: string; movie: MovieData; layout: string };
            return {
                movieId: layoutData.movieId,
                movie: {
                    id: layoutData.movie.id,
                    title: layoutData.movie.title,
                    originalTitle: layoutData.movie.title,
                    releaseDate: layoutData.movie.releaseDate,
                    runtime: 0,
                    overview: layoutData.movie.overview,
                    posterPath: layoutData.movie.posterPath,
                    backdropPath: layoutData.movie.posterPath,
                    voteAverage: 0,
                    genres: [],
                },
                layoutId: '1',
                draggedItems: layoutData.movie.analysisResults.map((result) => ({
                    id: result.id,
                    title: result.type,
                    content: result.content,
                    zone: 'default',
                })),
            };
        }
        const movieData = movie as MovieData;
        return {
            movieId: movieData.id,
            movie: {
                id: movieData.id,
                title: movieData.title,
                originalTitle: movieData.title,
                releaseDate: movieData.releaseDate,
                runtime: 0,
                overview: movieData.overview,
                posterPath: movieData.posterPath,
                backdropPath: movieData.posterPath,
                voteAverage: 0,
                genres: [],
            },
            layoutId: '1',
            draggedItems: movieData.analysisResults.map((result) => ({
                id: result.id,
                title: result.type,
                content: result.content,
                zone: 'default',
            })),
        };
    });

    return (
        <Document>
            <CoverPage title={data.title} />
            {movieLayoutData.map((movie, index) => (
                <MoviePage key={movie.movieId} movieData={movie} pageNumber={index + 2} totalPages={totalPages} />
            ))}
        </Document>
    );
};
