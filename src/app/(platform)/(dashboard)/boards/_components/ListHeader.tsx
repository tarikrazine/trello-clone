"use client";

import { ElementRef, useRef, useState } from "react";

import { List } from "@prisma/client";

import { useEventListener } from "usehooks-ts";
import { toast } from "sonner";

import { useAction } from "@/hooks/useAction";
import { updateList } from "@/actions/updateList";

import FormInput from "@/components/form/formInput";
import ListOptions from "./listOptions";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

function ListHeader({ data, onAddCard }: ListHeaderProps) {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  function enableEditing() {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  }

  useEventListener("keydown", onKeyDown);

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`List ${data.title} updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError(data) {
      toast.error(data);
    },
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const id = formData.get("id") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      id,
      boardId,
      title,
    });
  }

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form action={onSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            placeholder="Enter list title..."
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
}

export default ListHeader;
