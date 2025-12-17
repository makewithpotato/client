import { TopBar } from '@/components';
import { AnalysisItem } from './components/AnalysisItem';
import { Wrapper, Content, Header, Title, MovieInfo, Divider, Section, SaveButton } from './index.styled';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MOVIE_API from '@/services/movie';
import type { MovieAnalysis } from '@/types/movie';

export const MovieAnalyzeScreen = () => {
    const { movieId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie-analysis', movieId],
        queryFn: async () => {
            if (!movieId) {
                throw new Error('영화 ID가 없습니다.');
            }
            const response = await MOVIE_API.getMovieAnalysis(movieId);
            return response.data;
        },
        enabled: !!movieId,
    });

    const analysis: MovieAnalysis | undefined = data;

    const handleEdit = (field: string, index?: number) => {
        // TODO: Implement edit functionality
        console.log(`Editing ${field} ${index !== undefined ? `at index ${index}` : ''}`);
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving analysis');
    };

    if (isLoading) {
        return (
            <Wrapper>
                <TopBar />
                <Content>
                    <Header>
                        <Title>Loading...</Title>
                    </Header>
                </Content>
            </Wrapper>
        );
    }

    if (isError || !analysis) {
        return (
            <Wrapper>
                <TopBar />
                <Content>
                    <Header>
                        <Title>분석 정보를 불러오지 못했습니다.</Title>
                    </Header>
                </Content>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <Header>
                    <Title>Analysis Results</Title>
                    <MovieInfo>
                        <span>{analysis.title}</span>
                        <Divider>•</Divider>
                        <span>{analysis.director}</span>
                        <Divider>•</Divider>
                        <span>{analysis.genre}</span>
                    </MovieInfo>
                </Header>

                <Section>
                    <AnalysisItem label="Video Title" content={analysis.title} onEdit={() => handleEdit('title')} />
                    <AnalysisItem label="Director" content={analysis.director} onEdit={() => handleEdit('director')} />
                    <AnalysisItem label="Genre" content={analysis.genre} onEdit={() => handleEdit('genre')} />
                    <AnalysisItem label="Cast" content={analysis.actor} onEdit={() => handleEdit('actor')} />
                    <AnalysisItem
                        label="Release Date"
                        content={analysis.releaseDate}
                        onEdit={() => handleEdit('releaseDate')}
                    />
                    {analysis.promptResults.map((result, index) => (
                        <AnalysisItem
                            key={`prompt-${index}`}
                            label={result.prompt}
                            content={result.result}
                            onEdit={() => handleEdit('promptResult', index)}
                        />
                    ))}
                    {analysis.retrievalResults?.map((result, index) => (
                        <div key={`retrieval-${index}`} style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#666' }}>
                                Scene: {result.scene}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {result.uri.map((uri, uriIndex) => (
                                    <img
                                        key={uriIndex}
                                        src={uri}
                                        alt={`${result.scene} ${uriIndex + 1}`}
                                        style={{
                                            width: '150px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            backgroundColor: '#f0f0f0',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </Section>
            </Content>
            <SaveButton onClick={handleSave}>Save Video</SaveButton>
        </Wrapper>
    );
};
