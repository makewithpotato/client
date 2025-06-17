import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { TopBar } from '@/components';
import {
    Wrapper,
    Content,
    MovieSelectionSection,
    MovieCardsWrapper,
    PanelsSection,
    LeftPanel,
    RightPanel,
    SectionTitle,
    SaveButton,
} from './index.styled';
import { MovieInfoCard } from './components/MovieInfoCard';
import { LayoutPreviewPanel } from './components/LayoutPreviewPanel';
import { AnalysisResultsPanel } from './components/AnalysisResultsPanel';
import { ProgramBookTitleModal } from './components/ProgramBookTitleModal';
import { programBookAtom, movieLayoutsAtom, movieDraggedItemsAtom, pdfFilePathAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import type { ProgramBookData } from '@/types/programBook';
import { generateAndSavePDF } from '@/utils/pdf.tsx';

export const LayoutScreen = () => {
    const navigate = useNavigate();
    const [programBook, setProgramBook] = useAtom(programBookAtom);
    const [movieLayouts] = useAtom(movieLayoutsAtom);
    const [movieDraggedItems] = useAtom(movieDraggedItemsAtom);
    const [currentMovieIndex, setCurrentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [, setPdfFilePath] = useAtom(pdfFilePathAtom);
    const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    // Reset currentMovieIndex when movies change
    useEffect(() => {
        if (programBook.movies.length > 0 && currentMovieIndex >= programBook.movies.length) {
            setCurrentMovieIndex(0);
        }
    }, [programBook.movies, currentMovieIndex, setCurrentMovieIndex]);

    const handleMovieSelect = useCallback(
        (index: number) => {
            console.log('Selecting movie at index:', index); // 디버깅용 로그
            setCurrentMovieIndex(index);
        },
        [setCurrentMovieIndex]
    );

    const handleSave = () => {
        if (!programBook.title) {
            setIsTitleModalOpen(true);
            return;
        }
        saveAndNavigate(programBook.title);
    };

    const handleSaveWithTitle = (title: string) => {
        saveAndNavigate(title);
        setIsTitleModalOpen(false);
    };

    const saveAndNavigate = async (title: string) => {
        try {
            setIsGeneratingPDF(true);

            // Update movies with their layouts and analysis results
            const updatedMovies = programBook.movies.map((movie) => ({
                ...movie,
                layoutId: movieLayouts[movie.movieId] || '1',
                analysisResults: movieDraggedItems[movie.movieId] || [],
            }));

            // Update program book with title and updated movies
            const updatedProgramBook: ProgramBookData = {
                ...programBook,
                title,
                movies: updatedMovies,
            };
            setProgramBook(updatedProgramBook);

            // Generate and save PDF
            const pdfPath = await generateAndSavePDF(updatedProgramBook);
            setPdfFilePath(pdfPath);

            // Navigate to review screen
            navigate('/newprogrambook/review');
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            // TODO: Add proper error handling
            alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!programBook.movies || programBook.movies.length === 0) {
        navigate('/newprogrambook/select');
        return null;
    }

    // 디버깅용 로그
    console.log('Current movie index:', currentMovieIndex);
    console.log('Movies:', programBook.movies);

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <MovieSelectionSection>
                    <SectionTitle>Selected Movies</SectionTitle>
                    <MovieCardsWrapper>
                        {programBook.movies.map((movieLayout, index) => (
                            <MovieInfoCard
                                key={movieLayout.movieId}
                                movie={{
                                    ...movieLayout.movie,
                                    layoutId: movieLayouts[movieLayout.movieId] || '1',
                                }}
                                isSelected={index === currentMovieIndex}
                                onClick={() => handleMovieSelect(index)}
                            />
                        ))}
                    </MovieCardsWrapper>
                </MovieSelectionSection>

                <PanelsSection>
                    <LeftPanel>
                        <SectionTitle>Layout Selection</SectionTitle>
                        <LayoutPreviewPanel />
                    </LeftPanel>

                    <RightPanel>
                        <SectionTitle>Analysis Results</SectionTitle>
                        <AnalysisResultsPanel />
                    </RightPanel>
                </PanelsSection>

                <SaveButton onClick={handleSave} disabled={isGeneratingPDF}>
                    {isGeneratingPDF ? 'Generating PDF...' : 'Save and Continue'}
                </SaveButton>
            </Content>

            <ProgramBookTitleModal
                isOpen={isTitleModalOpen}
                onClose={() => setIsTitleModalOpen(false)}
                onSave={handleSaveWithTitle}
                initialTitle={programBook.title}
            />
        </Wrapper>
    );
};
