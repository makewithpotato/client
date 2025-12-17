import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { TopBar, SearchBar, Pagination } from '@/components';
import { Wrapper, Section, MovieGrid, NextButtonWrapper, NextButton } from './index.styled';
import { MovieSelectCard } from './components';
import { selectedMoviesAtom } from '@/atoms';
import { programBookAtom } from '@/atoms/programBook';
import { useMovies } from '@/hooks/useMovies';
import { usePayment } from '@/hooks/usePayment';

export const SelectMoviesScreen = () => {
    const navigate = useNavigate();
    const [selectedMovieIds, setSelectedMovieIds] = useAtom(selectedMoviesAtom);
    const [, setProgramBook] = useAtom(programBookAtom);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { movies, isLoading, error, fetchMovies } = useMovies();
    const { isMoviePaid } = usePayment();

    useEffect(() => {
        setSelectedMovieIds([]);
        fetchMovies();
    }, [setSelectedMovieIds, fetchMovies]);

    const handleMovieSelect = (movieId: string) => {
        setSelectedMovieIds((prev) => {
            const isSelected = prev.includes(movieId);
            if (isSelected) {
                return prev.filter((id) => id !== movieId);
            } else {
                return [...prev, movieId];
            }
        });
    };

    const updateProgramBookAndNavigate = (path: string) => {
        if (selectedMovieIds.length > 0) {
            // Update programBook with selected movie IDs only
            setProgramBook((prev) => ({
                ...prev,
                movies: selectedMovieIds.map((movieId) => ({
                    movieId,
                    layout: 'basic',
                    layoutId: '1',
                    draggedItems: [],
                })),
            }));
            navigate(path);
        }
    };

    const handleNext = () => updateProgramBookAndNavigate('/newprogrambook/layout');
    const handleCustomDesign = () => updateProgramBookAndNavigate('/newprogrambook/custom');

    // 페이지당 아이템 수
    const itemsPerPage = 10;
    // 상태가 COMPLETE이고 결제가 완료된 영화만 필터링
    const filteredMovies = movies.filter(
        (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) &&
            movie.status === 'COMPLETE' &&
            isMoviePaid(movie.movieId)
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

    if (isLoading) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <h1>Select Videos</h1>
                    <div>Loading videos...</div>
                </Section>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <h1>Select Videos</h1>
                    <div>Error: {error}</div>
                </Section>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <h1>Select Videos</h1>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                <MovieGrid>
                    {paginatedMovies.map((movie) => (
                        <MovieSelectCard
                            key={movie.movieId}
                            id={movie.movieId.toString()}
                            title={movie.title}
                            selected={selectedMovieIds.includes(movie.movieId.toString())}
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
                <NextButton
                    disabled={selectedMovieIds.length === 0}
                    onClick={handleCustomDesign}
                    aria-label="Custom Design"
                >
                    Custom Design
                </NextButton>
                <NextButton disabled={selectedMovieIds.length === 0} onClick={handleNext} aria-label="Next page">
                    Next
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
