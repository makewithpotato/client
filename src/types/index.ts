// 공통 API 응답 타입
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 에러 타입
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Joke API 타입
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
} 