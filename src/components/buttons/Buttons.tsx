import type { HTMLProps, ReactElement } from 'react';

import classes from './Buttons.module.scss';
import { joinClasses } from '@/helpers/utils';

interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export const Button = (props: IButtonProps): ReactElement => {
  return (
    <button {...props} className={joinClasses(classes.btn, props.className || '')}>
      {props.children}
    </button>
  );
};

export const PrimaryButton = (props: IButtonProps): ReactElement => {
  return (
    <button
      {...props}
      className={joinClasses(classes.btn, classes.btnSubmit, props.className || '')}>
      {props.children}
    </button>
  );
};
