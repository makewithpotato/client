import { TopBar } from '@/components';
import { Wrapper, Section, Header, NewMovieButton } from './index.styled';
import { MovieTable } from './components';
import type { Movie } from './components';

const movies: Movie[] = [
    {
        title: 'The Crimson Tide',
        director: 'Ethan Carter',
        genre: 'Drama',
        releaseDate: '2022-05-15',
    },
    {
        title: 'Echoes of the Past',
        director: 'Sophia Bennett',
        genre: 'Mystery',
        releaseDate: '2023-01-20',
    },
    {
        title: 'Whispers in the Wind',
        director: 'Liam Walker',
        genre: 'Romance',
        releaseDate: '2022-11-10',
    },
    {
        title: 'Beneath the Surface',
        director: 'Olivia Hayes',
        genre: 'Thriller',
        releaseDate: '2023-03-05',
    },
    {
        title: 'Starlight Serenade',
        director: 'Noah Turner',
        genre: 'Musical',
        releaseDate: '2022-09-22',
    },
];

export const MyMoviesScreen = () => {
    const handleViewMovie = (index: number) => {
        console.log('View movie:', movies[index]);
        // 실제 구현에서는 영화 상세 페이지로 이동하거나 모달 등을 띄움
    };

    const handleNewMovie = () => {
        console.log('Create new movie');
        // 실제 구현에서는 새 영화 생성 페이지로 이동
    };

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Header>
                    <h1>My Movies</h1>
                    <NewMovieButton onClick={handleNewMovie}>New Movie</NewMovieButton>
                </Header>
                <MovieTable movies={movies} onViewMovie={handleViewMovie} />
            </Section>
        </Wrapper>
    );
};
