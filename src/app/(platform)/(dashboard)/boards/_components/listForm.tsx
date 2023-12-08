"use client";

import { useRef, useState, ElementRef } from "react";

import { useParams, useRouter } from "next/navigation";

import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

import ListWrapper from "./listWrapper";

import FormInput from "@/components/form/formInput";
import FormSubmit from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/createList";

function ListForm() {
  const params = useParams();
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  function enableEditing() {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    });
  }

  function disabledEditing() {
    setIsEditing(false);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disabledEditing();
    }
  }

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} created`);
      disabledEditing();
      router.refresh();
    },
    onError(data) {
      toast.error(data);
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ boardId, title });
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            id="title"
            ref={inputRef}
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title..."
            errors={fieldErrors}
          />
          <input hidden value={params?.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button
              onClick={disabledEditing}
              size="sm"
              variant="ghost"
              className="ml-auto"
            >
              <X className="h-5 w-5 " />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
        onClick={enableEditing}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
}

export default ListForm;
