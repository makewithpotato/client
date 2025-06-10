import axios from 'axios';
import type { Joke } from '../../types';
import { API_ENDPOINTS } from '../../constants';

/**
 * 랜덤 농담을 가져오는 API 함수
 */
export const fetchJoke = async (): Promise<Joke> => {
  try {
    const response = await axios.get(API_ENDPOINTS.JOKE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch joke:', error);
    throw new Error('농담을 가져오는데 실패했습니다.');
  }
};

/**
 * 특정 ID의 농담을 가져오는 API 함수 (확장 예시)
 */
export const fetchJokeById = async (id: number): Promise<Joke> => {
  try {
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch joke by id:', error);
    throw new Error('농담을 가져오는데 실패했습니다.');
  }
}; 