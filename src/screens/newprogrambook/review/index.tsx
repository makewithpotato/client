import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pdfFilePathAtom } from '@/atoms/programBook';
import { TopBar } from '@/components';
import { Wrapper, Section, Title, Description, Container, DownloadButton } from './index.styled';
import { saveAs } from 'file-saver';

interface LocationState {
    pdfBlob?: Blob;
}

export const ReviewScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pdfFilePath, setPdfFilePath] = useAtom(pdfFilePathAtom);
    const [error, setError] = useState<string | null>(null);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

    // Get PDF blob from location state
    useEffect(() => {
        const state = location.state as LocationState;
        if (state?.pdfBlob) {
            setPdfBlob(state.pdfBlob);
            // Create URL for preview if needed
            if (!pdfFilePath) {
                const url = URL.createObjectURL(state.pdfBlob);
                setPdfFilePath(url);
            }
        }
    }, [location.state, pdfFilePath, setPdfFilePath]);

    // Cleanup the blob URL when component unmounts
    useEffect(() => {
        return () => {
            if (pdfFilePath && pdfFilePath.startsWith('blob:')) {
                URL.revokeObjectURL(pdfFilePath);
            }
        };
    }, [pdfFilePath]);

    const handleDownload = async () => {
        setError(null);

        try {
            if (!pdfBlob) {
                throw new Error('PDF data not found');
            }

            // Verify blob size if stored
            const storedSize = sessionStorage.getItem('pdfBlobSize');
            if (storedSize && pdfBlob.size.toString() !== storedSize) {
                throw new Error('PDF data is corrupted');
            }

            // Get the stored filename
            const filename = sessionStorage.getItem('pdfFilename') || 'program_book.pdf';

            console.log('PDF blob prepared for download, size:', pdfBlob.size);

            // Download the file
            saveAs(pdfBlob, filename);
        } catch (error) {
            console.error('Failed to download PDF:', error);
            setError('PDF 다운로드에 실패했습니다. 프로그램북 생성 화면으로 돌아가서 다시 시도해주세요.');
            // Navigate back to layout screen after 3 seconds
            setTimeout(() => {
                navigate('/newprogrambook/layout');
            }, 3000);
        }
    };

    if (!pdfFilePath && !pdfBlob) {
        return (
            <Wrapper>
                <TopBar />
                <Section>
                    <Title>PDF Not Found</Title>
                    <Description>The program book PDF has not been generated yet.</Description>
                </Section>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Section>
                <Title>Review your program book</Title>
                <Description>Review your program book and download it in PDF format.</Description>

                <Container>
                    <iframe
                        src={pdfFilePath || ''}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        title="Program Book PDF"
                    />
                </Container>

                {error && <Description style={{ color: 'red', marginTop: '10px' }}>{error}</Description>}

                <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
            </Section>
        </Wrapper>
    );
};
