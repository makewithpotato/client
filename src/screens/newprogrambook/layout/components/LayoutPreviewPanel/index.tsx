import { useAtom } from 'jotai';
import { movieLayoutsAtom, movieDraggedItemsAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { programBookAtom } from '@/atoms/programBook';
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

interface Layout {
    id: string;
    title: string;
    image: string;
    zones: string[];
}

const LAYOUTS: Layout[] = [
    { id: '1', title: 'Basic Layout', image: '/layouts/basic.png', zones: ['top', 'middle', 'bottom'] },
    { id: '2', title: 'Poster Layout', image: '/layouts/poster.png', zones: ['left', 'right'] },
    { id: '3', title: 'Text Layout', image: '/layouts/text.png', zones: ['header', 'content', 'footer'] },
];

export const LayoutPreviewPanel = () => {
    const [movieLayouts, setMovieLayouts] = useAtom(movieLayoutsAtom);
    const [movieDraggedItems, setMovieDraggedItems] = useAtom(movieDraggedItemsAtom);
    const [currentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [programBook] = useAtom(programBookAtom);

    const currentMovie = programBook.movies[currentMovieIndex];
    const currentLayoutId = currentMovie ? movieLayouts[currentMovie.movieId] || '1' : '1';
    const currentLayout = LAYOUTS.find((l) => l.id === currentLayoutId) || LAYOUTS[0];
    const currentItems = currentMovie ? movieDraggedItems[currentMovie.movieId] || [] : [];

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

            setMovieDraggedItems((prev) => ({
                ...prev,
                [currentMovie.movieId]: [...(prev[currentMovie.movieId] || []), newItem],
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

        setMovieDraggedItems((prev) => ({
            ...prev,
            [currentMovie.movieId]: (prev[currentMovie.movieId] || []).filter(
                (item) => !(item.id === itemId && item.zone === zone)
            ),
        }));
    };

    const renderDropZone = (zone: string, title: string) => {
        const zoneItems = currentItems.filter((item) => item.zone === zone);

        return (
            <DropZone onDrop={(e) => handleDrop(e, zone)} onDragOver={handleDragOver}>
                <DropZoneTitle>{title}</DropZoneTitle>
                {zoneItems.map((item, index) => (
                    <AnalysisItem key={`${item.id}-${index}`}>
                        <AnalysisTitle>{item.type}</AnalysisTitle>
                        <AnalysisContent>{item.content}</AnalysisContent>
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
            <Title>Layout Preview - {currentMovie.movie.title}</Title>
            <LayoutGrid>
                {LAYOUTS.map((layout) => (
                    <LayoutOption
                        key={layout.id}
                        isSelected={currentLayoutId === layout.id}
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
