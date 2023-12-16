"use client";

import { useParams } from "next/navigation";

import { Copy, Loader, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/useAction";
import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { useCardModalStore } from "@/hooks/useCardModal";

interface ActionsProps {
  data: CardWithList;
}

function Actions({ data }: ActionsProps) {
  const params = useParams();

  const cardModal = useCardModalStore();

  const { execute: executeCopyCard, isLoading: isCopyingCard } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`${data.title} Card copied successfully`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    },
  );

  const { execute: executeDeleteCard, isLoading: isDeletingCard } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`${data.title} Card Deleted successfully`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    },
  );

  function onClickCopyCard() {
    executeCopyCard({
      id: data.id,
      boardId: params.boardId as string,
    });
  }

  function onClickDeleteCard() {
    executeDeleteCard({
      id: data.id,
      boardId: params.boardId as string,
    });
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-sm font-semibold text-neutral-700">Actions</p>
      <Button
        className="w-full justify-start"
        variant="gray"
        size="inline"
        onClick={onClickCopyCard}
        disabled={isCopyingCard}
      >
        {isCopyingCard ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Copy className="mr-2 h-4 w-4" />
        )}
        Copy
      </Button>
      <Button
        className="w-full justify-start"
        variant="gray"
        size="inline"
        onClick={onClickDeleteCard}
        disabled={isDeletingCard}
      >
        {isDeletingCard ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Trash className="mr-2 h-4 w-4" />
        )}
        Delete
      </Button>
    </div>
  );
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="!mb-[14px] h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};

export default Actions;
