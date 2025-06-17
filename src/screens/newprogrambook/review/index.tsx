import { useAtom } from 'jotai';
import { pdfFilePathAtom } from '@/atoms/programBook';
import { TopBar } from '@/components';
import { Wrapper, Section, Title, Description, Container, DownloadButton } from './styles';

export const ReviewScreen = () => {
    const [pdfFilePath] = useAtom(pdfFilePathAtom);

    const handleDownload = async () => {
        if (!pdfFilePath) {
            console.error('PDF file path not found');
            return;
        }

        try {
            // Get the file name from the path
            const fileName = pdfFilePath.split('/').pop() || 'program_book.pdf';

            // Open the PDF file in a new tab
            window.open(`/${pdfFilePath}`, '_blank');
        } catch (error) {
            console.error('Failed to download PDF:', error);
        }
    };

    if (!pdfFilePath) {
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
                        src={`/${pdfFilePath}`}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        title="Program Book PDF"
                    />
                </Container>

                <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
            </Section>
        </Wrapper>
    );
};
