import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, ProgramBookCard } from '@/components';
import { StartProjectCard } from './components';
import { useProgramBooks } from '@/hooks/useProgramBooks';
import { Wrapper, Section, CardRow, StartRow, Content } from './index.styled';

export const HomeScreen = () => {
    const navigate = useNavigate();
    const { programBooks, isLoading, error, fetchProgramBooks } = useProgramBooks();

    useEffect(() => {
        fetchProgramBooks();
    }, [fetchProgramBooks]);

    // 최근 5개의 프로그램북만 선택
    const recentProgramBooks = programBooks.slice(0, 5);

    const handleStartUpload = () => {
        navigate('/mymovies/upload');
    };

    const handleStartNewProject = () => {
        navigate('/newprogrambook/select');
    };

    const handleProgramBookClick = (id: number) => {
        navigate(`/myprogrambooks/detail/${id}`);
    };

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Content>
                    <h1>Welcome back</h1>
                    <h2 style={{ marginTop: 32, marginBottom: 16 }}>Your projects</h2>
                    {isLoading ? (
                        <div>Loading your projects...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : recentProgramBooks.length > 0 ? (
                        <CardRow>
                            {recentProgramBooks.map((book) => (
                                <ProgramBookCard
                                    key={book.programbookId}
                                    image={book.thumbnailUrl}
                                    title={book.title}
                                    onClick={() => handleProgramBookClick(book.programbookId)}
                                />
                            ))}
                        </CardRow>
                    ) : (
                        <div>No program books yet. Start creating one!</div>
                    )}
                    <h2 style={{ marginTop: 40, marginBottom: 16 }}>Start a new project</h2>
                    <StartRow>
                        <StartProjectCard
                            icon="⬆️"
                            title="Upload Movie"
                            description="Upload your movie file to begin creating your program book."
                            onClick={handleStartUpload}
                        />
                        <StartProjectCard
                            icon="🆕"
                            title="New Projects"
                            description="Customize the layout and design of your program book."
                            onClick={handleStartNewProject}
                        />
                        <StartProjectCard
                            icon="💾"
                            title="Review & Download"
                            description="Review your program book and download the final version."
                            onClick={() => navigate('/myprogrambooks/list')}
                        />
                    </StartRow>
                </Content>
            </Section>
        </Wrapper>
    );
};
