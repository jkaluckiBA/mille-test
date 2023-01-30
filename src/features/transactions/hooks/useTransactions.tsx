import { useQuery } from 'react-query';

import type { ITransaction } from '@/features/transactions/types';

import { getTransactions } from '@/features/transactions/api';
import { LIST_QUERY_KEY, LIST_STALE_TIME, PAGE_SIZE } from '@/features/transactions/constants';
import { useCallback, useMemo, useState } from 'react';

interface IReturn {
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  data: ITransaction[] | null;
  paginatedData: ITransaction[] | null;
  fetchNextPage: () => void;
}

export const useTransactions = (): IReturn => {
  const [page, setPage] = useState<number>(1);
  const query = useQuery({
    queryKey: [LIST_QUERY_KEY],
    queryFn: getTransactions,
    staleTime: LIST_STALE_TIME
  });

  const hasNextPage = useMemo<boolean>(() => {
    if (!query.data) return false;
    return Math.ceil(query.data.length / PAGE_SIZE) > page;
  }, [page, query.data]);

  const paginatedData = useMemo<IReturn['paginatedData']>(() => {
    if (!query.data) return null;
    return query.data.slice(0, page * PAGE_SIZE);
  }, [page, query.data]);

  const fetchNextPage = useCallback<IReturn['fetchNextPage']>(() => {
    if (hasNextPage)
      setPage((prevState) => {
        return prevState + 1;
      });
  }, [hasNextPage]);

  return {
    status: {
      isLoading: query.isLoading,
      isError: query.isError,
      isSuccess: query.isSuccess
    },
    data: query.data ?? null,
    paginatedData,
    fetchNextPage
  };
};
