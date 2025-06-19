import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { TopBar, SearchBar } from '@/components';
import { Wrapper, Section, MovieGrid, NextButtonWrapper, NextButton } from './index.styled';
import { MovieSelectCard, TabBar, Pagination } from './components';
import { selectedMoviesAtom } from '@/atoms';
import { programBookAtom } from '@/atoms/programBook';

const movies = [
    {
        id: '1',
        image: '/movie-posters/enchanted-forest.jpg',
        title: 'The Enchanted Forest',
        overview: 'A magical journey through an enchanted forest filled with mystical creatures.',
        releaseDate: '2024',
    },
    {
        id: '2',
        image: '/movie-posters/lost-city.jpg',
        title: 'The Lost City',
        overview: 'An adventure to find a legendary lost city hidden in the depths of the jungle.',
        releaseDate: '2024',
    },
    {
        id: '3',
        image: '/movie-posters/crimson-tide.jpg',
        title: 'The Crimson Tide',
        overview: 'A thrilling naval drama about submarine warfare and moral decisions.',
        releaseDate: '2024',
    },
    {
        id: '4',
        image: '/movie-posters/whispers.jpg',
        title: 'Whispers of the Past',
        overview: 'A haunting tale of memories and secrets that refuse to stay buried.',
        releaseDate: '2024',
    },
    {
        id: '5',
        image: '/movie-posters/echoes.jpg',
        title: 'Echoes of Tomorrow',
        overview: 'A sci-fi epic about the consequences of time travel and human choices.',
        releaseDate: '2024',
    },
    {
        id: '6',
        image: '/movie-posters/symphony.jpg',
        title: 'The Silent Symphony',
        overview: 'A moving story about a deaf musician who changes the world through music.',
        releaseDate: '2024',
    },
];

export const SelectMoviesScreen = () => {
    const navigate = useNavigate();
    const [selectedMovies, setSelectedMovies] = useAtom(selectedMoviesAtom);
    const [, setProgramBook] = useAtom(programBookAtom);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'shared'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Reset selected movies when component mounts
    useEffect(() => {
        setSelectedMovies([]);
    }, [setSelectedMovies]);

    const handleMovieSelect = (movieId: string) => {
        const movie = movies.find((m) => m.id === movieId);
        if (!movie) return;

        setSelectedMovies((prev) => {
            const isSelected = prev.some((m) => m.id === movieId);
            if (isSelected) {
                return prev.filter((m) => m.id !== movieId);
            } else {
                return [
                    ...prev,
                    {
                        id: movie.id,
                        title: movie.title,
                        image: movie.image,
                        overview: movie.overview,
                        releaseDate: movie.releaseDate,
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

    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <h1>Select Movies</h1>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                <TabBar active={activeTab} onTab={setActiveTab} />
                <MovieGrid>
                    {filteredMovies.map((movie) => (
                        <MovieSelectCard
                            key={movie.id}
                            id={movie.id}
                            image={movie.image}
                            title={movie.title}
                            selected={selectedMovies.some((m) => m.id === movie.id)}
                            onSelect={handleMovieSelect}
                        />
                    ))}
                </MovieGrid>
                <Pagination current={currentPage} total={10} onPage={setCurrentPage} />
            </Section>
            <NextButtonWrapper>
                <NextButton disabled={selectedMovies.length === 0} onClick={handleNext} aria-label="Next page">
                    Next
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
