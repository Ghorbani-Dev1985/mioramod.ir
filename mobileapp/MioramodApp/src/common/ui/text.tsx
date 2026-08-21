import { cn } from '@/utils/cn';
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
           /* ---------- Display ---------- */
        'display-xl': 'miora-display-xl',
        'display-lg': 'miora-display-lg',
        'display-md': 'miora-display-md',

        /* ---------- Headline ---------- */
        'headline-lg': 'miora-headline-lg',
        'headline-md': 'miora-headline-md',
        'headline-sm': 'miora-headline-sm',
        'headline-xs': 'miora-headline-xs',

        /* ---------- Label ---------- */
        'label-lg': 'miora-label-lg',
        'label-md': 'miora-label-md',
        'label-sm': 'miora-label-sm',
        'label-xs': 'miora-label-xs',
        'label-2xs': 'miora-label-2xs',

        /* ---------- Body ---------- */
        'body-lg': 'miora-body-lg',
        'body-md': 'miora-body-md',
        'body-sm': 'miora-body-sm',
        'body-xs': 'miora-body-xs',
        'body-2xs': 'miora-body-2xs',

        /* ---------- Caption ---------- */
        'caption-xs': 'miora-caption-xs',
        'caption-2xs': 'miora-caption-2xs',
      },
      
      typography: {
     
      },
    },
    defaultVariants: {
      variant: 'body-md',
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
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
        textVariants({ typography }),
        textClass, 
        className
      )}
      aria-level={typography}
      {...props}
    />
  );
}

export { Text, TextClassContext };