import { useAtom } from 'jotai';
import { programBookAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { ResultsWrapper, ResultsList, ResultItem, ResultTitle, ResultContent } from './index.styled';
import type { DraggedItemData } from '@/screens/newprogrambook/layout/types';
import movieTestImg from '@/assets/images/png/movie_test_img.png';
import programbookEx from '@/assets/images/png/programbook_ex.png';

const ANALYSIS_ITEMS: Omit<DraggedItemData, 'zone'>[] = [
    {
        id: 'synopsis',
        type: 'analysis',
        title: '영화 줄거리',
        content: '영화의 전체적인 스토리와 주요 내용을 설명합니다.',
    },
    {
        id: 'director',
        type: 'analysis',
        title: '감독의 말',
        content: '영화 감독이 전하는 영화에 대한 메시지와 의도를 담고 있습니다.',
    },
    {
        id: 'review',
        type: 'analysis',
        title: '영화 리뷰',
        content: '영화에 대한 전문가의 분석과 평가를 제공합니다.',
    },
    {
        id: 'mainImage',
        type: 'analysis',
        title: '메인 이미지',
        content: movieTestImg,
    },
    {
        id: 'secondImage',
        type: 'analysis',
        title: '보조 이미지',
        content: programbookEx,
    },
];

export const AnalysisResultsPanel = () => {
    const [programBook] = useAtom(programBookAtom);
    const [currentMovieIndex] = useAtom(currentMovieIndexAtom);

    const currentMovie = programBook.movies[currentMovieIndex];

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Omit<DraggedItemData, 'zone'>) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(item));
    };

    if (!currentMovie) {
        return (
            <ResultsWrapper>
                <ResultTitle>Analysis Results</ResultTitle>
                <p>Please select a movie to see its analysis results.</p>
            </ResultsWrapper>
        );
    }

    // 이미지 미리보기를 위한 스타일
    const imagePreviewStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'contain' as const,
        borderRadius: '4px',
        marginBottom: '8px',
        backgroundColor: '#f5f5f5',
    };

    const imageContainerStyle = {
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '8px',
    };

    return (
        <ResultsWrapper>
            <ResultTitle>Analysis Results - {currentMovie.movie.title}</ResultTitle>
            <ResultsList>
                {ANALYSIS_ITEMS.map((item) => (
                    <ResultItem key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)}>
                        <ResultTitle>{item.title}</ResultTitle>
                        {item.id.includes('Image') ? (
                            <>
                                <div style={imageContainerStyle}>
                                    <img src={item.content} alt={item.title} style={imagePreviewStyle} />
                                </div>
                                <ResultContent>이미지를 드래그하여 배치하세요</ResultContent>
                            </>
                        ) : (
                            <ResultContent>{item.content}</ResultContent>
                        )}
                    </ResultItem>
                ))}
            </ResultsList>
        </ResultsWrapper>
    );
};
