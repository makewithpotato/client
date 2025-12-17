import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, ProgramBookCard } from '@/components';
import { StartProjectCard } from './components';
import { useProgramBooks } from '@/hooks/useProgramBooks';
import { getAccessToken } from '@/utils/auth';
import { ROUTE_NAMES } from '@/constants/routes';
import { Wrapper, Section, CardRow, StartRow, Content, SectionHeader, MoreButton } from './index.styled';

export const HomeScreen = () => {
    const navigate = useNavigate();
    const { programBooks, isLoading, error, fetchProgramBooks } = useProgramBooks();
    const isLoggedIn = !!getAccessToken();

    useEffect(() => {
        if (isLoggedIn) {
            fetchProgramBooks();
        }
    }, [isLoggedIn, fetchProgramBooks]);

    // 최근 5개의 프로그램북만 선택 (ID가 클수록 최신)
    const recentProgramBooks = [...programBooks]
        .sort((a, b) => b.programbookId - a.programbookId)
        .slice(0, 5);

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
                    <SectionHeader>
                        <h2>Your projects</h2>
                        {recentProgramBooks.length > 0 && (
                            <MoreButton onClick={() => navigate('/myprogrambooks/list')}>
                                more
                            </MoreButton>
                        )}
                    </SectionHeader>
                    {!isLoggedIn ? (
                        <div
                            style={{ padding: '24px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}
                        >
                            <p style={{ marginBottom: '12px', fontSize: '16px', color: '#666' }}>
                                Please log in to view your projects
                            </p>
                            <button
                                onClick={() => navigate(ROUTE_NAMES.LOGIN)}
                                style={{
                                    background: '#ff6b35',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 24px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : isLoading ? (
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
                            title="Upload Video"
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
