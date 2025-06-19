import React from 'react';
import styled from 'styled-components';
import type { MovieLayoutData } from '@/types/index';

const PreviewContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    background: #f5f5f5;
    min-height: 100vh;
`;

const PageContainer = styled.div`
    width: 210mm;
    height: 297mm;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20mm;
    display: flex;
    flex-direction: column;
`;

const MainImageSection = styled.div`
    width: 100%;
    height: 120mm;
    margin-bottom: 10mm;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TitleSection = styled.div`
    margin-bottom: 10mm;
    h1 {
        font-size: 24pt;
        font-weight: bold;
        margin: 0;
    }
`;

const DirectorSection = styled.div`
    h2 {
        font-size: 14pt;
        font-weight: bold;
        margin: 0 0 5mm 0;
    }
    p {
        font-size: 12pt;
        margin: 0;
    }
`;

const ContentSection = styled.div`
    margin-bottom: 10mm;
    h2 {
        font-size: 14pt;
        font-weight: bold;
        margin: 0 0 5mm 0;
    }
    p {
        font-size: 11pt;
        line-height: 1.6;
        margin: 0;
    }
`;

const SecondImageSection = styled.div`
    width: 100%;
    height: 80mm;
    margin-top: auto;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

interface MoviePagePreviewProps {
    movie: MovieLayoutData;
}

export const MoviePagePreview: React.FC<MoviePagePreviewProps> = ({ movie }) => {
    const mainImage = movie.draggedItems?.find((item) => item.zone === 'mainImage');
    const secondImage = movie.draggedItems?.find((item) => item.zone === 'secondImage');
    const director = movie.draggedItems?.find((item) => item.zone === 'director');
    const synopsis = movie.draggedItems?.find((item) => item.zone === 'synopsis');
    const review = movie.draggedItems?.find((item) => item.zone === 'review');

    return (
        <PreviewContainer>
            {/* First Page */}
            <PageContainer>
                <MainImageSection>{mainImage && <img src={mainImage.content} alt="Main Movie" />}</MainImageSection>
                <TitleSection>
                    <h1>{movie.movie.title}</h1>
                </TitleSection>
                <DirectorSection>
                    {director && (
                        <>
                            <h2>감독</h2>
                            <p>{director.content}</p>
                        </>
                    )}
                </DirectorSection>
            </PageContainer>

            {/* Second Page */}
            <PageContainer>
                {synopsis && (
                    <ContentSection>
                        <h2>줄거리</h2>
                        <p>{synopsis.content}</p>
                    </ContentSection>
                )}
                {review && (
                    <ContentSection>
                        <h2>영화에 대하여</h2>
                        <p>{review.content}</p>
                    </ContentSection>
                )}
                {secondImage && (
                    <SecondImageSection>
                        <img src={secondImage.content} alt="Additional Movie Scene" />
                    </SecondImageSection>
                )}
            </PageContainer>
        </PreviewContainer>
    );
};
