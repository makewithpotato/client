import { StyleSheet } from '@react-pdf/renderer';

export const coverStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Pretendard',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        right: 40,
        fontSize: 12,
        color: '#666666',
    },
});
