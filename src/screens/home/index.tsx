import { TopBar, ProgramBookCard } from '@/components';
import { StartProjectCard } from './components';
import programBookEx from '@/assets/images/png/programbook_ex.png';
import { Wrapper, Section, CardRow, StartRow, Content } from './index.styled';

export const HomeScreen = () => {
    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Content>
                    <h1>Welcome back, Alex</h1>
                    <h2 style={{ marginTop: 32, marginBottom: 16 }}>Your projects</h2>
                    <CardRow>
                        <ProgramBookCard
                            image={programBookEx}
                            title="The Midnight Bloom"
                            subtitle="Last edited 2 days ago"
                        />
                        <ProgramBookCard
                            image={programBookEx}
                            title="Echoes of the Past"
                            subtitle="Last edited 1 week ago"
                        />
                        <ProgramBookCard
                            image={programBookEx}
                            title="Crimson Horizon"
                            subtitle="Last edited 2 weeks ago"
                        />
                    </CardRow>
                    <h2 style={{ marginTop: 40, marginBottom: 16 }}>Start a new project</h2>
                    <StartRow>
                        <StartProjectCard
                            icon="⬆️"
                            title="Upload Movie"
                            description="Upload your movie file to begin creating your program book."
                        />
                        <StartProjectCard
                            icon="🆕"
                            title="New Projects"
                            description="Customize the layout and design of your program book."
                        />
                        <StartProjectCard
                            icon="💾"
                            title="Review & Download"
                            description="Review your program book and download the final version."
                        />
                    </StartRow>
                </Content>
            </Section>
        </Wrapper>
    );
};
