"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
  size?: "default" | "sm" | "lg" | "icon";
}

function FormSubmit({
  children,
  className,
  disabled,
  variant,
  size,
}: FormSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      disabled={pending || disabled}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
}

export default FormSubmit;
