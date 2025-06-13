import { ResultItem, ResultHeader, ResultLabel, ResultContent, ResultText, ExpandIcon, DragIcon } from './index.styled';
import type { AnalysisResult } from '../../types';

interface AnalysisResultItemProps {
    result: AnalysisResult;
    isExpanded: boolean;
    onToggle: (id: string) => void;
}

export const AnalysisResultItem = ({ result, isExpanded, onToggle }: AnalysisResultItemProps) => {
    return (
        <ResultItem>
            <ResultHeader onClick={() => onToggle(result.id)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ResultLabel>{result.label}</ResultLabel>
                    <DragIcon>⋮⋮</DragIcon>
                </div>
                <ExpandIcon expanded={isExpanded}>▼</ExpandIcon>
            </ResultHeader>
            <ResultContent expanded={isExpanded}>
                <ResultText>{result.content}</ResultText>
            </ResultContent>
        </ResultItem>
    );
};
