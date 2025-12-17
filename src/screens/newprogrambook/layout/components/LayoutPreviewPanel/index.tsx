import { useAtom } from 'jotai';
import { movieLayoutsAtom, movieDraggedItemsAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { programBookAtom } from '@/atoms/programBook';
import { moviesAtom } from '@/atoms/movies';
import type { DraggedItemData } from '@/screens/newprogrambook/layout/types';
import {
    Panel,
    Title,
    LayoutGrid,
    LayoutOption,
    LayoutImage,
    LayoutTitle,
    PreviewPanel,
    DropZone,
    DropZoneTitle,
    AnalysisItem,
    AnalysisTitle,
    AnalysisContent,
    DeleteButton,
} from './index.styled';
import layout1 from '@/assets/images/layouts/layout1.svg';

interface Layout {
    id: string;
    title: string;
    image: string;
    zones: string[];
}

const LAYOUTS: Layout[] = [
    {
        id: '1',
        title: 'Two Page Layout',
        image: layout1,
        zones: ['Main Image', 'Sub Image', 'First Section', 'Second Section', 'Third Section'],
    },
];

export const LayoutPreviewPanel = () => {
    const [movieLayouts, setMovieLayouts] = useAtom(movieLayoutsAtom);
    const [movieDraggedItems, setMovieDraggedItems] = useAtom(movieDraggedItemsAtom);
    const [currentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [programBook, setProgramBook] = useAtom(programBookAtom);
    const [movies] = useAtom(moviesAtom);

    const currentMovie = programBook.movies[currentMovieIndex];
    const currentLayoutId = currentMovie ? movieLayouts[currentMovie.movieId] || '1' : '1';
    const currentLayout = LAYOUTS.find((l) => l.id === currentLayoutId) || LAYOUTS[0];
    const currentItems = currentMovie ? movieDraggedItems[currentMovie.movieId] || [] : [];

    // Get movie title from moviesAtom or fallback to programBook movie data
    const movieTitle = currentMovie
        ? currentMovie.movie?.title ||
          movies.find((m) => m.movieId.toString() === currentMovie.movieId)?.title ||
          'Unknown Movie'
        : '';

    // 이미지 미리보기를 위한 스타일
    const imagePreviewStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'contain' as const,
        borderRadius: '4px',
        marginBottom: '8px',
        backgroundColor: '#f5f5f5',
    };

    const imageContainerStyle = {
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '8px',
    };

    const handleLayoutSelect = (layoutId: string) => {
        if (!currentMovie) return;
        setMovieLayouts((prev) => ({
            ...prev,
            [currentMovie.movieId]: layoutId,
        }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, zone: string) => {
        e.preventDefault();
        if (!currentMovie) return;

        try {
            const item = JSON.parse(e.dataTransfer.getData('text/plain'));
            const newItem: DraggedItemData = { ...item, type: 'analysis' as const, zone };

            // Update movieDraggedItems
            setMovieDraggedItems((prev) => ({
                ...prev,
                [currentMovie.movieId]: [...(prev[currentMovie.movieId] || []), newItem],
            }));

            // Update programBook atom to include the dragged items
            setProgramBook((prev) => ({
                ...prev,
                movies: prev.movies.map((movie, index) => {
                    if (index === currentMovieIndex) {
                        return {
                            ...movie,
                            draggedItems: [...(movie.draggedItems || []), newItem],
                        };
                    }
                    return movie;
                }),
            }));
        } catch (error) {
            console.error('Failed to parse dragged item:', error);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDelete = (itemId: string, zone: string) => {
        if (!currentMovie) return;

        // Update movieDraggedItems
        setMovieDraggedItems((prev) => ({
            ...prev,
            [currentMovie.movieId]: (prev[currentMovie.movieId] || []).filter(
                (item) => !(item.id === itemId && item.zone === zone)
            ),
        }));

        // Update programBook atom to remove the deleted item
        setProgramBook((prev) => ({
            ...prev,
            movies: prev.movies.map((movie, index) => {
                if (index === currentMovieIndex) {
                    return {
                        ...movie,
                        draggedItems: (movie.draggedItems || []).filter(
                            (item) => !(item.id === itemId && item.zone === zone)
                        ),
                    };
                }
                return movie;
            }),
        }));
    };

    const renderDropZone = (zone: string, title: string) => {
        const items = currentItems.filter((item) => item.zone === zone);
        const isImageZone = zone === 'Main Image' || zone === 'Sub Image';

        return (
            <DropZone
                key={zone}
                onDrop={(e) => {
                    if (isImageZone && items.length >= 1) {
                        alert('이미지 영역에는 하나의 이미지만 추가할 수 있습니다.');
                        return;
                    }
                    handleDrop(e, zone);
                }}
                onDragOver={handleDragOver}
            >
                <DropZoneTitle>
                    {zone === 'Main Image' ? 'Main Image' : zone === 'Sub Image' ? 'Sub Image' : title}
                </DropZoneTitle>
                {items.map((item, index) => (
                    <AnalysisItem key={index}>
                        {isImageZone ? (
                            <>
                                <div style={imageContainerStyle}>
                                    <img src={item.content} alt={item.title} style={imagePreviewStyle} />
                                </div>
                                <AnalysisTitle>{item.title}</AnalysisTitle>
                            </>
                        ) : (
                            <>
                                <AnalysisTitle>{item.title}</AnalysisTitle>
                                <AnalysisContent>{item.content}</AnalysisContent>
                            </>
                        )}
                        <DeleteButton onClick={() => handleDelete(item.id, zone)}>×</DeleteButton>
                    </AnalysisItem>
                ))}
            </DropZone>
        );
    };

    if (!currentMovie) {
        return (
            <Panel>
                <Title>Layout Preview</Title>
                <p>Please select a movie to edit its layout.</p>
            </Panel>
        );
    }

    return (
        <Panel>
            <Title>Layout Preview - {movieTitle}</Title>
            <LayoutGrid>
                {LAYOUTS.map((layout) => (
                    <LayoutOption
                        key={layout.id}
                        isSelected={layout.id === currentLayoutId}
                        onClick={() => handleLayoutSelect(layout.id)}
                    >
                        <LayoutImage src={layout.image} alt={layout.title} />
                        <LayoutTitle>{layout.title}</LayoutTitle>
                    </LayoutOption>
                ))}
            </LayoutGrid>
            <PreviewPanel>
                {currentLayout.zones.map((zone) => renderDropZone(zone, zone.charAt(0).toUpperCase() + zone.slice(1)))}
            </PreviewPanel>
        </Panel>
    );
};
