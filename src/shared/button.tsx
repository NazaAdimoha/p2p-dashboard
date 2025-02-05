import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Loader from './loader';

const buttonVariants = cva(
  'inline-flex disabled:bg-brand-gray items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-primary',
        ghost: 'border border-brand-gray bg-white text-text-gray',
        primary: 'bg-brand-primary text-white text-base',
        tertiary: 'bg-brand-lightBlue text-text-primary text-base',
        secondary: 'bg-brand-secondary text-white',
        dangerOutline: 'border border-brand-danger bg-white text-text-red',
        success: 'bg-green-500 text-white text-base',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-11 rounded-lg border px-[18px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface IconProps {
  Icon: React.ReactNode;
  iconPlacement: 'left' | 'right';
  loading?: boolean;
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
  loading?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon,
      loading,
      iconPlacement,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={props.onClick}
        {...props}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {Icon && iconPlacement === 'left' && (
              <div className="translate-x-[0%] pr-2 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
                {Icon}
              </div>
            )}
            <Slottable>{props.children}</Slottable>
            {Icon && iconPlacement === 'right' && (
              <div className="translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                {Icon}
              </div>
            )}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
