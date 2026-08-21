"use client";

import { Checkbox } from "./checkbox";

export interface CheckboxOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: CheckboxOption[];
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function CheckboxGroup({
  value,
  onValueChange,
  options,
  disabled,
  error,
  className,
}: CheckboxGroupProps) {
  const handleCheckedChange = (checked: boolean, optionValue: string) => {
    if (checked) {
      onValueChange([...value, optionValue]);
    } else {
      onValueChange(value.filter((item) => item !== optionValue));
    }
  };

  return (
    <div className={className}>
      <div className="space-y-3">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              handleCheckedChange(checked === true, option.value)
            }
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            error={undefined}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}