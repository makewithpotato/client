import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import type { MovieLayoutData } from '@/types/index';
import { movieStyles } from '../styles/movie';

interface MoviePageProps {
    movie: MovieLayoutData;
    pageNumber: number;
    totalPages: number;
}

export const MoviePage: React.FC<MoviePageProps> = ({ movie, pageNumber }) => {
    const mainImage = movie.draggedItems?.find((item) => item.zone === 'mainImage');
    const secondImage = movie.draggedItems?.find((item) => item.zone === 'secondImage');
    const director = movie.draggedItems?.find((item) => item.zone === 'director');
    const synopsis = movie.draggedItems?.find((item) => item.zone === 'synopsis');
    const review = movie.draggedItems?.find((item) => item.zone === 'review');

    const renderFirstPage = () => (
        <Page size="A4" style={{ padding: 0, backgroundColor: 'white' }}>
            <View style={movieStyles.container}>
                <View style={movieStyles.mainImageSection}>
                    {mainImage && <Image src={mainImage.content} style={movieStyles.mainImage} />}
                </View>

                <View style={movieStyles.titleSection}>
                    <Text style={movieStyles.title}>{movie.movie.title}</Text>
                </View>

                <View style={movieStyles.directorSection}>
                    {director && (
                        <>
                            <Text style={movieStyles.directorTitle}>감독</Text>
                            <Text style={movieStyles.directorContent}>{director.content}</Text>
                        </>
                    )}
                </View>
            </View>
        </Page>
    );

    const renderSecondPage = () => (
        <Page size="A4" style={{ padding: 0, backgroundColor: 'white' }}>
            <View style={movieStyles.secondPageContainer}>
                <View style={movieStyles.contentWrapper}>
                    {synopsis && (
                        <View style={movieStyles.contentSection}>
                            <Text style={movieStyles.contentTitle}>줄거리</Text>
                            <Text style={movieStyles.contentText}>{synopsis.content}</Text>
                        </View>
                    )}
                    {review && (
                        <View style={movieStyles.contentSection}>
                            <Text style={movieStyles.contentTitle}>영화에 대하여</Text>
                            <Text style={movieStyles.contentText}>{review.content}</Text>
                        </View>
                    )}
                </View>

                {secondImage && (
                    <View style={movieStyles.secondImageSection}>
                        <Image src={secondImage.content} style={movieStyles.secondImage} />
                    </View>
                )}

                <Text style={movieStyles.pageNumber}>{pageNumber + 1}</Text>
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
