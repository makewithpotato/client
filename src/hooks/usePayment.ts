import { useState, useEffect, useCallback } from 'react';

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;
const STORAGE_KEY = 'paid_movie_ids';

declare global {
    interface Window {
        TossPayments?: (clientKey: string) => TossPaymentsInstance;
    }
}

interface TossPaymentsInstance {
    payment: (options: { customerKey: string }) => PaymentInstance;
}

interface PaymentInstance {
    requestPayment: (params: PaymentRequestParams) => Promise<void>;
}

interface PaymentRequestParams {
    method: 'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT';
    amount: {
        currency: string;
        value: number;
    };
    orderId: string;
    orderName: string;
    customerEmail?: string;
    customerName?: string;
    customerMobilePhone?: string;
    successUrl?: string;
    failUrl?: string;
    card?: {
        useEscrow?: boolean;
        flowMode?: string;
        useCardPoint?: boolean;
        useAppCardOnly?: boolean;
    };
}

export const usePayment = () => {
    const [paidMovieIds, setPaidMovieIds] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(paidMovieIds));
    }, [paidMovieIds]);

    const isMoviePaid = useCallback(
        (movieId: number) => {
            return paidMovieIds.includes(movieId);
        },
        [paidMovieIds]
    );

    const markAsPaid = useCallback((movieId: number) => {
        setPaidMovieIds((prev) => {
            if (prev.includes(movieId)) return prev;
            return [...prev, movieId];
        });
    }, []);

    const loadTossSdk = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (window.TossPayments) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://js.tosspayments.com/v2/standard';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load TossPayments SDK'));
            document.head.appendChild(script);
        });
    }, []);

    const requestPayment = useCallback(
        async (movie: { movieId: number; title: string }) => {
            try {
                await loadTossSdk();

                if (!window.TossPayments) {
                    throw new Error('TossPayments SDK not loaded');
                }

                const toss = window.TossPayments(TOSS_CLIENT_KEY);
                // Random customer key for this session/demo
                const customerKey = `customer-${Math.random().toString(36).substring(2, 15)}`;
                const payment = toss.payment({ customerKey });

                const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set('payment_success', 'true');
                currentUrl.searchParams.set('paid_movie_id', movie.movieId.toString());

                await payment.requestPayment({
                    method: 'CARD',
                    amount: {
                        currency: 'KRW',
                        value: 9900,
                    },
                    orderId,
                    orderName: `${movie.title} 분석 비용`,
                    customerName: '김토스', // Placeholder
                    successUrl: currentUrl.toString(),
                    failUrl: window.location.href, // Just reload current page on fail
                });
            } catch (error) {
                console.error('Payment failed', error);
                alert('결제 요청 중 오류가 발생했습니다.');
            }
        },
        [loadTossSdk]
    );

    // Check for payment success or failure on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentSuccess = params.get('payment_success');
        const paidMovieId = params.get('paid_movie_id');
        const code = params.get('code');
        const message = params.get('message');

        if (paymentSuccess === 'true' && paidMovieId) {
            const movieId = parseInt(paidMovieId, 10);
            markAsPaid(movieId);

            // Clean up URL
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('payment_success');
            newUrl.searchParams.delete('paid_movie_id');
            newUrl.searchParams.delete('paymentKey');
            newUrl.searchParams.delete('orderId');
            newUrl.searchParams.delete('amount');
            window.history.replaceState({}, '', newUrl.toString());
        } else if (code) {
            // Handle failure or cancellation
            if (code === 'PAY_PROCESS_CANCELED') {
                alert('결제가 취소되었습니다.');
            } else {
                alert(`결제 실패: ${message}`);
            }

            // Clean up URL
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('code');
            newUrl.searchParams.delete('message');
            newUrl.searchParams.delete('orderId');
            window.history.replaceState({}, '', newUrl.toString());
        }
    }, [markAsPaid]);

    return {
        isMoviePaid,
        markAsPaid,
        requestPayment,
    };
};
