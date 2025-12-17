import React from 'react';
import styled from 'styled-components';
import type { MovieLayoutData } from '@/types';

interface MoviePagePreviewProps {
    movie: MovieLayoutData;
    pageNumber: number;
    totalPages: number;
}

export const MoviePagePreview: React.FC<MoviePagePreviewProps> = ({ movie, pageNumber }) => {
    const mainImage = movie.draggedItems?.find((item) => item.zone === 'mainImage');
    const secondImage = movie.draggedItems?.find((item) => item.zone === 'secondImage');
    const director = movie.draggedItems?.find((item) => item.zone === 'director');
    const synopsis = movie.draggedItems?.find((item) => item.zone === 'synopsis');
    const review = movie.draggedItems?.find((item) => item.zone === 'review');

    const renderFirstPage = () => (
        <Page>
            <Container>
                <MainImageSection>
                    {mainImage && <MainImage src={mainImage.content} alt="Main Movie Image" />}
                </MainImageSection>

                <BottomSection>
                    <TitleSection>
                        <Title>{movie.movie?.title || 'Untitled'}</Title>
                        <TitleEng>{movie.movie?.originalTitle || ''}</TitleEng>
                    </TitleSection>

                    <DirectorSection>
                        {director && (
                            <>
                                <DirectorTitle>감독</DirectorTitle>
                                <DirectorContent>{director.content}</DirectorContent>
                            </>
                        )}
                    </DirectorSection>
                </BottomSection>
            </Container>
        </Page>
    );

    const renderSecondPage = () => (
        <Page>
            <SecondPageContainer>
                <ContentWrapper>
                    {synopsis && (
                        <ContentSection>
                            <SectionLabel>줄거리</SectionLabel>
                            <ContentBox>
                                <ContentText>{synopsis.content}</ContentText>
                            </ContentBox>
                        </ContentSection>
                    )}
                    {review && (
                        <ContentSection>
                            <SectionLabel>영화에 대하여</SectionLabel>
                            <ContentBox>
                                <ContentText>{review.content}</ContentText>
                            </ContentBox>
                        </ContentSection>
                    )}
                </ContentWrapper>

                {secondImage && (
                    <SecondImageSection>
                        <SecondImage src={secondImage.content} alt="Secondary Movie Image" />
                    </SecondImageSection>
                )}

                <PageNumber>{pageNumber}</PageNumber>
            </SecondPageContainer>
        </Page>
    );

    return (
        <PreviewWrapper>
            {renderFirstPage()}
            {renderSecondPage()}
        </PreviewWrapper>
    );
};

const PreviewWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
`;

const Page = styled.div`
    width: 595px;
    height: 842px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
`;

const Container = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;
    font-family: 'Pretendard';
`;

const MainImageSection = styled.div`
    height: 40%;
    flex: 1;
    display: flex;
    margin-bottom: 20px;
`;

const MainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const BottomSection = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    flex-direction: row;
    gap: 40px;
`;

const TitleSection = styled.div`
    width: 35%;
    height: 100%;
    background-color: #00b15c;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 30px;
`;

const Title = styled.h1`
    color: white;
    font-size: 24px;
    font-family: 'Pretendard';
    font-weight: bold;
    margin: 0 0 8px 0;
`;

const TitleEng = styled.h2`
    color: white;
    font-size: 14px;
    font-family: 'Pretendard';
    opacity: 0.8;
    margin: 0;
`;

const DirectorSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: 20px;
`;

const DirectorTitle = styled.h3`
    font-size: 18px;
    font-family: 'Pretendard';
    font-weight: bold;
    margin: 0 0 12px 0;
    color: #333333;
`;

const DirectorContent = styled.p`
    font-size: 12px;
    font-family: 'Pretendard';
    line-height: 1.6;
    color: #666666;
    margin: 0;
`;

// 두 번째 페이지 스타일
const SecondPageContainer = styled.div`
    height: 95%;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const ContentSection = styled.div`
    height: 35%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SectionLabel = styled.h3`
    font-size: 16px;
    font-family: 'Pretendard';
    font-weight: bold;
    color: #00b15c;
    margin: 0;
`;

const ContentBox = styled.div`
    height: 100%;
    background-color: #f8f8f8;
    padding: 20px 24px;
    border-radius: 4px;
`;

const ContentText = styled.p`
    font-size: 11px;
    font-family: 'Pretendard';
    line-height: 1.8;
    color: #333333;
    text-align: justify;
    margin: 0;
`;

const SecondImageSection = styled.div`
    width: 100%;
    height: 30%;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SecondImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const PageNumber = styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    font-family: 'Pretendard';
    color: #666666;
`;
