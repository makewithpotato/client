import axios from 'axios';
import { privateServerInstance } from '@/services/api/axios';

/**
 * ArrayBuffer를 Base64 문자열로 변환 (브라우저 호환)
 */
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

/**
 * URL이 외부 URL인지 확인 (S3, CDN 등)
 */
const isExternalUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        // S3, CloudFront 등 외부 URL 패턴 확인
        return (
            urlObj.hostname.includes('amazonaws.com') ||
            urlObj.hostname.includes('cloudfront.net') ||
            urlObj.hostname.includes('s3.') ||
            !urlObj.hostname.includes(window.location.hostname)
        );
    } catch {
        return false;
    }
};

/**
 * 이미지를 canvas를 통해 Base64로 변환 (CORS 우회)
 */
const convertImageViaCanvas = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0);
                const base64 = canvas.toDataURL('image/png');
                resolve(base64);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageUrl;
    });
};

/**
 * 이미지 URL을 Base64로 변환하는 함수 (CORS 우회용)
 * @param imageUrl 이미지 URL
 * @returns Base64 인코딩된 이미지 데이터
 */
export const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
    try {
        // 이미 Base64인 경우 그대로 반환
        if (imageUrl.startsWith('data:')) {
            return imageUrl;
        }

        const isExternal = isExternalUrl(imageUrl);

        // 외부 URL(S3 등)의 경우: canvas 방법이 가장 안정적
        // S3 CORS가 AllowedOrigins에 localhost:3000을 허용하므로 crossOrigin='anonymous'로 작동
        if (isExternal) {
            // 방법 1: canvas를 통해 변환 (S3 CORS 설정과 호환)
            try {
                return await convertImageViaCanvas(imageUrl);
            } catch {
                // canvas 실패 시 다음 방법 시도
            }

            // 방법 2: fetch로 직접 가져오기
            try {
                const response = await fetch(imageUrl, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit',
                    cache: 'no-cache', // 캐시 문제 방지
                });

                if (response.ok) {
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                }
            } catch {
                // fetch 실패 시 다음 방법 시도
            }

            // 방법 3: 일반 axios로 가져오기 (인증 헤더 없이)
            try {
                const axiosResponse = await axios.get(imageUrl, {
                    responseType: 'arraybuffer',
                    withCredentials: false,
                });
                const base64 = arrayBufferToBase64(axiosResponse.data);
                const contentType = axiosResponse.headers['content-type'] || 'image/jpeg';
                return `data:${contentType};base64,${base64}`;
            } catch {
                // axios 실패
            }
        } else {
            // 내부 URL의 경우: privateServerInstance 사용
            try {
                const response = await fetch(imageUrl, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit',
                });

                if (response.ok) {
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                }
            } catch {
                // fetch 실패 시 다음 방법 시도
            }

            try {
                const axiosResponse = await privateServerInstance.get(imageUrl, {
                    responseType: 'arraybuffer',
                    withCredentials: false,
                });
                const base64 = arrayBufferToBase64(axiosResponse.data);
                const contentType = axiosResponse.headers['content-type'] || 'image/jpeg';
                return `data:${contentType};base64,${base64}`;
            } catch {
                // axios 실패
            }

            try {
                return await convertImageViaCanvas(imageUrl);
            } catch {
                // canvas 방법도 실패
            }
        }

        // 모든 방법 실패 시 원본 URL 반환
        console.warn('All image conversion methods failed, returning original URL:', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Failed to convert image to base64:', error);
        return imageUrl;
    }
};
