import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { TopBar } from '@/components';
import {
    Wrapper,
    Content,
    LeftPanel,
    LeftPanelHeader,
    LeftPanelContent,
    CanvasArea,
    A4Canvas,
    Controls,
    Button,
    MovieTabList,
    MovieTab,
    PageLabel,
} from './index.styled';
import { AnalysisResultsPanel } from '../layout/components/AnalysisResultsPanel';
import { CanvasItem } from './components/CanvasItem';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ProgramBookTitleModal } from '../layout/components/ProgramBookTitleModal';
import { ShapesToolbar, type ShapeType } from './components/ShapesToolbar';
import type { CanvasItemData } from './components/CanvasItem';
import {
    programBookAtom,
    movieLayoutsAtom,
    movieDraggedItemsAtom,
    pdfFilePathAtom,
    currentMovieLayoutAtom,
    selectedLayoutAtom,
} from '@/atoms/programBook';
import { currentMovieIndexAtom } from '@/atoms';
import { moviesAtom } from '@/atoms/movies';
import { useCreateProgramBook } from '@/hooks/useCreateProgramBook';
import { useCanvasKeyboardShortcuts } from './hooks';

interface Page {
    id: string;
    items: CanvasItemData[];
}

export const CustomProgramBookScreen = () => {
    const navigate = useNavigate();
    const canvasRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

    const [programBook, setProgramBook] = useAtom(programBookAtom);
    const [currentMovieIndex, setCurrentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [movies] = useAtom(moviesAtom);
    const setMovieLayouts = useSetAtom(movieLayoutsAtom);
    const setMovieDraggedItems = useSetAtom(movieDraggedItemsAtom);
    const setPdfFilePath = useSetAtom(pdfFilePathAtom);
    const setCurrentMovieLayout = useSetAtom(currentMovieLayoutAtom);
    const setSelectedLayout = useSetAtom(selectedLayoutAtom);

    // PDF 생성 완료 후 atoms 리셋 함수
    const resetProgramBookAtoms = useCallback(() => {
        setProgramBook({ title: '', description: '', movies: [] });
        setMovieLayouts({});
        setMovieDraggedItems({});
        setCurrentMovieIndex(0);
        setPdfFilePath('');
        setCurrentMovieLayout(null);
        setSelectedLayout('1');
        sessionStorage.removeItem('pdfFilename');
        sessionStorage.removeItem('pdfBlobSize');
    }, [
        setProgramBook,
        setMovieLayouts,
        setMovieDraggedItems,
        setCurrentMovieIndex,
        setPdfFilePath,
        setCurrentMovieLayout,
        setSelectedLayout,
    ]);

    const [pages, setPages] = useState<Page[]>([{ id: 'page-1', items: [] }]);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [clipboard, setClipboard] = useState<CanvasItemData | null>(null);

    const { createProgramBook, isLoading: isUploading } = useCreateProgramBook();

    // Helper function to get movie title by movieId
    const getMovieTitle = useCallback(
        (movieId: string) => {
            const movieFromList = movies.find((m) => m.movieId.toString() === movieId);
            return movieFromList?.title || 'Unknown Movie';
        },
        [movies]
    );

    const selectedItem = React.useMemo(() => {
        for (const page of pages) {
            const item = page.items.find((i) => i.id === selectedItemId);
            if (item) return item;
        }
        return null;
    }, [pages, selectedItemId]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent, pageId: string) => {
        e.preventDefault();
        const dataStr = e.dataTransfer.getData('text/plain');
        if (!dataStr) return;

        try {
            const droppedItem = JSON.parse(dataStr);
            const canvasRect = canvasRefs.current[pageId]?.getBoundingClientRect();

            if (!canvasRect) return;

            const x = e.clientX - canvasRect.left;
            const y = e.clientY - canvasRect.top;

            const newItem: CanvasItemData = {
                id: `item-${Date.now()}`,
                type:
                    droppedItem.id.includes('Image') ||
                    droppedItem.id.includes('retrieval') ||
                    droppedItem.type === 'image'
                        ? 'image'
                        : 'text',
                content: droppedItem.content,
                title: droppedItem.title,
                originalId: droppedItem.id,
                x: Math.max(0, x),
                y: Math.max(0, y),
                width:
                    droppedItem.id.includes('Image') ||
                    droppedItem.id.includes('retrieval') ||
                    droppedItem.type === 'image'
                        ? 200
                        : 150,
                height:
                    droppedItem.id.includes('Image') ||
                    droppedItem.id.includes('retrieval') ||
                    droppedItem.type === 'image'
                        ? 150
                        : 100,
                zIndex: pages.find((p) => p.id === pageId)?.items.length || 1,
            };

            setPages((prev) =>
                prev.map((page) => (page.id === pageId ? { ...page, items: [...page.items, newItem] } : page))
            );
            setSelectedItemId(newItem.id);
        } catch (error) {
            console.error('Failed to parse dropped item:', error);
        }
    };

    const handleUpdateItem = (id: string, data: Partial<CanvasItemData>) => {
        setPages((prev) =>
            prev.map((page) => ({
                ...page,
                items: page.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
            }))
        );
    };

    const handleDeleteItem = (id: string) => {
        setPages((prev) =>
            prev.map((page) => ({
                ...page,
                items: page.items.filter((item) => item.id !== id),
            }))
        );
        if (selectedItemId === id) {
            setSelectedItemId(null);
        }
    };

    const handleAddPage = () => {
        setPages((prev) => [...prev, { id: `page-${Date.now()}`, items: [] }]);
    };

    const handleDeletePage = (pageId: string) => {
        if (pages.length <= 1) {
            alert('Cannot delete the last page.');
            return;
        }
        if (confirm('Are you sure you want to delete this page?')) {
            setPages((prev) => prev.filter((p) => p.id !== pageId));
        }
    };

    // Z-Index 순서 조절 핸들러
    const handleBringToFront = (id: string) => {
        setPages((prev) =>
            prev.map((page) => {
                const itemIndex = page.items.findIndex((item) => item.id === id);
                if (itemIndex === -1) return page;

                const maxZIndex = Math.max(...page.items.map((item) => item.zIndex), 0);
                return {
                    ...page,
                    items: page.items.map((item) => (item.id === id ? { ...item, zIndex: maxZIndex + 1 } : item)),
                };
            })
        );
    };

    const handleSendToBack = (id: string) => {
        setPages((prev) =>
            prev.map((page) => {
                const itemIndex = page.items.findIndex((item) => item.id === id);
                if (itemIndex === -1) return page;

                const minZIndex = Math.min(...page.items.map((item) => item.zIndex), 1);
                return {
                    ...page,
                    items: page.items.map((item) => (item.id === id ? { ...item, zIndex: minZIndex - 1 } : item)),
                };
            })
        );
    };

    const handleBringForward = (id: string) => {
        setPages((prev) =>
            prev.map((page) => {
                const targetItem = page.items.find((item) => item.id === id);
                if (!targetItem) return page;

                // Find the item with the next higher zIndex
                const higherItems = page.items
                    .filter((item) => item.zIndex > targetItem.zIndex)
                    .sort((a, b) => a.zIndex - b.zIndex);

                if (higherItems.length === 0) return page; // Already at front

                const nextItem = higherItems[0];
                return {
                    ...page,
                    items: page.items.map((item) => {
                        if (item.id === id) return { ...item, zIndex: nextItem.zIndex };
                        if (item.id === nextItem.id) return { ...item, zIndex: targetItem.zIndex };
                        return item;
                    }),
                };
            })
        );
    };

    const handleSendBackward = (id: string) => {
        setPages((prev) =>
            prev.map((page) => {
                const targetItem = page.items.find((item) => item.id === id);
                if (!targetItem) return page;

                // Find the item with the next lower zIndex
                const lowerItems = page.items
                    .filter((item) => item.zIndex < targetItem.zIndex)
                    .sort((a, b) => b.zIndex - a.zIndex);

                if (lowerItems.length === 0) return page; // Already at back

                const prevItem = lowerItems[0];
                return {
                    ...page,
                    items: page.items.map((item) => {
                        if (item.id === id) return { ...item, zIndex: prevItem.zIndex };
                        if (item.id === prevItem.id) return { ...item, zIndex: targetItem.zIndex };
                        return item;
                    }),
                };
            })
        );
    };

    // 복사/붙여넣기/복제 핸들러
    const handleCopy = useCallback((item: CanvasItemData) => {
        setClipboard(item);
    }, []);

    const handlePaste = useCallback(
        (item: CanvasItemData) => {
            // Find which page the item belongs to, or default to first page
            const targetPageId = pages[0]?.id;
            if (!targetPageId) return;

            const newItem: CanvasItemData = {
                ...item,
                id: `item-${Date.now()}`,
                x: item.x + 20, // Offset to make it visible
                y: item.y + 20,
                zIndex: (pages.find((p) => p.id === targetPageId)?.items.length || 0) + 1,
            };

            setPages((prev) =>
                prev.map((page) => (page.id === targetPageId ? { ...page, items: [...page.items, newItem] } : page))
            );
            setSelectedItemId(newItem.id);
        },
        [pages]
    );

    const handleDuplicate = useCallback(
        (item: CanvasItemData) => {
            // Find which page contains this item
            let targetPageId: string | null = null;
            for (const page of pages) {
                if (page.items.some((i) => i.id === item.id)) {
                    targetPageId = page.id;
                    break;
                }
            }
            if (!targetPageId) return;

            const newItem: CanvasItemData = {
                ...item,
                id: `item-${Date.now()}`,
                x: item.x + 20,
                y: item.y + 20,
                zIndex: (pages.find((p) => p.id === targetPageId)?.items.length || 0) + 1,
            };

            setPages((prev) =>
                prev.map((page) => (page.id === targetPageId ? { ...page, items: [...page.items, newItem] } : page))
            );
            setSelectedItemId(newItem.id);
        },
        [pages]
    );

    // 키보드 단축키 훅
    useCanvasKeyboardShortcuts({
        selectedItemId,
        selectedItem,
        clipboard,
        onDelete: handleDeleteItem,
        onCopy: handleCopy,
        onPaste: handlePaste,
        onDuplicate: handleDuplicate,
        onBringToFront: handleBringToFront,
        onSendToBack: handleSendToBack,
        onBringForward: handleBringForward,
        onSendBackward: handleSendBackward,
    });

    // 도형 추가 핸들러
    const handleAddShape = (shapeType: ShapeType) => {
        // 첫 번째 페이지에 도형 추가 (현재 보이는 페이지)
        const targetPageId = pages[0]?.id;
        if (!targetPageId) return;

        // 도형별 기본 크기 설정
        const shapeDefaults: Record<ShapeType, { width: number; height: number; backgroundColor: string }> = {
            textbox: { width: 150, height: 60, backgroundColor: 'transparent' },
            rectangle: { width: 120, height: 80, backgroundColor: '#e0e0e0' },
            circle: { width: 100, height: 100, backgroundColor: '#e0e0e0' },
            line: { width: 150, height: 4, backgroundColor: '#000000' },
        };

        const defaults = shapeDefaults[shapeType];

        const newItem: CanvasItemData = {
            id: `shape-${Date.now()}`,
            type: shapeType,
            content: shapeType === 'textbox' ? '텍스트를 입력하세요' : '',
            title: '',
            originalId: `${shapeType}-${Date.now()}`,
            x: 200,
            y: 200,
            width: defaults.width,
            height: defaults.height,
            zIndex: (pages.find((p) => p.id === targetPageId)?.items.length || 0) + 1,
            backgroundColor: defaults.backgroundColor,
            borderRadius: shapeType === 'circle' ? 50 : 4,
            rotation: 0,
            ...(shapeType === 'line' && { lineThickness: 4 }),
        };

        setPages((prev) =>
            prev.map((page) => (page.id === targetPageId ? { ...page, items: [...page.items, newItem] } : page))
        );
        setSelectedItemId(newItem.id);
    };

    const handleSaveClick = () => {
        // Open title modal to get the title
        setIsTitleModalOpen(true);
    };

    const handleSaveWithTitle = async (title: string) => {
        setIsTitleModalOpen(false);
        setIsGenerating(true);
        setSelectedItemId(null);

        // Update programBook with title
        setProgramBook((prev) => ({ ...prev, title }));

        try {
            // 이미지는 드롭 시점에 이미 Base64로 캐싱되어 있음
            // 캐싱되지 않은 이미지가 있을 경우에만 변환 시도
            const pagesWithImages = pages.map((page) => ({
                ...page,
                items: page.items.map((item) => {
                    // 이미 Base64인 경우 그대로 사용
                    if (item.content.startsWith('data:')) {
                        return item;
                    }
                    // Base64가 아닌 경우 경고 로그 (대부분은 이미 Base64로 캐싱됨)
                    if (item.type === 'image' || item.type === 'retrieval') {
                        console.warn(`Image ${item.id} is not cached as Base64, using original URL`);
                    }
                    return item;
                }),
            }));

            // Wait for React to re-render
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Wait for all images in the canvas to be fully loaded
            const waitForImagesToLoad = async () => {
                const allCanvases = Object.values(canvasRefs.current).filter(Boolean) as HTMLDivElement[];
                const imagePromises: Promise<void>[] = [];

                allCanvases.forEach((canvas) => {
                    const images = canvas.querySelectorAll('img');
                    images.forEach((img) => {
                        if (!img.complete) {
                            imagePromises.push(
                                new Promise((resolve) => {
                                    img.onload = () => resolve();
                                    img.onerror = () => resolve(); // Continue even if image fails
                                })
                            );
                        }
                    });
                });

                await Promise.all(imagePromises);
            };

            await waitForImagesToLoad();

            // Additional wait to ensure DOM is fully updated
            await new Promise((resolve) => setTimeout(resolve, 200));

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210;

            for (let i = 0; i < pagesWithImages.length; i++) {
                const page = pagesWithImages[i];
                const canvasEl = canvasRefs.current[page.id];

                if (!canvasEl) continue;

                if (i > 0) pdf.addPage();

                const canvas = await html2canvas(canvasEl, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                });

                const imgData = canvas.toDataURL('image/png');
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            // Generate filename
            const timestamp = new Date().getTime();
            const filename = `${title}_${timestamp}.pdf`;

            // Get PDF as blob for upload
            const pdfBlob = pdf.output('blob');
            const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });

            // Upload to server
            const uploadSuccess = await createProgramBook({
                title,
                pdfFile,
            });

            if (uploadSuccess) {
                // Also download locally
                pdf.save(filename);
                // Reset atoms after successful upload
                resetProgramBookAtoms();
                alert('PDF가 저장되었습니다!');
                navigate('/myprogrambooks/list');
            } else {
                // Still download locally even if upload fails
                pdf.save(filename);
                alert('서버 저장에 실패했지만 로컬에 다운로드되었습니다.');
            }
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('PDF 생성에 실패했습니다.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCanvasClick = () => {
        setSelectedItemId(null);
    };

    return (
        <Wrapper onClick={handleCanvasClick}>
            <TopBar />
            <Content>
                <LeftPanel onClick={(e) => e.stopPropagation()}>
                    <LeftPanelHeader>
                        <ShapesToolbar onAddShape={handleAddShape} />
                        {programBook.movies.length > 1 && (
                            <MovieTabList>
                                {programBook.movies.map((m, i) => (
                                    <MovieTab
                                        key={m.movieId}
                                        isActive={i === currentMovieIndex}
                                        onClick={() => setCurrentMovieIndex(i)}
                                    >
                                        {m.movie?.title || getMovieTitle(m.movieId)}
                                    </MovieTab>
                                ))}
                            </MovieTabList>
                        )}
                    </LeftPanelHeader>
                    <LeftPanelContent>
                        {programBook.movies.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                <p>선택된 영화가 없습니다.</p>
                                <Button onClick={() => navigate('/newprogrambook/select')}>영화 선택하러 가기</Button>
                            </div>
                        ) : (
                            <AnalysisResultsPanel />
                        )}
                    </LeftPanelContent>
                </LeftPanel>

                <CanvasArea onClick={(e) => e.stopPropagation()}>
                    {pages.map((page, index) => (
                        <div key={page.id} style={{ position: 'relative' }}>
                            <PageLabel>
                                Page {index + 1}
                                {pages.length > 1 && (
                                    <button
                                        onClick={() => handleDeletePage(page.id)}
                                        style={{
                                            marginLeft: '10px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'red',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </PageLabel>
                            <A4Canvas
                                ref={(el) => {
                                    canvasRefs.current[page.id] = el;
                                }}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, page.id)}
                                onClick={handleCanvasClick}
                            >
                                {page.items.map((item) => (
                                    <CanvasItem
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedItemId === item.id}
                                        onSelect={setSelectedItemId}
                                        onUpdate={handleUpdateItem}
                                        onDelete={handleDeleteItem}
                                    />
                                ))}
                                {page.items.length === 0 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: '#ccc',
                                            textAlign: 'center',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <h3>Page {index + 1}</h3>
                                        <p>Drag items here</p>
                                    </div>
                                )}
                            </A4Canvas>
                        </div>
                    ))}
                    <Button onClick={handleAddPage} style={{ marginBottom: '40px' }}>
                        + Add Page
                    </Button>
                </CanvasArea>

                <div onClick={(e) => e.stopPropagation()}>
                    <PropertiesPanel
                        selectedItem={selectedItem}
                        onUpdate={handleUpdateItem}
                        onBringToFront={handleBringToFront}
                        onSendToBack={handleSendToBack}
                        onBringForward={handleBringForward}
                        onSendBackward={handleSendBackward}
                    />
                </div>
            </Content>
            <Controls onClick={(e) => e.stopPropagation()}>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={handleSaveClick} disabled={isGenerating || isUploading}>
                    {isGenerating ? 'Generating...' : isUploading ? 'Uploading...' : 'Save & Download PDF'}
                </Button>
            </Controls>

            <ProgramBookTitleModal
                isOpen={isTitleModalOpen}
                onClose={() => setIsTitleModalOpen(false)}
                onSave={handleSaveWithTitle}
                initialTitle={programBook.title}
            />
        </Wrapper>
    );
};
