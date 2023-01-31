import { useCallback } from 'react';

import type { ReactElement, UIEventHandler } from 'react';
import type { ITransaction } from '@/features/transactions/types';

import {
  TransactionListHeader,
  TransactionListItem
} from '@/features/transactions/components/list';
import { INFINITE_SCROLL_THRESHOLD } from '@/features/transactions/constants';

import classes from './TransactionList.module.scss';

interface IProps {
  transactions: ITransaction[] | null;
  fetchNextPage: () => void;
  removeTransaction: (id: ITransaction['id']) => void;
}

const TransactionList = ({
  transactions,
  fetchNextPage,
  removeTransaction
}: IProps): ReactElement => {
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

  if (!transactions?.length) return <div className={classes.empty}>No existing transactions</div>;

  return (
    <div className={classes.list}>
      <TransactionListHeader />
      <div className={classes.items} onScroll={handleListScroll}>
        {transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            removeTransaction={removeTransaction}
          />
        ))}
      </div>
    </div>
  );
};

export { TransactionList };
