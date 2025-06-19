import { TopBar } from '@/components';
import { Wrapper, Section, Header, NewMovieButton } from './index.styled';
import { MovieTable } from './components';
import { useNavigate } from 'react-router-dom';

interface Movie {
    id: string;
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
}

const movies: Movie[] = [
    {
        id: '1',
        title: 'The Crimson Tide',
        director: 'Ethan Carter',
        genre: 'Drama',
        releaseDate: '2022-05-15',
    },
    {
        id: '2',
        title: 'Echoes of the Past',
        director: 'Sophia Bennett',
        genre: 'Mystery',
        releaseDate: '2023-01-20',
    },
    {
        id: '3',
        title: 'Whispers in the Wind',
        director: 'Liam Walker',
        genre: 'Romance',
        releaseDate: '2022-11-10',
    },
    {
        id: '4',
        title: 'Beneath the Surface',
        director: 'Olivia Hayes',
        genre: 'Thriller',
        releaseDate: '2023-03-05',
    },
    {
        id: '5',
        title: 'Starlight Serenade',
        director: 'Noah Turner',
        genre: 'Musical',
        releaseDate: '2022-09-22',
    },
];

export const MyMoviesScreen = () => {
    const navigate = useNavigate();

    const handleNewMovie = () => {
        navigate('/mymovies/upload');
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
                <MovieTable movies={movies} />
            </Section>
        </Wrapper>
    );
};
