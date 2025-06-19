import { TopBar } from '@/components';
import { AnalysisItem } from './components/AnalysisItem';
import { Wrapper, Content, Header, Title, MovieInfo, Divider, Section, SaveButton } from './index.styled';

interface MovieAnalysis {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    cast: string;
    synopsis: string;
    productionNotes: string;
    reviews: string;
    behindTheScenes: string;
    trivia: string;
    gallery: string;
}

// TODO: Replace with actual data fetching
const mockAnalysis: MovieAnalysis = {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    genre: 'Drama',
    releaseDate: '1994-09-23T00:00:00',
    cast: 'Tim Robbins, Morgan Freeman',
    synopsis:
        'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    productionNotes: 'The movie was filmed at the Ohio State Reformatory...',
    reviews: 'Received widespread critical acclaim...',
    behindTheScenes: 'The filming took place over three months...',
    trivia: 'The role of Red was originally written for a white man...',
    gallery: 'Image links would go here...',
};

export const MovieAnalyzeScreen = () => {
    const handleEdit = (field: keyof MovieAnalysis) => {
        // TODO: Implement edit functionality
        console.log(`Editing ${field}`);
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving analysis');
    };

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <Header>
                    <Title>Analysis Results</Title>
                    <MovieInfo>
                        <span>{mockAnalysis.title}</span>
                        <Divider>•</Divider>
                        <span>{mockAnalysis.director}</span>
                        <Divider>•</Divider>
                        <span>{mockAnalysis.genre}</span>
                    </MovieInfo>
                </Header>

                <Section>
                    <AnalysisItem label="Movie Title" content={mockAnalysis.title} onEdit={() => handleEdit('title')} />
                    <AnalysisItem
                        label="Director"
                        content={mockAnalysis.director}
                        onEdit={() => handleEdit('director')}
                    />
                    <AnalysisItem label="Genre" content={mockAnalysis.genre} onEdit={() => handleEdit('genre')} />
                    <AnalysisItem label="Cast" content={mockAnalysis.cast} onEdit={() => handleEdit('cast')} />
                    <AnalysisItem
                        label="Synopsis"
                        content={mockAnalysis.synopsis}
                        onEdit={() => handleEdit('synopsis')}
                    />
                    <AnalysisItem
                        label="Production Notes"
                        content={mockAnalysis.productionNotes}
                        onEdit={() => handleEdit('productionNotes')}
                    />
                    <AnalysisItem label="Reviews" content={mockAnalysis.reviews} onEdit={() => handleEdit('reviews')} />
                    <AnalysisItem
                        label="Behind the Scenes"
                        content={mockAnalysis.behindTheScenes}
                        onEdit={() => handleEdit('behindTheScenes')}
                    />
                    <AnalysisItem label="Trivia" content={mockAnalysis.trivia} onEdit={() => handleEdit('trivia')} />
                    <AnalysisItem label="Gallery" content={mockAnalysis.gallery} onEdit={() => handleEdit('gallery')} />
                </Section>
            </Content>
            <SaveButton onClick={handleSave}>Save Movie</SaveButton>
        </Wrapper>
    );
};
