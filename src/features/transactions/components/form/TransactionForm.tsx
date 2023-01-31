import { useForm } from 'react-hook-form';

import type { ReactElement } from 'react';
import type { ITransactionForm } from '@/features/transactions/types';

import { Button, PrimaryButton, TextInput } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import transactionSchema from '@/features/transactions/validators/transactionSchema';
import { useNotifications } from '@/hooks/useNotifications';

import classes from './TransactionForm.module.scss';

interface IProps {
  onFormSubmit: (values: ITransactionForm) => void;
  closeForm: () => void;
}

const TransactionForm = ({ onFormSubmit, closeForm }: IProps): ReactElement => {
  const { addNotification } = useNotifications();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields }
  } = useForm<ITransactionForm>({
    resolver: yupResolver(transactionSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit'
  });
  return (
    <div className={classes.formRoot}>
      <span className={classes.title}>New Transaction</span>
      <form
        className={classes.form}
        onSubmit={handleSubmit((values) => {
          try {
            onFormSubmit(values);
            reset();
            addNotification('Successfully sent a transaction', 'success');
          } catch (e) {
            addNotification('Cannot sent a transaction', 'error');
          }
        })}>
        <TextInput
          id="amount"
          label="Amount"
          register={register('amount')}
          type="number"
          required
          error={errors.amount}
          touched={touchedFields.amount}
        />
        <TextInput
          id="accountNumber"
          label="Account Number"
          register={register('accountNumber')}
          type="number"
          required
          error={errors.accountNumber}
          touched={touchedFields.accountNumber}
        />
        <TextInput
          id="beneficiary"
          label="Beneficiary"
          register={register('beneficiary')}
          required
          error={errors.beneficiary}
          touched={touchedFields.beneficiary}
        />
        <TextInput
          id="address"
          label="Address"
          register={register('address')}
          required
          error={errors.address}
          touched={touchedFields.address}
        />
        <TextInput
          id="description"
          label="Description"
          register={register('description')}
          required
          error={errors.description}
          touched={touchedFields.description}
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
