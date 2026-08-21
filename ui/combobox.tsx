"use client";

import * as React from "react";
import { Check, Plus, X } from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "./command";
import { cn } from "@/core/utils/shadcn.utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Label } from "./label";

export type ComboboxOptions = {
  value: string;
  label: string;
};

type Mode = "single" | "multiple";

interface ComboboxProps {
  mode?: Mode;
  options: ComboboxOptions[];
  selected: string | string[];
  className?: string;
  label?: string;
  placeholder?: string;
  onChange?: (event: string | string[]) => void;
  onCreate?: (value: string) => void;
  addNewLabel?: string;
  createPlaceholder?: string;
  searchPlaceholder?: string;
  addNewIcon?: React.ReactNode;
  confirmIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
  expandMode?: boolean;
  disabled?: boolean;
}

export function Combobox({
  options,
  selected,
  className,
  label,
  placeholder,
  mode = "single",
  onChange,
  onCreate,
  addNewLabel = "افزودن نقش جدید",
  createPlaceholder = "نام نقش جدید را وارد کنید",
  searchPlaceholder,
  addNewIcon = <Plus className="size-4" />,
  confirmIcon = <CheckIcon className="size-4" />,
  cancelIcon = <X className="size-4" />,
  expandMode = false,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!expandMode) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsCreating(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandMode, open]);

  const handleOpenChange = (newOpen: boolean) => {
    if (disabled) return;
    setOpen(newOpen);
    if (!newOpen) {
      setIsCreating(false);
      setQuery("");
    }
  };

  const handleCreate = () => {
    if (onCreate && query.trim()) {
      onCreate(query.trim());
      setQuery("");
      setIsCreating(false);
      if (mode === "single") setOpen(false);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setQuery("");
  };

  const getDisplayLabel = () => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return placeholder ?? "Select Item...";
    }
    if (mode === "multiple" && Array.isArray(selected)) {
      return selected
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean)
        .join(", ");
    }
    if (mode === "single" && typeof selected === "string") {
      return (
        options.find((opt) => opt.value === selected)?.label ?? placeholder
      );
    }
    return placeholder ?? "Select Item...";
  };

  const renderDropdownContent = () => (
    <Command
      filter={(value, search) => {
        if (value.toLowerCase().includes(search.toLowerCase())) return 1;
        return 0;
      }}
      className="rounded-md border border-neutral-200 shadow-lg">
      <div className="w-full flex-between p-2">
        <CommandInput
          showSearchIcon={!createPlaceholder && true}
          placeholder={
            isCreating
              ? createPlaceholder
              : (searchPlaceholder ?? placeholder ?? "جستجو...")
          }
          value={query}
          onValueChange={(value: string) => setQuery(value)}
          autoFocus={isCreating}
        />
        {isCreating && (
          <div className="flex-center gap-x-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconOnly
              onClick={handleCancelCreate}>
              {cancelIcon}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCreate}
              iconOnly
              disabled={!query.trim()}>
              {confirmIcon}
            </Button>
          </div>
        )}
      </div>
      {!isCreating ? (
        <>
          <ScrollArea>
            <div className="max-h-64">
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.label}
                    value={option.label}
                    onSelect={() => {
                      if (isCreating) return;
                      if (onChange) {
                        if (mode === "multiple" && Array.isArray(selected)) {
                          onChange(
                            selected.includes(option.value)
                              ? selected.filter((item) => item !== option.value)
                              : [...selected, option.value],
                          );
                        } else {
                          onChange(option.value);
                        }
                      }
                      if (mode === "single") setOpen(false);
                    }}>
                    <div className="w-full flex-between">
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          Array.isArray(selected)
                            ? selected.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0"
                            : selected === option.value
                              ? "opacity-100"
                              : "opacity-0",
                        )}
                      />
                      <p> {option.label}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </ScrollArea>
        </>
      ) : (
        <>
          <ScrollArea>
            <div className="max-h-64">
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.label}
                    value={option.label}
                    className="cursor-not-allowed opacity-50"
                    onSelect={() => {}}
                    disabled>
                    <div className="w-full flex-between">
                      <Check className="mr-2 size-4 opacity-0" />
                      <p>{option.label}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </ScrollArea>
        </>
      )}
    </Command>
  );

  // -----------------------------------------------------------------
  //  Dropdown
  // -----------------------------------------------------------------
  if (expandMode) {
    return (
      <div ref={containerRef} className={cn("block", className)}>
        <div className="space-y-2" onClick={() => { if (!disabled) setOpen((prev) => !prev); }}>
          {label && <Label>{label}</Label>}
          <div className="w-full flex-between border border-neutral-200 focus:border-primary-500 active:border-primary-500 p-2 rounded-md transition-colors">
            <span className="truncate">{getDisplayLabel()}</span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </div>
        </div>
        {open && (
          <div className="w-full">
            {renderDropdownContent()}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-start"
              rightIcon={addNewIcon}
              disabled={isCreating}
              onClick={() => {
                setIsCreating(true);
                setQuery("");
              }}>
              {addNewLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // -----------------------------------------------------------------
  //Popover
  // -----------------------------------------------------------------
  return (
    <div className={cn("block", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="checkbox"
            aria-checked={open}
            disabled={disabled}
            className="flex-between w-full h-10 rounded-md border border-neutral-300 bg-white p-4 text-sm text-neutral-800 transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:opacity-80">
            <span className="truncate">{getDisplayLabel()}</span>
            <ChevronDownIcon className="size-5 text-neutral-500 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          {renderDropdownContent()}
        </PopoverContent>
      </Popover>
    </div>
  );
}

const ComboboxContent = PopoverContent;
const ComboboxInput = CommandInput;
const ComboboxItem = CommandItem;
const ComboboxList = CommandList;
const ComboboxEmpty = CommandEmpty;

export { ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxEmpty };
