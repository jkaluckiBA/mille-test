import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import type { ITransaction } from '@/features/transactions/types';

import { getTransactions } from '@/features/transactions/api';
import { LIST_QUERY_KEY, LIST_STALE_TIME, PAGE_SIZE } from '@/features/transactions/constants';

interface IProps {
  beneficiaryFilter?: string;
}

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

export const useTransactions = ({ beneficiaryFilter }: IProps = {}): IReturn => {
  const [page, setPage] = useState<number>(1);
  const query = useQuery({
    queryKey: [LIST_QUERY_KEY],
    queryFn: getTransactions,
    staleTime: LIST_STALE_TIME
  });

  const filteredData = useMemo<IReturn['data']>(() => {
    if (!query.data) return null;
    if (!beneficiaryFilter) return query.data;
    return query.data.filter(({ beneficiary }) => {
      const beneficiaryNames = beneficiary.split(' ');
      return beneficiaryNames.some((name) =>
        name.toLowerCase().startsWith(beneficiaryFilter.toLowerCase())
      );
    });
  }, [beneficiaryFilter, query.data]);

  const hasNextPage = useMemo<boolean>(() => {
    if (!filteredData) return false;
    return Math.ceil(filteredData.length / PAGE_SIZE) > page;
  }, [filteredData, page]);

  const paginatedData = useMemo<IReturn['paginatedData']>(() => {
    if (!filteredData) return null;
    return filteredData.slice(0, page * PAGE_SIZE);
  }, [page, filteredData]);

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
    data: filteredData,
    paginatedData,
    fetchNextPage
  };
};
