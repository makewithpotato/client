import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import { useProgramBookDetail } from '@/hooks/useProgramBookDetail';
import {
    Wrapper,
    Content,
    Header,
    Title,
    ButtonGroup,
    BackButton,
    DownloadButton,
    PDFViewer,
    LoadingMessage,
    ErrorMessage,
} from './index.styled';

export const ProgramBookDetailScreen = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { programBookDetail, isLoading, error, fetchProgramBookDetail, clearProgramBookDetail } =
        useProgramBookDetail();

    useEffect(() => {
        if (id) {
            fetchProgramBookDetail(Number(id));
        }

        return () => {
            clearProgramBookDetail();
        };
    }, [id, fetchProgramBookDetail, clearProgramBookDetail]);

    const [isDownloading, setIsDownloading] = useState(false);

    const handleBack = () => {
        navigate('/myprogrambooks');
    };

    const handleDownload = useCallback(async () => {
        if (!programBookDetail) return;

        setIsDownloading(true);
        try {
            const response = await fetch(programBookDetail.pdfUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${programBookDetail.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setIsDownloading(false);
        }
    }, [programBookDetail]);

    if (isLoading) {
        return (
            <Wrapper>
                <TopBar />
                <Content>
                    <Header>
                        <Title>Loading...</Title>
                        <BackButton onClick={handleBack}>Back</BackButton>
                    </Header>
                    <LoadingMessage>Loading program book...</LoadingMessage>
                </Content>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <TopBar />
                <Content>
                    <Header>
                        <Title>Error</Title>
                        <BackButton onClick={handleBack}>Back</BackButton>
                    </Header>
                    <ErrorMessage>{error}</ErrorMessage>
                </Content>
            </Wrapper>
        );
    }

    if (!programBookDetail) {
        return (
            <Wrapper>
                <TopBar />
                <Content>
                    <Header>
                        <Title>Not Found</Title>
                        <BackButton onClick={handleBack}>Back</BackButton>
                    </Header>
                    <ErrorMessage>Program book not found</ErrorMessage>
                </Content>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <Header>
                    <Title>{programBookDetail.title}</Title>
                    <ButtonGroup>
                        <DownloadButton onClick={handleDownload} disabled={isDownloading}>
                            {isDownloading ? 'Downloading...' : 'Download'}
                        </DownloadButton>
                        <BackButton onClick={handleBack}>Back</BackButton>
                    </ButtonGroup>
                </Header>
                <PDFViewer src={programBookDetail.pdfUrl} title={programBookDetail.title} />
            </Content>
        </Wrapper>
    );
};
