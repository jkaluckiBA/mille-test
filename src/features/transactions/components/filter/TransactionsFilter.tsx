import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { TextInput } from '@/components';

import classes from './TransactionFilter.module.scss';
import { ITransaction } from '@/features/transactions/types';

interface IProps {
  onFilterChange?: {
    [key in keyof ITransaction]?: (value: ITransaction[key]) => void;
  };
}

const TransactionsFilter = ({ onFilterChange = {} }: IProps): ReactElement => {
  const [beneficiaryFilter, setBeneficiaryFilter] = useState<string>('');

  useEffect(() => {
    onFilterChange?.beneficiary?.(beneficiaryFilter);
  }, [beneficiaryFilter, onFilterChange]);

  return (
    <div className={classes.filter}>
      <TextInput
        id="beneficiary"
        type="string"
        label="Beneficiary"
        onChange={(event) => {
          setBeneficiaryFilter(event.target.value);
        }}
        value={beneficiaryFilter}
        placeholder="Filter transactions by beneficiary name"
      />
    </div>
  );
};

export { TransactionsFilter };
