"use client";

import { ElementRef, useRef, useState } from "react";

import { Board } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/formInput";
import { useAction } from "@/hooks/useAction";
import { updateBoard } from "@/actions/updateBoard";

interface BoardTitleFormProps {
  data: Board;
}

function BoardTitleForm({ data }: BoardTitleFormProps) {
  const formRef = useRef<ElementRef<"form">>(null);

  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success("Board Updated successfully");
      setTitle(data.title);
      disableEditing();
    },
    onError(data) {
      toast.error(data);
    },
  });

  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    execute({ id: data.id, title });
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={onSubmit}
      >
        <FormInput
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
          ref={inputRef}
          errors={fieldErrors}
        />
      </form>
    );
  }

  return (
    <Button
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
}

export default BoardTitleForm;
