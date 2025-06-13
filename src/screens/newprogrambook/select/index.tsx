import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { TopBar, SearchBar } from '@/components';
import { Wrapper, Section, MovieGrid, NextButtonWrapper, NextButton } from './inde.styled';
import { MovieSelectCard, TabBar, Pagination } from './components';
import { selectedMoviesAtom } from '@/atoms';

const movies = [
    {
        id: '1',
        image: '/movie-posters/enchanted-forest.jpg',
        title: 'The Enchanted Forest',
    },
    {
        id: '2',
        image: '/movie-posters/lost-city.jpg',
        title: 'The Lost City',
    },
    {
        id: '3',
        image: '/movie-posters/crimson-tide.jpg',
        title: 'The Crimson Tide',
    },
    {
        id: '4',
        image: '/movie-posters/whispers.jpg',
        title: 'Whispers of the Past',
    },
    {
        id: '5',
        image: '/movie-posters/echoes.jpg',
        title: 'Echoes of Tomorrow',
    },
    {
        id: '6',
        image: '/movie-posters/symphony.jpg',
        title: 'The Silent Symphony',
    },
];

export const SelectMoviesScreen = () => {
    const navigate = useNavigate();
    const [selectedMovies, setSelectedMovies] = useAtom(selectedMoviesAtom);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'shared'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const handleMovieSelect = (movieId: string) => {
        const movie = movies.find((m) => m.id === movieId);
        if (!movie) return;

        setSelectedMovies((prev) => {
            const isSelected = prev.some((m) => m.id === movieId);
            if (isSelected) {
                return prev.filter((m) => m.id !== movieId);
            } else {
                return [...prev, { id: movie.id, title: movie.title, image: movie.image }];
            }
        });
    };

    const handleNext = () => {
        if (selectedMovies.length > 0) {
            console.log('Selected movies:', selectedMovies);
            // layout 페이지로 이동 (선택된 영화는 atom에 저장되어 있음)
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
                <NextButton disabled={selectedMovies.length === 0} onClick={handleNext}>
                    Next
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
