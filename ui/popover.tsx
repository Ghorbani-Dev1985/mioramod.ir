'use client';

import * as React from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/core/utils/shadcn.utils';

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

function Popover({
  ...props
}: React.ComponentProps<
  typeof PopoverPrimitive.Root
>) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Trigger                                   */
/* -------------------------------------------------------------------------- */

function PopoverTrigger({
  ...props
}: React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Anchor                                   */
/* -------------------------------------------------------------------------- */

function PopoverAnchor({
  ...props
}: React.ComponentProps<
  typeof PopoverPrimitive.Anchor
>) {
  return (
    <PopoverPrimitive.Anchor
      data-slot="popover-anchor"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Content
  > {
  showArrow?: boolean;
}

function PopoverContent({
  className,

  align = 'center',

  sideOffset = 8,

  showArrow = false,

  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        data-slot="popover-content"
        className={cn(
          [
            'z-50 w-72 rounded-xl border border-neutral-100 bg-white p-4 shadow-lg outline-none',

            // animation
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',

            'data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0',

            'data-[state=closed]:zoom-out-95',
            'data-[state=open]:zoom-in-95',

            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',

          ],

          className
        )}
        {...props}
      >
        {props.children}

        {/* Arrow */}

        {showArrow && (
          <PopoverPrimitive.Arrow
            className="fill-white dark:fill-neutral-950"
            width={14}
            height={8}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
};