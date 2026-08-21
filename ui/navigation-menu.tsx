"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { cn } from "@/core/utils/shadcn.utils";

const NavigationMenu = NavigationMenuPrimitive.Root;

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(["group", "flex-center", "flex-1", "gap-x-2"], className)}
    {...props}
  />
));

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cn([
  "group",

  "flex-center",

  "gap-x-1",

  "rounded-lg",

  "px-2",

  "py-1",

  "text-base",

  "font-medium",

  "transition-all",

  "duration-300",

  "cursor-pointer",

  "hover:bg-primary-50",

  "hover:text-primary-600",

  "focus:bg-primary-50",

  "focus:text-primary-600",

  "data-[state=open]:bg-primary-50",

  "data-[state=open]:text-primary-600",
]);

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle, className)}
    {...props}>
    {children}

    <ChevronDownIcon
      className="
          size-4
          transition-transform
          duration-300
          group-data-[state=open]:rotate-180
          "
    />
  </NavigationMenuPrimitive.Trigger>
));

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      [
        "absolute",
        "z-50",

        "top-10",

        "w-max",

        "min-w-56",

        "overflow-hidden",

        "rounded-2xl",

        "border",

        "border-neutral-100",

        "bg-white",

        "p-3",

        "shadow-main",

        "text-right",

        "data-[motion=from-start]:animate-in",

        "data-[motion=from-end]:animate-in",

        "data-[motion=to-start]:animate-out",

        "data-[motion=to-end]:animate-out",

        "data-[motion=from-start]:fade-in-0",

        "data-[motion=from-end]:fade-in-0",

        "data-[motion=to-start]:fade-out-0",

        "data-[motion=to-end]:fade-out-0",

        "data-[motion=from-start]:zoom-in-95",

        "data-[motion=from-end]:zoom-in-95",

        "data-[motion=to-start]:zoom-out-95",

        "data-[motion=to-end]:zoom-out-95",

        "duration-300",
      ],
      className,
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className="
        absolute
        top-full
        right-0
        flex
        justify-start
        pt-2
        ">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        [
          "relative",

          "origin-top-right",

          "overflow-hidden",

          "rounded-2xl",

          "bg-white",

          "shadow-main",

          "border",

          "border-neutral-300",

          "data-[state=open]:animate-in",

          "data-[state=closed]:animate-out",

          "data-[state=open]:zoom-in-95",

          "data-[state=closed]:zoom-out-95",

          "duration-300",
        ],
        className,
      )}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      [
        "top-full",

        "z-10",

        "flex",

        "h-2",

        "items-end",

        "justify-center",

        "overflow-hidden",

        "data-[state=visible]:animate-in",

        "data-[state=hidden]:animate-out",
      ],
      className,
    )}
    {...props}>
    <div
      className="
          relative
          top-[60%]
          h-3
          w-3
          rotate-45
          rounded-tl-sm
          border
          border-neutral-300
          bg-white
          "
    />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
};
