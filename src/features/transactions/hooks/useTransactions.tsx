import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import type { ITransaction, ITransactionForm } from '@/features/transactions/types';

import { getTransactions } from '@/features/transactions/api';
import { LIST_QUERY_KEY, LIST_STALE_TIME, PAGE_SIZE } from '@/features/transactions/constants';
import {
  calculateTransactionsBalance,
  generateTransactionId,
  sortTransactionsByDate
} from '@/features/transactions/helpers';

interface IProps {
  beneficiaryFilter?: string;
}

interface IReturn {
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  balance: number;
  paginatedData: ITransaction[];
  fetchNextPage: () => void;
  addTransaction: (transaction: ITransactionForm) => void;
}

export const useTransactions = ({ beneficiaryFilter }: IProps = {}): IReturn => {
  const [page, setPage] = useState<number>(1);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const query = useQuery({
    queryKey: [LIST_QUERY_KEY],
    queryFn: getTransactions,
    staleTime: LIST_STALE_TIME
  });

  useEffect(() => {
    setTransactions((query.data ?? []).sort(sortTransactionsByDate));
  }, [query.data]);

  const filteredData = useMemo<ITransaction[]>(() => {
    if (!beneficiaryFilter) return transactions;
    return [...transactions].sort(sortTransactionsByDate).filter(({ beneficiary }) => {
      const beneficiaryNames = beneficiary.split(' ');
      return beneficiaryNames.some((name) =>
        name.toLowerCase().startsWith(beneficiaryFilter.toLowerCase())
      );
    });
  }, [beneficiaryFilter, transactions]);

  const addTransaction = useCallback<IReturn['addTransaction']>((transaction) => {
    setTransactions((prevState) => {
      const newState = [...prevState];
      newState.push({
        account: `PL${transaction.accountNumber}`,
        address: transaction.address,
        amount: 0 - transaction.amount,
        beneficiary: transaction.beneficiary,
        description: transaction.description,
        date: new Date().toISOString(),
        id: generateTransactionId(prevState)
      });
      newState.sort(sortTransactionsByDate);
      return newState;
    });
    setPage(1);
  }, []);

  const balance = useMemo<IReturn['balance']>(
    () => calculateTransactionsBalance(filteredData),
    [filteredData]
  );

  const hasNextPage = useMemo<boolean>(() => {
    if (!filteredData) return false;
    return Math.ceil(filteredData.length / PAGE_SIZE) > page;
  }, [filteredData, page]);

  const paginatedData = useMemo<IReturn['paginatedData']>(
    () => filteredData.slice(0, page * PAGE_SIZE),
    [page, filteredData]
  );

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
    balance,
    paginatedData,
    fetchNextPage,
    addTransaction
  };
};
