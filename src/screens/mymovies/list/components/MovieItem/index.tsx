import React, { useCallback, useState } from 'react';
import {
    MovieRow,
    MovieCell,
    MovieTitle,
    Director,
    Genre,
    ReleaseDate,
    TooltipContainer,
    TooltipTitle,
    TooltipPrice,
    PayButton,
    TooltipDescription,
    PaymentRequiredButton,
    ModalMovieTitle,
} from './index.styled';
import type { Movie } from '@/types/movie';
import { usePayment } from '@/hooks/usePayment';
import { Modal } from '@/components';

export interface MovieItemProps {
    movie: Movie;
    onClick?: () => void;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movie, onClick }) => {
    const [showModal, setShowModal] = useState(false);
    const { isMoviePaid, requestPayment } = usePayment();

    const isPaid = isMoviePaid(movie.movieId);

    const getEffectiveStatus = useCallback(() => {
        if (isPaid) return movie.status;

        if (
            movie.status === 'PENDING' ||
            movie.status === 'ANALYZE' ||
            movie.status === 'COMPLETE' ||
            (typeof movie.status === 'string' && movie.status.startsWith('PROCEEDING'))
        ) {
            return 'PAYMENT_REQUIRED';
        }

        return movie.status;
    }, [isPaid, movie.status]);

    const effectiveStatus = getEffectiveStatus();

    const handleStatusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (effectiveStatus === 'PAYMENT_REQUIRED') {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getStatusContent = (status: string) => {
        switch (status) {
            case 'UPLOADING':
                return 'Uploading...';
            case 'ANALYZE':
                return 'Ready to Analyze';
            case 'COMPLETE':
                return 'Completed';
            case 'PENDING':
                return 'Uploaded';
            case 'PAYMENT_REQUIRED':
                return (
                    <PaymentRequiredButton type="button" onClick={handleStatusClick}>
                        결제 필요
                    </PaymentRequiredButton>
                );
            default:
                if (status.startsWith('PROCEEDING[')) {
                    const progressMatch = status.match(/PROCEEDING\[(\d+)\/(\d+)\]/);
                    if (progressMatch) {
                        const [_, current, total] = progressMatch;
                        const percentage = Math.round((Number(current) / Number(total)) * 100);
                        if (percentage === 100) {
                            return 'Analyzing... 99%';
                        } else {
                            return `Analyzing... ${percentage}%`;
                        }
                    }
                }
                return status;
        }
    };

    const handlePayment = useCallback(
        async (e: React.MouseEvent) => {
            e.stopPropagation();
            await requestPayment(movie);
            setShowModal(false);
        },
        [requestPayment, movie]
    );

    const handleRowClick = () => {
        if (effectiveStatus === 'PAYMENT_REQUIRED') return;
        onClick?.();
    };

    return (
        <MovieRow
            onClick={handleRowClick}
            style={{
                cursor:
                    effectiveStatus === 'COMPLETE'
                        ? 'pointer'
                        : effectiveStatus === 'PAYMENT_REQUIRED'
                          ? 'not-allowed'
                          : 'default',
            }}
        >
            <MovieCell>
                <MovieTitle>{movie.title}</MovieTitle>
            </MovieCell>
            <MovieCell>
                <Director>{movie.director}</Director>
            </MovieCell>
            <MovieCell>
                <Genre>{movie.genre}</Genre>
            </MovieCell>
            <MovieCell>
                <ReleaseDate>{movie.releaseDate || 'N/A'}</ReleaseDate>
            </MovieCell>
            <MovieCell>
                <TooltipContainer>{getStatusContent(effectiveStatus)}</TooltipContainer>
            </MovieCell>
            <Modal isOpen={showModal} onClose={handleCloseModal} width="400px">
                <TooltipTitle>분석 대기중</TooltipTitle>
                <ModalMovieTitle>{movie.title}</ModalMovieTitle>
                <TooltipDescription>업로드 완료된 영화를 분석하기 위해 결제가 필요합니다.</TooltipDescription>
                <TooltipPrice>9,900원</TooltipPrice>
                <PayButton type="button" onClick={handlePayment}>
                    결제하기
                </PayButton>
            </Modal>
        </MovieRow>
    );
};
