import type { HTMLProps, ReactElement } from 'react';

import { joinClasses } from '@/helpers/utils';

import classes from './Buttons.module.scss';

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
