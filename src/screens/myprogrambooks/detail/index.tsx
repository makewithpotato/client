import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import { useProgramBookDetail } from '@/hooks/useProgramBookDetail';
import { Wrapper, Content, Header, Title, BackButton, PDFViewer, LoadingMessage, ErrorMessage } from './index.styled';

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

    const handleBack = () => {
        navigate('/myprogrambooks');
    };

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
                    <BackButton onClick={handleBack}>Back</BackButton>
                </Header>
                <PDFViewer src={programBookDetail.pdfUrl} title="Program Book PDF" />
            </Content>
        </Wrapper>
    );
};
