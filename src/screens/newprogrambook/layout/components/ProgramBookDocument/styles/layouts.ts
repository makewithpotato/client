import { StyleSheet } from '@react-pdf/renderer';

export const layoutStyles = StyleSheet.create({
    twoPageLayout: {
        flex: 1,
        gap: 30,
        padding: 40,
        backgroundColor: '#00B564',
    },
    pageContent: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 8,
        marginBottom: 20,
    },
    imageSection: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    largeImage: {
        width: '80%',
        height: 300,
        objectFit: 'cover',
        borderRadius: 4,
    },
    directorSection: {
        marginBottom: 30,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
    },
    synopsisSection: {
        marginBottom: 30,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
    },
    reviewSection: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    sectionContent: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#666666',
    },
});
