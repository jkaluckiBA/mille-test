import type { ReactElement } from 'react';

import {
  Balance,
  TransactionForm,
  TransactionList,
  TransactionsFilter
} from '@/features/transactions';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

import classes from './Transactions.module.scss';
import { useMemo } from 'react';
import Decimal from 'decimal.js';

const Transactions = (): ReactElement => {
  const { data, status } = useTransactions();

  const totalBalance = useMemo<number>(
    () =>
      Number(
        data
          ?.reduce<Decimal>((acc, transaction) => acc.plus(transaction.amount), new Decimal(0))
          .toFixed(2)
      ) ?? 0,
    [data]
  );

  if (status.isLoading) return <main className={classes.transactionsRoot}>Loading</main>;
  if (status.isError) return <main className={classes.transactionsRoot}>Error</main>;

  return (
    <main className={classes.transactionsRoot}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Balance balance={totalBalance} isLoading={status.isLoading} />
          <TransactionsFilter />
        </div>
        <TransactionForm />
      </div>
      <TransactionList transactions={data} />
    </main>
  );
};

export default Transactions;
