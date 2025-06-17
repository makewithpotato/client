import { StyleSheet } from '@react-pdf/renderer';

export const movieStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Cairo',
    },
    basicLayout: {
        flex: 1,
        gap: 20,
    },
    movieHeader: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    movieImage: {
        width: 120,
        height: 180,
        objectFit: 'cover',
    },
    movieInfo: {
        flex: 1,
        fontSize: 14,
        marginBottom: 20,
    },
    movieTitle: {
        fontSize: 18,
        fontFamily: 'Cairo',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    analysisItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    analysisTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    analysisContent: {
        fontSize: 12,
        lineHeight: 1.5,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        right: 40,
        fontSize: 12,
        color: '#666666',
    },
});
