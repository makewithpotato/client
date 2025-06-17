import { StyleSheet } from '@react-pdf/renderer';

export const layoutStyles = StyleSheet.create({
    posterLayout: {
        flex: 1,
        flexDirection: 'row',
        gap: 30,
    },
    leftColumn: {
        width: '40%',
    },
    rightColumn: {
        flex: 1,
    },
    largeMovieImage: {
        width: '100%',
        height: 400,
        objectFit: 'cover',
        marginBottom: 20,
    },
    textLayout: {
        flex: 1,
        gap: 30,
    },
    header: {
        marginBottom: 20,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
    },
    smallMovieImage: {
        width: 100,
        height: 150,
        objectFit: 'cover',
    },
    footer: {
        marginTop: 20,
    },
    gridLayout: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    gridItem: {
        width: '45%',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    gridMovieImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        marginBottom: 10,
    },
});
