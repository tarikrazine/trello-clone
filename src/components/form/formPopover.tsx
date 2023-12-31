"use client";

import { ElementRef, useRef } from "react";

import { X } from "lucide-react";
import { toast } from "sonner";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard";

import FormInput from "./formInput";
import FormSubmit from "./formSubmit";
import FormPicker from "./formPicker";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function FormPopover({
  children,
  align,
  side,
  sideOffset = 0,
}: FormPopoverProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log(data);
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/boards/${data.id}`);
    },
    onError(error) {
      console.log(error);
      toast.error(error);
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    const image = formData.get("image") as string;

    execute({ title, image });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="relative w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" error={fieldErrors} />
            <FormInput
              id="title"
              label="Board"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
