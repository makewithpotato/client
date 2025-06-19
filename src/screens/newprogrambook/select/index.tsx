import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { TopBar, SearchBar, Pagination } from '@/components';
import { Wrapper, Section, MovieGrid, NextButtonWrapper, NextButton } from './index.styled';
import { MovieSelectCard } from './components';
import { selectedMoviesAtom } from '@/atoms';
import { programBookAtom } from '@/atoms/programBook';
import { useMovies } from '@/hooks/useMovies';

export const SelectMoviesScreen = () => {
    const navigate = useNavigate();
    const [selectedMovies, setSelectedMovies] = useAtom(selectedMoviesAtom);
    const [, setProgramBook] = useAtom(programBookAtom);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { movies, isLoading, error, fetchMovies } = useMovies();

    // Reset selected movies and fetch movies when component mounts
    useEffect(() => {
        setSelectedMovies([]);
        fetchMovies();
    }, [setSelectedMovies, fetchMovies]);

    const handleMovieSelect = (movieId: string) => {
        const movie = movies.find((m) => m.movieId.toString() === movieId);
        if (!movie) return;

        setSelectedMovies((prev) => {
            const isSelected = prev.some((m) => m.id === movieId);
            if (isSelected) {
                return prev.filter((m) => m.id !== movieId);
            } else {
                return [
                    ...prev,
                    {
                        id: movieId,
                        title: movie.title,
                        image: movie.thumbnailUrl,
                        overview: movie.director, // 임시로 director를 overview로 사용
                        releaseDate: movie.releaseDate || '',
                    },
                ];
            }
        });
    };

    const handleNext = () => {
        if (selectedMovies.length > 0) {
            // Update programBook with selected movies before navigation
            setProgramBook((prev) => ({
                ...prev,
                movies: selectedMovies.map((movie) => ({
                    movieId: movie.id,
                    movie: {
                        id: movie.id,
                        title: movie.title,
                        posterPath: movie.image,
                        overview: movie.overview,
                        releaseDate: movie.releaseDate,
                        analysisResults: [],
                    },
                    layout: 'basic',
                    layoutId: '1',
                    draggedItems: [],
                })),
            }));
            navigate('/newprogrambook/layout');
        }
    };

    // 페이지당 아이템 수
    const itemsPerPage = 10;
    const filteredMovies = movies.filter(
        (movie) => movie.title.toLowerCase().includes(search.toLowerCase()) && movie.status === 'COMPLETE'
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

    if (isLoading) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <h1>Select Movies</h1>
                    <div>Loading movies...</div>
                </Section>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <h1>Select Movies</h1>
                    <div>Error: {error}</div>
                </Section>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <h1>Select Movies</h1>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                <MovieGrid>
                    {paginatedMovies.map((movie) => (
                        <MovieSelectCard
                            key={movie.movieId}
                            id={movie.movieId.toString()}
                            image={movie.thumbnailUrl}
                            title={movie.title}
                            selected={selectedMovies.some((m) => m.id === movie.movieId.toString())}
                            onSelect={handleMovieSelect}
                        />
                    ))}
                </MovieGrid>
                <Pagination
                    current={currentPage}
                    total={filteredMovies.length}
                    onPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                />
            </Section>
            <NextButtonWrapper>
                <NextButton disabled={selectedMovies.length === 0} onClick={handleNext} aria-label="Next page">
                    Next
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
