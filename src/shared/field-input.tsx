import { Input, type InputProps } from './input';
import { forwardRef, LegacyRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import type { FieldErrors } from 'react-hook-form';
import { cn } from '@/lib/utils';
import _ from 'lodash';

interface FieldInputProps extends InputProps {
  name?: string;
  label?: string;
  placeholder?: string;

  /**
   * @deprecated Use `errors property` instead
   */
  meta?: {
    touched: boolean;
    error: string;
    warning: string;
  };

  errors?: FieldErrors;
}

const FieldInput = forwardRef(
  (
    { name, label, placeholder, type, errors, ...rest }: FieldInputProps,
    ref,
  ) => {
    return (
      <div className={cn('flex flex-col w-full gap-1 ', rest.className)}>
        {label && <label className="text-sm text-left">{label}</label>}
        <Input
          name={name}
          ref={ref as LegacyRef<HTMLInputElement> | undefined}
          placeholder={placeholder}
          type={type}
          {..._.omit(rest, ['className'])}
          className={cn(
            'w-full h-11 bg-white border-brand-gray block px-4 py-2.5 mt-[6px] border rounded-md focus:outline-none focus:ring-offset-1',
          )}
        />
        {_.keys(errors).length > 0 && (
          <ErrorMessage
            errors={errors}
            name={name as string}
            render={({ message }) => (
              <span className="text-red-500 text-sm">{message}</span>
            )}
          />
        )}
      </div>
    );
  },
);

FieldInput.displayName = 'FieldInput';

export default FieldInput;
