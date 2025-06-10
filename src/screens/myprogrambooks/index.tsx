import { TopBar, ProgramBookCard, SearchBar } from '@/components';
import { Wrapper, Section, CardGrid } from './index.styled';
import { TabBar, Pagination } from './components';
import { useState } from 'react';
import programBookEx from '@/assets/images/png/programbook_ex.png';

const books = [
    { image: programBookEx, title: 'The Enchanted Forest', subtitle: '' },
    { image: programBookEx, title: 'The Lost City', subtitle: '' },
    { image: programBookEx, title: 'The Crimson Tide', subtitle: '' },
    { image: programBookEx, title: 'Whispers of the Past', subtitle: '' },
    { image: programBookEx, title: 'Echoes of Tomorrow', subtitle: '' },
    { image: programBookEx, title: 'The Silent Symphony', subtitle: '' },
];

export const MyProgramBooksScreen = () => {
    const [tab, setTab] = useState<'all' | 'shared'>('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // 실제 데이터 필터링/페이징은 필요에 따라 구현
    return (
        <Wrapper>
            <TopBar />
            <Section>
                <h1>My Program Books</h1>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                <TabBar active={tab} onTab={setTab} />
                <CardGrid>
                    {books.map((b, i) => (
                        <ProgramBookCard key={i} image={b.image} title={b.title} subtitle={b.subtitle} />
                    ))}
                </CardGrid>
                <Pagination current={page} total={10} onPage={setPage} />
            </Section>
        </Wrapper>
    );
};
