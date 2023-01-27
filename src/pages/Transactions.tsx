import type { ReactElement } from 'react';

import {
  Balance,
  TransactionForm,
  TransactionList,
  TransactionsFilter
} from '@/features/transactions';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

import classes from './Transactions.module.scss';

const Transactions = (): ReactElement => {
  const { status } = useTransactions();

  if (status.isLoading) return <main className={classes.transactionsRoot}>Loading</main>;
  if (status.isError) return <main className={classes.transactionsRoot}>Error</main>;

  return (
    <main className={classes.transactionsRoot}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Balance />
          <TransactionsFilter />
        </div>
        <TransactionForm />
      </div>
      <TransactionList />
    </main>
  );
};

export default Transactions;
