import { PaginationWrapper, PageButton, PageDots } from './index.styled';

interface PaginationProps {
    current: number;
    total: number;
    onPage: (page: number) => void;
    itemsPerPage?: number;
}

export const Pagination = ({ current, total, onPage, itemsPerPage = 10 }: PaginationProps) => {
    const totalPages = Math.ceil(total / itemsPerPage);

    // Don't render pagination if there are no pages
    if (totalPages === 0) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current <= 3) {
                // If current page is near the start
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push(-1); // Dots
                pages.push(totalPages);
            } else if (current >= totalPages - 2) {
                // If current page is near the end
                pages.push(-1); // Dots
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // If current page is in the middle
                pages.push(-1); // Dots
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push(-1); // Dots
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <PaginationWrapper>
            <PageButton onClick={() => onPage(current - 1)} disabled={current === 1 || totalPages === 0}>
                ←
            </PageButton>

            {getPageNumbers().map((pageNum, index) =>
                pageNum === -1 ? (
                    <PageDots key={`dots-${index}`}>...</PageDots>
                ) : (
                    <PageButton key={pageNum} $isActive={current === pageNum} onClick={() => onPage(pageNum)}>
                        {pageNum}
                    </PageButton>
                )
            )}

            <PageButton onClick={() => onPage(current + 1)} disabled={current === totalPages || totalPages === 0}>
                →
            </PageButton>
        </PaginationWrapper>
    );
};
