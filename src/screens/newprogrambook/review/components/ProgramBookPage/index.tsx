import React from 'react';
import {
    PageWrapper,
    PageContent,
    MovieSection,
    MovieTitle,
    MovieImage,
    AnalysisContent,
    AnalysisItem,
    AnalysisLabel,
    AnalysisText,
} from './index.styled';

interface ProgramBookPageProps {
    movieData: any;
    pageNumber: number;
    displayTitle: string;
}

const ProgramBookPage: React.FC<ProgramBookPageProps> = ({ movieData, pageNumber, displayTitle }) => {
    return (
        <PageWrapper className="pdf-page">
            <PageContent>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '2px solid #4CAF50',
                        paddingBottom: '10px',
                        marginBottom: '30px',
                    }}
                >
                    <div style={{ color: '#4CAF50', fontSize: '18px', fontWeight: 'bold' }}>{displayTitle}</div>
                    <div style={{ color: '#4CAF50', fontSize: '18px', fontWeight: 'bold' }}>{pageNumber}</div>
                </div>

                <MovieSection>
                    <MovieImage src={movieData.movie.image} alt={movieData.movie.title} />
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                background: '#4CAF50',
                                color: 'white',
                                padding: '40px 20px',
                                borderRadius: '8px',
                                marginBottom: '20px',
                            }}
                        >
                            <MovieTitle>{movieData.info.title}</MovieTitle>
                            <div style={{ fontSize: '18px', opacity: 0.9 }}>{movieData.info.englishTitle}</div>
                        </div>
                        <AnalysisContent>
                            <AnalysisItem>
                                <AnalysisLabel>상영일시</AnalysisLabel>
                                <AnalysisText>{movieData.info.showTime}</AnalysisText>
                            </AnalysisItem>
                            <AnalysisItem>
                                <AnalysisLabel>작품정보</AnalysisLabel>
                                <AnalysisText dangerouslySetInnerHTML={{ __html: movieData.info.movieInfo }} />
                            </AnalysisItem>
                            <AnalysisItem>
                                <AnalysisLabel>STAFF</AnalysisLabel>
                                <AnalysisText dangerouslySetInnerHTML={{ __html: movieData.info.staff }} />
                            </AnalysisItem>
                        </AnalysisContent>
                    </div>
                </MovieSection>

                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        marginTop: '30px',
                        alignItems: 'flex-start',
                    }}
                >
                    <div
                        style={{
                            width: '120px',
                            height: '160px',
                            background: '#f0f0f0',
                            borderRadius: '8px',
                            backgroundImage: `url(${movieData.movie.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
                            {movieData.info.director}
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                            {movieData.info.directorInfo}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {pageNumber}
                </div>
            </PageContent>
        </PageWrapper>
    );
};

export default ProgramBookPage;
