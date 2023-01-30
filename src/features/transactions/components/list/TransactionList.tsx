import { useCallback } from 'react';

import type { ReactElement, UIEventHandler } from 'react';
import type { ITransaction } from '@/features/transactions/types';

import {
  TransactionListHeader,
  TransactionListItem
} from '@/features/transactions/components/list';

import classes from './TransactionList.module.scss';
import { INFINITE_SCROLL_THRESHOLD } from '@/features/transactions/constants';

interface IProps {
  transactions: ITransaction[] | null;
  fetchNextPage: () => void;
}

const TransactionList = ({ transactions, fetchNextPage }: IProps): ReactElement => {
  const handleListScroll = useCallback<UIEventHandler<HTMLDivElement>>(
    (e) => {
      const listContainer = e.target as HTMLDivElement;
      const {
        clientHeight: visibleListHeight,
        scrollHeight: completeListHeight,
        scrollTop: scrolledHeight
      } = listContainer;
      if (visibleListHeight + scrolledHeight >= completeListHeight - INFINITE_SCROLL_THRESHOLD)
        fetchNextPage();
    },
    [fetchNextPage]
  );

  if (!transactions?.length) return <div className={classes.list}>No existing transactions</div>;

  return (
    <>
      <TransactionListHeader />
      <div className={classes.list} onScroll={handleListScroll}>
        {transactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  );
};

export { TransactionList };
