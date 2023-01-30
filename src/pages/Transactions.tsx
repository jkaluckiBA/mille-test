import type { ReactElement } from 'react';
import { useMemo } from 'react';
import Decimal from 'decimal.js';

import {
  Balance,
  TransactionForm,
  TransactionList,
  TransactionsFilter
} from '@/features/transactions';
import { useDebouncedValue, useTransactions } from '@/features/transactions/hooks';

import classes from './Transactions.module.scss';

const Transactions = (): ReactElement => {
  const [beneficiaryFilter, setBeneficiaryFilter] = useDebouncedValue('');

  const { data, status, paginatedData, fetchNextPage } = useTransactions({
    beneficiaryFilter
  });

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
          <TransactionsFilter onFilterChange={{ beneficiary: setBeneficiaryFilter }} />
        </div>
        <TransactionForm />
      </div>
      <TransactionList transactions={paginatedData} fetchNextPage={fetchNextPage} />
    </main>
  );
};

export default Transactions;
