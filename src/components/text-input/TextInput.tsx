import { useRef } from 'react';

import type { ChangeEventHandler, HTMLInputTypeAttribute, ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import type { FieldError } from 'react-hook-form';

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
  required?: boolean;
  error?: FieldError;
  touched?: boolean;
}

export function TextInput<T extends string = string>({
  id,
  label,
  onChange,
  value,
  placeholder,
  type = 'text',
  className = '',
  register,
  required,
  error,
  touched
}: IProps<T>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={joinClasses(
        classes.textInput,
        required ? classes.required : '',
        error && touched ? classes.error : '',
        className
      )}
      onClick={() => inputRef.current?.focus()}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        className={classes.input}
        {...register}
      />
      <span className={classes.inputError}>
        {touched && error && error.type !== 'typeError' ? error.message : ''}
      </span>
    </div>
  );
}
