"use client";

import { toast } from "sonner";
import { MoreHorizontal, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { deleteBoard } from "@/actions/deleteBoard";

interface BoardOptionsProps {
  id: string;
}

function BoardOptions({ id }: BoardOptionsProps) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });

  function onClick() {
    execute({ id });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Board actions
        </div>
        <Separator className="mb-3" />
        <Button
          variant="ghost"
          onClick={onClick}
          className="group h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal transition hover:text-rose-400"
          disabled={isLoading}
        >
          Delete this board
          <Trash className="ml-auto h-4 w-4 group-hover:animate-bounce" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardOptions;
