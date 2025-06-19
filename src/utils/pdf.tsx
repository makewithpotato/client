import { pdf, Font } from '@react-pdf/renderer';
import type { ProgramBookData } from '@/types/programBook';
import { ProgramBookDocument } from '@/screens/newprogrambook/layout/components/ProgramBookDocument';

// Register Pretendard fonts
Font.register({
    family: 'Pretendard',
    fonts: [
        { src: '/fonts/Pretendard-Regular.ttf', fontWeight: 400 },
        { src: '/fonts/Pretendard-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Pretendard-Bold.ttf', fontWeight: 700 },
    ],
});

// TODO: 추후 서버 측 구현으로 변경 필요
// - PDF 파일을 서버에 저장하고 URL을 반환하는 API 구현
// - 클라우드 스토리지(예: AWS S3) 연동
// - 파일 접근 권한 및 보안 설정
// - 임시 파일 자동 정리 로직 구현

export const generateAndSavePDF = async (data: ProgramBookData): Promise<{ blob: Blob; filename: string }> => {
    try {
        // Generate PDF blob
        const doc = <ProgramBookDocument data={data} />;
        const blob = await pdf(doc).toBlob();

        // Generate unique filename
        const timestamp = new Date().getTime();
        const filename = `program_book_${timestamp}.pdf`;

        return { blob, filename };
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw error;
    }
};
