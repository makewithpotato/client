import { PaginationWrapper, PageButton, PageDots } from './index.styled';

export const Pagination = ({
    current,
    total,
    onPage,
}: {
    current: number;
    total: number;
    onPage: (page: number) => void;
}) => {
    const pages = [1, 2, 3, '...', total];

    return (
        <PaginationWrapper>
            <PageButton onClick={() => onPage(current - 1)} disabled={current === 1}>
                {'<'}
            </PageButton>
            {pages.map((p, i) =>
                typeof p === 'number' ? (
                    <PageButton key={p} active={p === current} onClick={() => onPage(p)}>
                        {p}
                    </PageButton>
                ) : (
                    <PageDots key={i}>{p}</PageDots>
                )
            )}
            <PageButton onClick={() => onPage(current + 1)} disabled={current === total}>
                {'>'}
            </PageButton>
        </PaginationWrapper>
    );
};
