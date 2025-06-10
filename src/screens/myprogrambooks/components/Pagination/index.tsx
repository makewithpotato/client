import { PaginationWrapper, PageButton } from './index.styled';

export const Pagination = ({
    current,
    total,
    onPage,
}: {
    current: number;
    total: number;
    onPage: (page: number) => void;
}) => {
    // 간단한 페이지네이션 예시 (1, 2, 3 ... 10)
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
                    <span key={i} style={{ color: '#a08b8b', padding: '0 4px' }}>
                        {p}
                    </span>
                )
            )}
            <PageButton onClick={() => onPage(current + 1)} disabled={current === total}>
                {'>'}
            </PageButton>
        </PaginationWrapper>
    );
};
