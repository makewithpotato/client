import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJoke, fetchJokeById } from '../api/joke';
import type { Joke } from '../../types';

// Query Keys 상수 정의
export const JOKE_QUERY_KEYS = {
  all: ['jokes'] as const,
  random: () => [...JOKE_QUERY_KEYS.all, 'random'] as const,
  byId: (id: number) => [...JOKE_QUERY_KEYS.all, 'byId', id] as const,
} as const;

/**
 * 랜덤 농담을 가져오는 쿼리 훅
 */
export const useJokeQuery = () =>
  useQuery<Joke>({
    queryKey: JOKE_QUERY_KEYS.random(),
    queryFn: fetchJoke,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: 3,
  });

/**
 * 특정 ID의 농담을 가져오는 쿼리 훅 (확장 예시)
 */
export const useJokeByIdQuery = (id: number) =>
  useQuery<Joke>({
    queryKey: JOKE_QUERY_KEYS.byId(id),
    queryFn: () => fetchJokeById(id),
    enabled: !!id, // id가 있을 때만 실행
  });

/**
 * 새로운 농담을 가져오는 뮤테이션 훅 (새로고침용)
 */
export const useRefreshJokeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: fetchJoke,
    onSuccess: (data) => {
      // 캐시를 새 데이터로 업데이트
      queryClient.setQueryData(JOKE_QUERY_KEYS.random(), data);
    },
  });
}; 