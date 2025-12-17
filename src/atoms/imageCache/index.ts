import { atom } from 'jotai';

/**
 * 이미지 캐시를 저장하는 atom
 * 분석 결과 조회 시 이미지를 미리 Base64로 변환해서 저장해두고
 * PDF 생성 시 캐시된 이미지를 사용하여 CORS 문제를 회피
 *
 * 구조: { [movieId]: { [imageId]: base64String } }
 */
export interface ImageCacheMap {
    [movieId: string]: {
        [imageId: string]: string;
    };
}

export const imageCacheAtom = atom<ImageCacheMap>({});

/**
 * 특정 영화의 이미지 캐시를 업데이트하는 헬퍼 함수 타입
 */
export type SetImageCache = (movieId: string, imageId: string, base64: string) => void;

/**
 * 캐시된 이미지 조회 헬퍼 함수 타입
 */
export type GetCachedImage = (movieId: string, imageId: string) => string | undefined;
