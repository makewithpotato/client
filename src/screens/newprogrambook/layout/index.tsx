import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
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
import { MovieInfoCard, LayoutPreviewPanel, AnalysisResultsPanel, ProgramBookTitleModal } from './components';
import {
    programBookAtom,
    movieLayoutsAtom,
    movieDraggedItemsAtom,
    pdfFilePathAtom,
    currentMovieLayoutAtom,
    selectedLayoutAtom,
} from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { moviesAtom } from '@/atoms/movies';
import type { ProgramBookData } from '@/types/programBook';
import { generateAndSavePDF } from '@/utils/pdf.tsx';
import { useCreateProgramBook } from '@/hooks/useCreateProgramBook';

export const LayoutScreen = () => {
    const navigate = useNavigate();
    const [programBook, setProgramBook] = useAtom(programBookAtom);
    const [movieLayouts, setMovieLayouts] = useAtom(movieLayoutsAtom);
    const [movieDraggedItems, setMovieDraggedItems] = useAtom(movieDraggedItemsAtom);
    const [currentMovieIndex, setCurrentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [, setPdfFilePath] = useAtom(pdfFilePathAtom);
    const setCurrentMovieLayout = useSetAtom(currentMovieLayoutAtom);
    const setSelectedLayout = useSetAtom(selectedLayoutAtom);
    const [movies] = useAtom(moviesAtom);
    const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const { createProgramBook, isLoading: isUploading, error: uploadError } = useCreateProgramBook();

    // PDF 생성 완료 후 atoms 리셋 함수
    const resetProgramBookAtoms = useCallback(() => {
        setProgramBook({ title: '', description: '', movies: [] });
        setMovieLayouts({});
        setMovieDraggedItems({});
        setCurrentMovieIndex(0);
        setPdfFilePath('');
        setCurrentMovieLayout(null);
        setSelectedLayout('1');
        sessionStorage.removeItem('pdfFilename');
        sessionStorage.removeItem('pdfBlobSize');
    }, [
        setProgramBook,
        setMovieLayouts,
        setMovieDraggedItems,
        setCurrentMovieIndex,
        setPdfFilePath,
        setCurrentMovieLayout,
        setSelectedLayout,
    ]);

    // Helper function to get movie data by movieId
    const getMovieData = useCallback(
        (movieId: string) => {
            const movieFromList = movies.find((m) => m.movieId.toString() === movieId);
            return {
                id: movieId,
                title: movieFromList?.title || 'Unknown Movie',
                posterPath: movieFromList?.thumbnailUrl || '',
                releaseDate: movieFromList?.releaseDate || '',
                overview: '',
                analysisResults: [],
            };
        },
        [movies]
    );

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

            // Generate PDF and store the blob
            const { blob, filename } = await generateAndSavePDF(updatedProgramBook);

            if (!blob) {
                throw new Error('PDF blob is null or undefined');
            }

            // Create a File object from the blob
            const pdfFile = new File([blob], filename, { type: 'application/pdf' });

            // Upload to server
            const uploadSuccess = await createProgramBook({
                title,
                pdfFile,
            });

            if (!uploadSuccess) {
                throw new Error(uploadError || '프로그램북 업로드에 실패했습니다.');
            }

            // Store the blob for preview
            const pdfUrl = URL.createObjectURL(blob);
            setPdfFilePath(pdfUrl);

            // Store the filename
            sessionStorage.setItem('pdfFilename', filename);

            // Reset atoms after successful upload
            resetProgramBookAtoms();

            // Navigate to review screen with blob data
            navigate('/newprogrambook/review', { state: { pdfBlob: blob } });
        } catch (error) {
            console.error('Failed to generate or upload PDF:', error);
            // 성공 메시지가 아닌 경우에만 에러 알림을 표시
            if (!(error instanceof Error && error.message === '요청이 성공했습니다.')) {
                alert(
                    error instanceof Error ? error.message : 'PDF 생성 또는 업로드에 실패했습니다. 다시 시도해주세요.'
                );
            }
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
                    <SectionTitle>Selected Videos</SectionTitle>
                    <MovieCardsWrapper>
                        {programBook.movies.map((movieLayout, index) => {
                            const movieData = movieLayout.movie || getMovieData(movieLayout.movieId);
                            return (
                                <MovieInfoCard
                                    key={movieLayout.movieId}
                                    movie={{
                                        ...movieData,
                                        layoutId: movieLayouts[movieLayout.movieId] || '1',
                                    }}
                                    isSelected={index === currentMovieIndex}
                                    onClick={() => handleMovieSelect(index)}
                                />
                            );
                        })}
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

                <SaveButton onClick={handleSave} disabled={isGeneratingPDF || isUploading}>
                    {isGeneratingPDF ? 'Generating PDF...' : isUploading ? 'Uploading...' : 'Save and Continue'}
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
