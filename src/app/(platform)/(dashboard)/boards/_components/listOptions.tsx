"use client";

import { ElementRef, useRef } from "react";

import { List } from "@prisma/client";

import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormSubmit from "@/components/form/formSubmit";

import { useAction } from "@/hooks/useAction";
import { deleteList } from "@/actions/deleteList";
import { copyList } from "@/actions/copyList";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

function ListOptions({ data, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDeleteList } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`${data.title} deleted successfully`);
      closeRef.current?.click();
    },
    onError(data) {
      toast.error(data);
    },
  });

  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`${data.title} copied successfully`);
      closeRef.current?.click();
    },
    onError(data) {
      toast.error(data);
    },
  });

  function onCopy(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopyList({
      id,
      boardId,
    });
  }

  function onDelete(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDeleteList({ id, boardId });
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-3 w-3 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative px-0 pb-3 pt-3"
        side="bottom"
        align="start"
      >
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <Separator className="mb-3" />
        <Button
          className="h-auto w-full justify-start rounded-none px-5 text-sm font-normal"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none px-5 font-normal"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none px-5 font-normal"
            variant="ghost"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default ListOptions;
