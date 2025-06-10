import {QueryClientProvider as _QueryClientProvider} from '@tanstack/react-query';
import type {ReactNode} from 'react';
import {getQueryClient} from '@/utils/queryClient';

/**
 * 이미 QueryClient는 Context API를 통해 구현되어있기에
 * 따로 Context API를 통해 관리하지 않습니다.다만, getQueryClient 함수를 통해 쿼리 클라이언트를 가져올 수 있습니다.
 * @author 김동현
 */
export function QueryClientProvider({children}: {children: ReactNode}) {
  const queryClient = getQueryClient();

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}