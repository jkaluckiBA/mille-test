import type { ReactElement } from 'react';
import type { ITransaction } from '@/features/transactions/types';

import {
  TransactionListHeader,
  TransactionListItem
} from '@/features/transactions/components/list';

import classes from './TransactionList.module.scss';

interface IProps {
  transactions: ITransaction[] | undefined;
}

const TransactionList = ({ transactions }: IProps): ReactElement => {
  if (!transactions?.length) return <div className={classes.list}>No existing transactions</div>;

  return (
    <>
      <TransactionListHeader />
      <div className={classes.list}>
        {transactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  );
};

export { TransactionList };
