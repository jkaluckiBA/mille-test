import type { ReactElement } from 'react';
import { useState } from 'react';

import {
  Balance,
  TransactionForm,
  TransactionList,
  TransactionsFilter
} from '@/features/transactions';
import { useDebouncedValue, useTransactions } from '@/features/transactions/hooks';
import { PrimaryButton } from '@/components';
import { useNotifications } from '@/hooks/useNotifications';

import classes from './Transactions.module.scss';

const Transactions = (): ReactElement => {
  const [isFormDisplayed, setIsFormDisplayed] = useState<boolean>(false);
  const { addNotification } = useNotifications();
  const [beneficiaryFilter, setBeneficiaryFilter] = useDebouncedValue('');

  const { balance, status, paginatedData, fetchNextPage, addTransaction, removeTransaction } =
    useTransactions({
      beneficiaryFilter
    });

  if (status.isLoading) return <main className={classes.transactionsRoot}>Loading</main>;
  if (status.isError) return <main className={classes.transactionsRoot}>Error</main>;

  return (
    <main className={classes.transactionsRoot}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Balance balance={balance} isLoading={status.isLoading} />
          <TransactionsFilter onFilterChange={{ beneficiary: setBeneficiaryFilter }} />
        </div>
        {isFormDisplayed ? (
          <TransactionForm
            onFormSubmit={addTransaction}
            closeForm={() => setIsFormDisplayed(false)}
          />
        ) : (
          <div className={classes.openForm}>
            <PrimaryButton onClick={() => setIsFormDisplayed(true)}>Add Transaction</PrimaryButton>
          </div>
        )}
      </div>
      <TransactionList
        transactions={paginatedData}
        fetchNextPage={fetchNextPage}
        removeTransaction={(id) => {
          try {
            removeTransaction(id);
            addNotification('Successfully removed transaction', 'success');
          } catch (e) {
            addNotification('Cannot remove transaction', 'error');
          }
        }}
      />
    </main>
  );
};

export default Transactions;
