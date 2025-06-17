import { useAtom } from 'jotai';
import { programBookAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { ResultsWrapper, ResultsList, ResultItem, ResultTitle, ResultContent } from './index.styled';
import type { DraggedItemData } from '@/screens/newprogrambook/layout/types';

const ANALYSIS_ITEMS: Omit<DraggedItemData, 'zone'>[] = [
    { id: 'synopsis', type: 'analysis', content: '영화의 줄거리와 주요 내용을 요약한 설명입니다.' },
    { id: 'theme', type: 'analysis', content: '영화가 전달하고자 하는 핵심 메시지와 주제입니다.' },
    { id: 'characters', type: 'analysis', content: '주요 등장인물과 그들의 역할에 대한 설명입니다.' },
    { id: 'analysis', type: 'analysis', content: '영화의 구조, 스타일, 의미에 대한 심층 분석입니다.' },
    { id: 'review', type: 'analysis', content: '영화의 장단점과 전반적인 평가를 담고 있습니다.' },
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

    return (
        <ResultsWrapper>
            <ResultTitle>Analysis Results - {currentMovie.movie.title}</ResultTitle>
            <ResultsList>
                {ANALYSIS_ITEMS.map((item) => (
                    <ResultItem key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)}>
                        <ResultTitle>{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</ResultTitle>
                        <ResultContent>{item.content}</ResultContent>
                    </ResultItem>
                ))}
            </ResultsList>
        </ResultsWrapper>
    );
};
