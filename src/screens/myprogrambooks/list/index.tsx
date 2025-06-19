import { useNavigate } from 'react-router-dom';
import { TopBar, ProgramBookCard, SearchBar, Pagination } from '@/components';
import { Wrapper, Section, CardGrid } from './index.styled';
import { useState, useEffect } from 'react';
import { useProgramBooks } from '@/hooks/useProgramBooks';

export const MyProgramBooksScreen = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { programBooks, isLoading, error, fetchProgramBooks } = useProgramBooks();

    useEffect(() => {
        fetchProgramBooks();
    }, [fetchProgramBooks]);

    // 검색어로 프로그램북 필터링
    const filteredBooks = programBooks.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));

    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    const handleProgramBookClick = (id: number) => {
        navigate(`/myprogrambooks/detail/${id}`);
    };

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <h1>My Program Books</h1>
                    <div>Error: {error}</div>
                </Section>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <h1>My Program Books</h1>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* <TabBar active={tab} onTab={setTab} /> */}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <CardGrid>
                            {paginatedBooks.map((book) => (
                                <ProgramBookCard
                                    key={book.programbookId}
                                    image={book.thumbnailUrl}
                                    title={book.title}
                                    onClick={() => handleProgramBookClick(book.programbookId)}
                                />
                            ))}
                        </CardGrid>
                        <Pagination
                            current={page}
                            total={filteredBooks.length}
                            onPage={setPage}
                            itemsPerPage={itemsPerPage}
                        />
                    </>
                )}
            </Section>
        </Wrapper>
    );
};
