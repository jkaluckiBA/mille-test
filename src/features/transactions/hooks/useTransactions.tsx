import { useQuery } from 'react-query';

import type { ITransaction } from '@/features/transactions/types';

import { getTransactions } from '@/features/transactions/api';
import { LIST_QUERY_KEY, LIST_STALE_TIME } from '@/features/transactions/constants';

interface IReturn {
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  data: ITransaction[] | undefined;
}

export const useTransactions = (): IReturn => {
  const query = useQuery({
    queryKey: [LIST_QUERY_KEY],
    queryFn: getTransactions,
    staleTime: LIST_STALE_TIME
  });

  return {
    status: {
      isLoading: query.isLoading,
      isError: query.isError,
      isSuccess: query.isSuccess
    },
    data: query.data
  };
};
