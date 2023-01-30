import { useForm } from 'react-hook-form';

import type { ReactElement } from 'react';
import type { ITransactionForm } from '@/features/transactions/types';

import { Button, PrimaryButton, TextInput } from '@/components';

import classes from './TransactionForm.module.scss';

interface IProps {
  onFormSubmit: (values: ITransactionForm) => void;
  closeForm: () => void;
}

const TransactionForm = ({ onFormSubmit, closeForm }: IProps): ReactElement => {
  const { handleSubmit, register, reset } = useForm<ITransactionForm>();
  return (
    <div className={classes.formRoot}>
      <span className={classes.title}>New Transaction</span>
      <form
        className={classes.form}
        onSubmit={handleSubmit((values) => {
          onFormSubmit(values);
          reset();
          closeForm();
        })}>
        <TextInput
          id="amount"
          label="Amount"
          className={classes.field}
          register={register('amount')}
          type="number"
        />
        <TextInput
          id="accountNumber"
          label="Account Number"
          className={classes.field}
          register={register('accountNumber')}
          type="number"
        />
        <TextInput
          id="beneficiary"
          label="Beneficiary"
          className={classes.field}
          register={register('beneficiary')}
        />
        <TextInput
          id="address"
          label="Address"
          className={classes.field}
          register={register('address')}
        />
        <TextInput
          id="description"
          label="Description"
          className={classes.field}
          register={register('description')}
        />
        <div className={classes.btnContainer}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              closeForm();
            }}>
            Cancel
          </Button>
          <PrimaryButton type="submit">Send</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export { TransactionForm };
