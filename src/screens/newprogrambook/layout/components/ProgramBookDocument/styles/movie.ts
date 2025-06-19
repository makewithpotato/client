import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
    family: 'Pretendard',
    fonts: [
        { src: '/fonts/Pretendard-Regular.ttf' },
        { src: '/fonts/Pretendard-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Pretendard-SemiBold.ttf', fontWeight: 600 },
    ],
});

export const movieStyles = StyleSheet.create({
    page: {
        padding: '40px',
        backgroundColor: 'white',
    },
    container: {
        width: '100%',
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'white',
        fontFamily: 'Pretendard',
    },
    mainImageSection: {
        height: '40%',
        flex: 1,
        display: 'flex',
        marginBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    bottomSection: {
        width: '100%',
        height: '240px',
        display: 'flex',
        flexDirection: 'row',
        gap: 40,
    },
    titleSection: {
        width: '35%',
        height: '100%',
        backgroundColor: '#00B15C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px 30px',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    titleEng: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Pretendard',
        opacity: 0.8,
    },
    directorSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    directorTitle: {
        fontSize: 18,
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333333',
    },
    directorContent: {
        fontSize: 12,
        fontFamily: 'Pretendard',
        lineHeight: 1.6,
        color: '#666666',
    },
    secondarySection: {
        flex: 1,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    sectionContent: {
        fontSize: 16,
        lineHeight: 1.6,
        color: '#666666',
    },
    // 두 번째 페이지 스타일
    secondPageContainer: {
        height: '95%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        position: 'relative',
    },
    contentWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
    },
    contentSection: {
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        color: '#00B15C',
    },
    contentBox: {
        height: '100%',
        backgroundColor: '#F8F8F8',
        padding: '20px 24px',
        borderRadius: 4,
    },
    contentText: {
        fontSize: 11,
        fontFamily: 'Pretendard',
        lineHeight: 1.8,
        color: '#333333',
        textAlign: 'justify',
    },
    secondImageSection: {
        width: '100%',
        height: '30%',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    },
    pageNumber: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 10,
        fontFamily: 'Pretendard',
        color: '#666666',
    },
});
