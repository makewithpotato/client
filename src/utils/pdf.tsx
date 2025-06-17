import React from 'react';
import { saveAs } from 'file-saver';
import { pdf, Font } from '@react-pdf/renderer';
import type { ProgramBookData } from '@/types/programBook';
import { ProgramBookDocument } from '@/screens/newprogrambook/layout/components/ProgramBookDocument';

// Register Cairo font from Google Fonts
Font.register({
    family: 'Cairo',
    src: 'https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1PiKg.ttf',
});

// TODO: 추후 서버 측 구현으로 변경 필요
// - PDF 파일을 서버에 저장하고 URL을 반환하는 API 구현
// - 클라우드 스토리지(예: AWS S3) 연동
// - 파일 접근 권한 및 보안 설정
// - 임시 파일 자동 정리 로직 구현

export const generateAndSavePDF = async (data: ProgramBookData): Promise<string> => {
    try {
        // Generate PDF blob
        const doc = <ProgramBookDocument data={data} />;
        const blob = await pdf(doc).toBlob();

        // Generate unique filename
        const timestamp = new Date().getTime();
        const filename = `program_book_${timestamp}.pdf`;
        const filepath = `testpdf/${filename}`;

        // Save to local filesystem
        // Note: In a real production environment, this should be handled by the server
        saveAs(blob, filepath);

        return filepath;
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw error;
    }
};
