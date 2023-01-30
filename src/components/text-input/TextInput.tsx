import { useRef } from 'react';

import type { ChangeEventHandler, HTMLInputTypeAttribute, ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

import { joinClasses } from '@/helpers/utils';

import classes from './TextInput.module.scss';

interface IProps<T extends string> {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn<T>;
}

export function TextInput<T extends string = string>({
  id,
  label,
  onChange,
  value,
  placeholder,
  type = 'text',
  className = '',
  register
}: IProps<T>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={joinClasses(classes.textInput, className)}
      onClick={() => inputRef.current?.focus()}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
}
