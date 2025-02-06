import * as React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import type { FieldErrors } from 'react-hook-form';
import _ from 'lodash';

import { cn } from '@/lib/utils';

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    errors?: FieldErrors;
    name?: string;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errors, name, label, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col w-full gap-1 ')}>
        {label && <label className="text-sm text-left">{label}</label>}
        <textarea
          rows={3}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          name={name}
          {...props}
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
Textarea.displayName = 'Textarea';

export { Textarea };
