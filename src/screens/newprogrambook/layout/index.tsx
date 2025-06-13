import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { TopBar, ProgramBookTitleModal } from '@/components';
import { Wrapper, Section, Title, Description, MainContent, LeftPanel, RightPanel, SaveButton } from './index.styled';
import { MovieInfoCard, LayoutPreviewPanel, AnalysisResultsPanel } from './components';
import { useModal } from '@/hooks/useModal';
import {
    selectedMoviesAtom,
    currentMovieIndexAtom,
    currentLayoutIndexAtom,
    programBookDataAtom,
    currentMovieLayoutAtom,
    draggedItemsAtom,
} from '@/atoms';

export const LayoutScreen = () => {
    const navigate = useNavigate();
    const [selectedMovies] = useAtom(selectedMoviesAtom);
    const [currentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [currentLayoutIndex] = useAtom(currentLayoutIndexAtom);
    const [programBookData, setProgramBookData] = useAtom(programBookDataAtom);
    const [, setCurrentMovieLayout] = useAtom(currentMovieLayoutAtom);
    const [draggedItems] = useAtom(draggedItemsAtom);

    const { isOpen: isTitleModalOpen, openModal: openTitleModal, closeModal: closeTitleModal } = useModal();

    const handleSave = () => {
        openTitleModal();
    };

    const handleSaveWithTitle = (title: string) => {
        const currentMovie = selectedMovies[currentMovieIndex];

        if (!currentMovie) return;

        // 현재 영화의 레이아웃 데이터 생성
        const movieLayoutData = {
            movieId: currentMovie.id,
            layoutId: currentLayoutIndex,
            draggedItems: draggedItems,
        };

        // 기존 영화 데이터가 있으면 업데이트, 없으면 추가
        const existingMovieIndex = programBookData.movies.findIndex((movie) => movie.movieId === currentMovie.id);

        let updatedMovies = [...programBookData.movies];
        if (existingMovieIndex >= 0) {
            updatedMovies[existingMovieIndex] = movieLayoutData;
        } else {
            updatedMovies.push(movieLayoutData);
        }

        // 프로그램북 데이터 업데이트
        setProgramBookData({
            title,
            movies: updatedMovies,
        });

        // 현재 영화 레이아웃 정보도 업데이트
        setCurrentMovieLayout(movieLayoutData);

        console.log('프로그램북 저장 완료:', {
            title,
            movies: updatedMovies,
            currentMovieLayout: movieLayoutData,
        });

        // 저장 후 review 페이지로 이동
        navigate('/newprogrambook/review');
    };

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Title>Layout</Title>
                <Description>Drag and drop analysis results to modify the layout</Description>

                <MovieInfoCard />

                <MainContent>
                    <LeftPanel>
                        <LayoutPreviewPanel />
                    </LeftPanel>

                    <RightPanel>
                        <AnalysisResultsPanel />
                    </RightPanel>
                </MainContent>

                <SaveButton onClick={handleSave}>Save ProgramBook</SaveButton>
            </Section>

            <ProgramBookTitleModal
                isOpen={isTitleModalOpen}
                onClose={closeTitleModal}
                onSave={handleSaveWithTitle}
                initialTitle={programBookData.title}
            />
        </Wrapper>
    );
};
