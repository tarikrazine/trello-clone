"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormErrors from "./formErrors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      defaultValue = "",
      disabled,
      errors,
      label,
      onBlur,
      placeholder,
      required,
      type,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}

          <Input
            id={id}
            name={id}
            ref={ref}
            placeholder={placeholder}
            onBlur={onBlur}
            type={type}
            required={required}
            defaultValue={defaultValue}
            disabled={pending || disabled}
            className={cn("h-7 px-2 py-1 text-sm", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
