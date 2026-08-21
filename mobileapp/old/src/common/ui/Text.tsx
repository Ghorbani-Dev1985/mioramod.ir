import { cn } from '@/utils/index';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(
  cn(
    'text-foreground text-base',
    Platform.select({
      web: 'select-text',
    })
  ),
  {
    variants: {
      variant: {
        default: '',
        h1: cn('text-center text-4xl font-extrabold tracking-tight', Platform.select({ web: 'scroll-m-20 text-balance' })),
        h2: cn('border-border border-b pb-2 text-3xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20 first:mt-0' })),
        h3: cn('text-2xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        h4: cn('text-xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        p: 'mt-3 leading-7 sm:mt-6',
        blockquote: 'mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6',
        code: cn('bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'),
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-muted-foreground text-sm',
      },
      
      typography: {
        /* ---------- Display ---------- */
        'display-xl': 'font-peyda-extrabold text-[2rem] leading-[2.5rem]',
        'display-lg': 'font-peyda-extrabold text-[1.75rem] leading-[2.25rem]',
        'display-md': 'font-peyda-extrabold text-[1.5rem] leading-[2rem]',

        /* ---------- Headline ---------- */
        'headline-lg': 'font-peyda-bold text-[1.75rem] leading-[2.25rem]',
        'headline-md': 'font-peyda-bold text-[1.5rem] leading-[2rem]',
        'headline-sm': 'font-peyda-bold text-[1.25rem] leading-[1.75rem]',
        'headline-xs': 'font-peyda-bold text-[1rem] leading-[1.5rem]',

        /* ---------- Label ---------- */
        'label-lg': 'font-peyda-medium text-[1.125rem] leading-[2rem]',
        'label-md': 'font-peyda-medium text-[1rem] leading-[1.75rem]',
        'label-sm': 'font-peyda-medium text-[0.875rem] leading-[1.5rem]',
        'label-xs': 'font-peyda-medium text-[0.75rem] leading-[1.25rem]',
        'label-2xs': 'font-peyda-medium text-[0.625rem] leading-[1.125rem]',

        /* ---------- Body ---------- */
        'body-xl': 'font-peyda text-[1.125rem] leading-[2rem]',
        'body-lg': 'font-peyda text-[1rem] leading-[1.75rem]',
        'body-sm': 'font-peyda text-[0.875rem] leading-[1.5rem]',
        'body-xs': 'font-peyda text-[0.75rem] leading-[1.25rem]',
        'body-2xs': 'font-peyda text-[0.625rem] leading-[1.125rem]',

        /* ---------- Caption ---------- */
        'caption-xs': 'font-peyda text-[0.75rem] leading-[1.25rem]',
        'caption-2xs': 'font-peyda text-[0.625rem] leading-[1.125rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;
type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  blockquote: Platform.select({ web: 'blockquote' as Role }),
  code: Platform.select({ web: 'code' as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  variant = 'default',
  typography,
  ...props
}: React.ComponentProps<typeof RNText> &
  React.RefAttributes<typeof RNText> &
  TextVariantProps & {
    asChild?: boolean;
  }) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot : RNText;
  
  return (
    <Component
      className={cn(
        textVariants({ variant, typography }),
        textClass, 
        className
      )}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  );
}

export { Text, TextClassContext };