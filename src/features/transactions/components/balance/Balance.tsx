import type { ReactElement } from 'react';

import classes from './Balance.module.scss';

interface IProps {
  balance: number | undefined;
  isLoading: boolean;
}

const Balance = ({ balance }: IProps): ReactElement => {
  return <div className={classes.balance}>Total Balance: {balance}</div>;
};

export { Balance };
