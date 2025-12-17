import React, { useEffect, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { programBookAtom } from '@/atoms/programBook';
import { currentMovieIndexAtom, imageCacheAtom } from '@/atoms';
import { ResultsWrapper, ResultsList, ResultItem, ResultTitle, ResultContent } from './index.styled';
import type { DraggedItemData } from '@/screens/newprogrambook/layout/types';
import { useQuery } from '@tanstack/react-query';
import MOVIE_API from '@/services/movie';
import type { MovieAnalysis } from '@/types/movie';
import type { AnalysisResult } from '@/types/programBook';
import { convertImageToBase64 } from '@/utils/image';

// 실패하거나 로딩 중인 이미지를 추적 (컴포넌트 외부에서 관리하여 재렌더링 방지)
const processingImages = new Set<string>();
const failedImages = new Set<string>();

export const AnalysisResultsPanel = () => {
    const [programBook, setProgramBook] = useAtom(programBookAtom);
    const [currentMovieIndex] = useAtom(currentMovieIndexAtom);
    const [imageCache, setImageCache] = useAtom(imageCacheAtom);

    // useRef로 imageCache를 참조하여 useCallback 의존성에서 제외
    const imageCacheRef = useRef(imageCache);
    imageCacheRef.current = imageCache;

    const currentMovie = programBook.movies[currentMovieIndex];
    const movieId = currentMovie?.movieId;

    /**
     * 이미지를 백그라운드로 Base64로 변환하여 캐시에 저장
     * useRef를 통해 최신 캐시 상태를 참조하므로 의존성 최소화
     */
    const cacheImage = useCallback(
        async (imageId: string, imageUrl: string) => {
            if (!movieId || !imageUrl || imageUrl.startsWith('data:')) return;

            const cacheKey = `${movieId}-${imageId}`;

            // 이미 캐시됨, 로딩 중, 또는 실패한 이미지는 스킵
            if (imageCacheRef.current[movieId]?.[imageId]) return;
            if (processingImages.has(cacheKey)) return;
            if (failedImages.has(cacheKey)) return;

            processingImages.add(cacheKey);

            try {
                const base64 = await convertImageToBase64(imageUrl);
                if (base64 && base64.startsWith('data:')) {
                    setImageCache((prev) => ({
                        ...prev,
                        [movieId]: {
                            ...prev[movieId],
                            [imageId]: base64,
                        },
                    }));
                } else {
                    // 변환 실패 시 실패 목록에 추가 (재시도 방지)
                    failedImages.add(cacheKey);
                }
            } catch (error) {
                console.warn(`Failed to cache image ${imageId}:`, error);
                failedImages.add(cacheKey);
            } finally {
                processingImages.delete(cacheKey);
            }
        },
        [movieId, setImageCache]
    );

    /**
     * 캐시된 이미지 또는 원본 URL 반환
     */
    const getCachedOrOriginal = useCallback(
        (imageId: string, originalUrl: string): string => {
            if (!movieId) return originalUrl;
            return imageCache[movieId]?.[imageId] || originalUrl;
        },
        [movieId, imageCache]
    );

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie-analysis', movieId],
        queryFn: async () => {
            if (!movieId) throw new Error('영화 ID가 없습니다.');
            const response = await MOVIE_API.getMovieAnalysis(movieId);
            return response.data;
        },
        enabled: !!movieId,
    });

    const analysis: MovieAnalysis | undefined = data;

    // Sync analysis data to atom
    useEffect(() => {
        if (analysis && movieId) {
            const analysisResults: AnalysisResult[] = [];

            // Map fields to AnalysisResult
            if (analysis.director) {
                analysisResults.push({
                    id: 'director',
                    type: '연출',
                    content: analysis.director,
                });
            }

            // Map prompt results
            analysis.promptResults.forEach((result, index) => {
                analysisResults.push({
                    id: `prompt-${index}`,
                    type: result.prompt,
                    content: result.result,
                });
            });

            // Map retrieval results
            analysis.retrievalResults?.forEach((result, index) => {
                result.uri.forEach((uri, uriIndex) => {
                    analysisResults.push({
                        id: `retrieval-${index}-${uriIndex}`,
                        type: 'scene-image',
                        content: uri,
                    });
                });
            });

            if (analysis.releaseDate) {
                analysisResults.push({
                    id: 'releaseDate',
                    type: '개봉일',
                    content: analysis.releaseDate || '',
                });
            }
            if (analysis.actor) {
                analysisResults.push({
                    id: 'actor',
                    type: '주연 배우',
                    content: analysis.actor || '',
                });
            }
            if (analysis.genre) {
                analysisResults.push({
                    id: 'genre',
                    type: '장르',
                    content: analysis.genre || '',
                });
            }
            if (analysis.title) {
                analysisResults.push({
                    id: 'title',
                    type: '영상 제목',
                    content: analysis.title || '',
                });
            }

            setProgramBook((prev) => ({
                ...prev,
                movies: prev.movies.map((m) =>
                    m.movieId === movieId
                        ? {
                              ...m,
                              movie: {
                                  id: movieId,
                                  title: analysis.title,
                                  posterPath: '',
                                  releaseDate: analysis.releaseDate || '',
                                  overview: '',
                                  analysisResults,
                              },
                          }
                        : m
                ),
            }));
        }
    }, [analysis, movieId, setProgramBook]);

    // 분석 결과가 로드되면 이미지를 백그라운드로 캐싱
    useEffect(() => {
        if (!analysis || !movieId) return;

        // retrieval 이미지들 캐싱
        analysis.retrievalResults?.forEach((result, index) => {
            result.uri.forEach((uri, uriIndex) => {
                cacheImage(`retrieval-${index}-${uriIndex}`, uri);
            });
        });
    }, [analysis, movieId, cacheImage]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Omit<DraggedItemData, 'zone'>) => {
        // 이미지 타입인 경우 캐시된 Base64 이미지를 사용
        const isImageItem = item.type === 'image' || item.id.includes('Image') || item.id.includes('retrieval');
        const itemWithCachedImage = isImageItem
            ? { ...item, content: getCachedOrOriginal(item.id, item.content) }
            : item;

        e.dataTransfer.setData('text/plain', JSON.stringify(itemWithCachedImage));
        e.dataTransfer.effectAllowed = 'copy';
    };

    if (!currentMovie) {
        return (
            <ResultsWrapper>
                <ResultTitle>Analysis Results</ResultTitle>
                <p>Please select a movie to see its analysis results.</p>
            </ResultsWrapper>
        );
    }

    if (isLoading) {
        return (
            <ResultsWrapper>
                <ResultTitle>Analysis Results</ResultTitle>
                <p>Loading...</p>
            </ResultsWrapper>
        );
    }

    if (isError || !analysis) {
        return (
            <ResultsWrapper>
                <ResultTitle>Analysis Results</ResultTitle>
                <p>분석 정보를 불러오지 못했습니다.</p>
            </ResultsWrapper>
        );
    }

    // Construct display items (prioritizing user provided API structure)
    const items: Omit<DraggedItemData, 'zone'>[] = [];

    // Add prompt results
    analysis.promptResults.forEach((result, index) => {
        items.push({
            id: `prompt-${index}`,
            type: 'analysis',
            title: result.prompt,
            content: result.result,
        });
    });

    // Add retrieval results
    analysis.retrievalResults?.forEach((result, index) => {
        result.uri.forEach((uri, uriIndex) => {
            items.push({
                id: `retrieval-${index}-${uriIndex}`,
                type: 'image',
                title: `${result.scene} - ${uriIndex + 1}`,
                content: uri,
            });
        });
    });

    if (analysis.director) {
        items.push({
            id: 'director',
            type: 'analysis',
            title: '연출',
            content: analysis.director,
        });
    }

    if (analysis.releaseDate) {
        items.push({
            id: 'releaseDate',
            type: 'analysis',
            title: '개봉일',
            content: analysis.releaseDate || '',
        });
    }
    if (analysis.actor) {
        items.push({
            id: 'actor',
            type: 'analysis',
            title: '주연 배우',
            content: analysis.actor || '',
        });
    }
    if (analysis.genre) {
        items.push({
            id: 'genre',
            type: 'analysis',
            title: '장르',
            content: analysis.genre || '',
        });
    }
    if (analysis.title) {
        items.push({
            id: 'title',
            type: 'analysis',
            title: '영상 제목',
            content: analysis.title || '',
        });
    }

    // 이미지 미리보기를 위한 스타일
    const imagePreviewStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'contain' as const,
        borderRadius: '4px',
        marginBottom: '8px',
        backgroundColor: '#f5f5f5',
        pointerEvents: 'none' as const,
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
        pointerEvents: 'none' as const,
    };

    return (
        <ResultsWrapper>
            <ResultTitle>Analysis Results - {analysis.title}</ResultTitle>
            <ResultsList>
                {items.map((item) => (
                    <ResultItem key={item.id} draggable={true} onDragStart={(e) => handleDragStart(e, item)}>
                        <ResultTitle>{item.title}</ResultTitle>
                        {item.type === 'image' || item.id.includes('Image') ? (
                            <>
                                <div style={imageContainerStyle}>
                                    <img src={item.content} alt={item.title} style={imagePreviewStyle} />
                                </div>
                                <ResultContent>이미지를 드래그하여 배치하세요</ResultContent>
                            </>
                        ) : (
                            <ResultContent>{item.content}</ResultContent>
                        )}
                    </ResultItem>
                ))}
            </ResultsList>
        </ResultsWrapper>
    );
};
