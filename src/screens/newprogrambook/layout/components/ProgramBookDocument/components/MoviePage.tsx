import React, { useEffect, useState } from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import type { MovieLayoutData } from '@/types/index';
import { movieStyles } from '../styles/movie';
import { convertImageToBase64 } from '@/utils/image';

interface MoviePageProps {
    movie: MovieLayoutData;
    pageNumber: number;
    totalPages: number;
}

export const MoviePage: React.FC<MoviePageProps> = ({ movie, pageNumber }) => {
    const [mainImageSrc, setMainImageSrc] = useState<string>('');
    const [secondImageSrc, setSecondImageSrc] = useState<string>('');

    const mainImage = movie.draggedItems?.find((item) => item.zone === 'Main Image');
    const secondImage = movie.draggedItems?.find((item) => item.zone === 'Sub Image');
    const firstSection = movie.draggedItems?.find((item) => item.zone === 'First Section');
    const secondSection = movie.draggedItems?.find((item) => item.zone === 'Second Section');
    const thirdSection = movie.draggedItems?.find((item) => item.zone === 'Third Section');

    useEffect(() => {
        const loadImages = async () => {
            if (mainImage?.content) {
                const base64Main = await convertImageToBase64(mainImage.content);
                setMainImageSrc(base64Main);
            }
            if (secondImage?.content) {
                const base64Second = await convertImageToBase64(secondImage.content);
                setSecondImageSrc(base64Second);
            }
        };

        loadImages();
    }, [mainImage?.content, secondImage?.content]);

    const renderFirstPage = () => (
        <Page size="A4" style={movieStyles.page}>
            <View style={movieStyles.container}>
                <View style={movieStyles.mainImageSection}>
                    {mainImageSrc && <Image src={mainImageSrc} style={movieStyles.mainImage} />}
                </View>

                <View style={movieStyles.bottomSection}>
                    <View style={movieStyles.titleSection}>
                        <Text style={movieStyles.title}>{movie.movie?.title || 'Untitled'}</Text>
                        <Text style={movieStyles.titleEng}>{movie.movie?.originalTitle || ''}</Text>
                    </View>

                    <View style={movieStyles.directorSection}>
                        {firstSection && (
                            <>
                                <Text style={movieStyles.directorTitle}>{firstSection.title}</Text>
                                <Text style={movieStyles.directorContent}>{firstSection.content}</Text>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Page>
    );

    const renderSecondPage = () => (
        <Page size="A4" style={movieStyles.page}>
            <View style={movieStyles.secondPageContainer}>
                <View style={movieStyles.contentWrapper}>
                    {secondSection && (
                        <View style={movieStyles.contentSection}>
                            <Text style={movieStyles.sectionLabel}>{secondSection.title}</Text>
                            <View style={movieStyles.contentBox}>
                                <Text style={movieStyles.contentText}>{secondSection.content}</Text>
                            </View>
                        </View>
                    )}
                    {thirdSection && (
                        <View style={movieStyles.contentSection}>
                            <Text style={movieStyles.sectionLabel}>{thirdSection.title}</Text>
                            <View style={movieStyles.contentBox}>
                                <Text style={movieStyles.contentText}>{thirdSection.content}</Text>
                            </View>
                        </View>
                    )}
                </View>

                {secondImageSrc && (
                    <View style={movieStyles.secondImageSection}>
                        <Image src={secondImageSrc} style={movieStyles.secondImage} />
                    </View>
                )}

                <Text style={movieStyles.pageNumber}>{pageNumber}</Text>
            </View>
        </Page>
    );

    return (
        <>
            {renderFirstPage()}
            {renderSecondPage()}
        </>
    );
};
