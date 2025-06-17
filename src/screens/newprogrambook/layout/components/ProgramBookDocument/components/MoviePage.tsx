import React from 'react';
import { Page, Text, View, Image } from '@react-pdf/renderer';
import { movieStyles } from '../styles/movie';
import { layoutStyles } from '../styles/layouts';
import type { MovieLayoutData } from '@/types';

interface MoviePageProps {
    movieData: MovieLayoutData;
    pageNumber: number;
    totalPages: number;
}

export const MoviePage: React.FC<MoviePageProps> = ({ movieData, pageNumber, totalPages }) => {
    const renderAnalysisItems = (items: any[]) =>
        items.map((item, index) => (
            <View key={index} style={movieStyles.analysisItem}>
                <Text style={movieStyles.analysisTitle}>{item.title}</Text>
                <Text style={movieStyles.analysisContent}>{item.content}</Text>
            </View>
        ));

    const renderLayout = () => {
        switch (movieData.layout) {
            case 'poster':
                return (
                    <View style={layoutStyles.posterLayout}>
                        <View style={layoutStyles.leftColumn}>
                            <Image src={movieData.movie.posterPath} style={layoutStyles.largeMovieImage} />
                            <Text style={movieStyles.movieTitle}>{movieData.movie.title}</Text>
                        </View>
                        <View style={layoutStyles.rightColumn}>{renderAnalysisItems(movieData.draggedItems)}</View>
                    </View>
                );

            case 'text':
                return (
                    <View style={layoutStyles.textLayout}>
                        <View style={layoutStyles.header}>
                            <Text style={movieStyles.movieTitle}>{movieData.movie.title}</Text>
                            {renderAnalysisItems(movieData.draggedItems.filter((item) => item.zone === 'header'))}
                        </View>
                        <View style={layoutStyles.content}>
                            <Image src={movieData.movie.posterPath} style={layoutStyles.smallMovieImage} />
                            {renderAnalysisItems(movieData.draggedItems.filter((item) => item.zone === 'content'))}
                        </View>
                    </View>
                );

            case 'grid':
                return (
                    <View style={layoutStyles.gridLayout}>
                        <View style={layoutStyles.gridItem}>
                            <Image src={movieData.movie.posterPath} style={layoutStyles.gridMovieImage} />
                            <Text style={movieStyles.movieTitle}>{movieData.movie.title}</Text>
                        </View>
                        {movieData.draggedItems.map((item, index) => (
                            <View key={index} style={layoutStyles.gridItem}>
                                {renderAnalysisItems([item])}
                            </View>
                        ))}
                    </View>
                );

            default:
                return (
                    <View style={movieStyles.basicLayout}>
                        <View style={movieStyles.movieHeader}>
                            <Image src={movieData.movie.posterPath} style={movieStyles.movieImage} />
                            <View style={movieStyles.movieInfo}>
                                <Text style={movieStyles.movieTitle}>{movieData.movie.title}</Text>
                            </View>
                        </View>
                        {renderAnalysisItems(movieData.draggedItems)}
                    </View>
                );
        }
    };

    return (
        <Page size="A4" style={movieStyles.page}>
            {renderLayout()}
            <Text style={movieStyles.pageNumber}>
                {pageNumber} / {totalPages}
            </Text>
        </Page>
    );
};
