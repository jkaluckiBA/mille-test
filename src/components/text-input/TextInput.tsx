import { useRef } from 'react';

import type { ChangeEventHandler, ReactElement } from 'react';

import classes from './TextInput.module.scss';

interface IProps {
  id: string;
  label: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  placeholder?: string;
}

export const TextInput = ({
  id,
  label,
  type = 'text',
  onChange,
  value,
  placeholder
}: IProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.textInput} onClick={() => inputRef.current?.focus()}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
