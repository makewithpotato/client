import { useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { TopBar } from '@/components';
import { programBookDataAtom, selectedMoviesAtom } from '@/atoms';
import {
    Wrapper,
    Section,
    Header,
    Title,
    Description,
    ViewerContainer,
    PageViewer,
    PagesContainer,
    NavigationContainer,
    NavButton,
    PageIndicator,
    DownloadContainer,
    DownloadButton,
} from './index.styled';
import ProgramBookPage from './components/ProgramBookPage';
import jsPDF from 'jspdf';

// Mock 데이터 생성 (3페이지 분량)
const mockMovieData = [
    {
        movieId: '1',
        layoutId: 0,
        draggedItems: [],
        movie: {
            id: '1',
            title: 'The Enchanted Forest',
            image: '/movie-posters/enchanted-forest.jpg',
        },
        info: {
            title: '그 여름날의 거짓말',
            englishTitle: "That Summer's Lie",
            showTime: '6. 7.(금) 17:30 부천시청영화관 멀티관 ②, 대한실',
            movieInfo: '손현록 Sohn Hyun-lok | 한국 | 2023 | 138분<br/>극영화 | Color | 15세이상관람가',
            staff: '각본 및 감독 손현록 | 프로듀서 남혁민<br/>촬영 이도현 | 조명 이상호 | 미술 노주영<br/>동시녹음 김정석, 조창언, 정창현 | 조작연 신승훈',
            director: '감독. 손현록',
            directorInfo:
                '한국예술종합학교 영상원 영화과를 졸업 후에다. (아기돼지) 등 다수의 단편영화를 연출했다. 〈그 여름날의 거짓말〉은 한국예술종합학교 졸업 작품이며 감독의 첫 번째 장편 연출작이다.',
        },
    },
    {
        movieId: '2',
        layoutId: 1,
        draggedItems: [],
        movie: {
            id: '2',
            title: 'The Lost City',
            image: '/movie-posters/lost-city.jpg',
        },
        info: {
            title: '잃어버린 도시',
            englishTitle: 'The Lost City',
            showTime: '6. 8.(토) 19:00 부천시청영화관 멀티관 ①, 대한실',
            movieInfo: '김민수 Kim Min-soo | 한국 | 2023 | 142분<br/>극영화 | Color | 12세이상관람가',
            staff: '각본 및 감독 김민수 | 프로듀서 이정현<br/>촬영 박상우 | 조명 최영호 | 미술 김태영<br/>동시녹음 정민석, 오창수, 김현진 | 조작연 박승현',
            director: '감독. 김민수',
            directorInfo:
                '서울예술대학교 영상과를 졸업하고 다양한 단편 작품을 연출했다. 〈잃어버린 도시〉는 현대 도시인들의 소외감과 연대감을 그린 작품으로 감독의 두 번째 장편 연출작이다.',
        },
    },
    {
        movieId: '3',
        layoutId: 2,
        draggedItems: [],
        movie: {
            id: '3',
            title: 'The Crimson Tide',
            image: '/movie-posters/crimson-tide.jpg',
        },
        info: {
            title: '붉은 물결',
            englishTitle: 'The Crimson Tide',
            showTime: '6. 9.(일) 15:00 부천시청영화관 멀티관 ③, 대한실',
            movieInfo: '이수진 Lee Su-jin | 한국 | 2023 | 125분<br/>극영화 | Color | 15세이상관람가',
            staff: '각본 및 감독 이수진 | 프로듀서 강민호<br/>촬영 유재성 | 조명 홍성민 | 미술 서현주<br/>동시녹음 김윤성, 박준호, 이민재 | 조작연 최정우',
            director: '감독. 이수진',
            directorInfo:
                '중앙대학교 첨단영상대학원을 졸업한 후 여러 독립영화를 연출했다. 〈붉은 물결〉은 역사적 사건을 현대적 시각으로 재해석한 작품으로 큰 주목을 받았다.',
        },
    },
];

export const ReviewScreen = () => {
    const [programBookData] = useAtom(programBookDataAtom);
    const [selectedMovies] = useAtom(selectedMoviesAtom);
    const pdfRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);

    // 실제 데이터가 있으면 사용하고, 없으면 mock 데이터 사용
    const displayData =
        programBookData.movies.length > 0
            ? programBookData.movies.map((movieData, index) => ({
                  ...movieData,
                  movie:
                      selectedMovies.find((movie) => movie.id === movieData.movieId) ||
                      mockMovieData[index % mockMovieData.length].movie,
                  info: mockMovieData[index % mockMovieData.length].info,
              }))
            : mockMovieData;

    const displayTitle = programBookData.title || '프로그램북 예시';

    // 2페이지씩 묶어서 표시
    const pagesPerView = 2;
    const totalPages = displayData.length;
    const totalViews = Math.ceil(totalPages / pagesPerView);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalViews - 1, prev + 1));
    };

    const handleDownloadPDF = async () => {
        if (!pdfRef.current) return;
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });
        await doc.html(pdfRef.current, {
            async callback(doc: any) {
                doc.save('program-book.pdf');
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            html2canvas: { scale: 2 },
        });
    };

    const currentStartIndex = currentPage * pagesPerView;
    const currentPages = displayData.slice(currentStartIndex, currentStartIndex + pagesPerView);

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Header>
                    <Title>Review your program book</Title>
                    <Description>Review your program book and download it in PDF format.</Description>
                </Header>

                <div ref={pdfRef}>
                    <ViewerContainer>
                        <PageViewer>
                            <PagesContainer
                                data-pages-container
                                style={{
                                    transform: `translateX(-${currentPage * 100}%)`,
                                    width: `${totalViews * 100}%`,
                                    display: 'flex',
                                }}
                            >
                                {Array.from({ length: totalViews }, (_, viewIndex) => {
                                    const startIdx = viewIndex * pagesPerView;
                                    const pagesInView = displayData.slice(startIdx, startIdx + pagesPerView);
                                    return (
                                        <div
                                            key={viewIndex}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                gap: '16px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {pagesInView.map((movieData, pageIndex) => (
                                                <ProgramBookPage
                                                    key={movieData.movieId || startIdx + pageIndex}
                                                    movieData={movieData}
                                                    pageNumber={startIdx + pageIndex + 1}
                                                    displayTitle={displayTitle}
                                                />
                                            ))}
                                        </div>
                                    );
                                })}
                            </PagesContainer>
                        </PageViewer>

                        <NavigationContainer className="no-print">
                            <NavButton onClick={handlePrevious} disabled={currentPage === 0}>
                                ←
                            </NavButton>

                            <PageIndicator>
                                {currentPage + 1} / {totalViews}
                            </PageIndicator>

                            <NavButton onClick={handleNext} disabled={currentPage === totalViews - 1}>
                                →
                            </NavButton>
                        </NavigationContainer>
                    </ViewerContainer>
                </div>

                <DownloadContainer className="no-print">
                    <DownloadButton onClick={handleDownloadPDF}>PDF 다운로드</DownloadButton>
                </DownloadContainer>
            </Section>
        </Wrapper>
    );
};
