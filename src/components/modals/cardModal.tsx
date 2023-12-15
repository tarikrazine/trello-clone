"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModalStore } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";

function CardModal() {
  const id = useCardModalStore((state) => state.id);
  const isOpen = useCardModalStore((state) => state.isOpen);
  const onClose = useCardModalStore((state) => state.onClose);

  const { data: dataCard } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <h1>Card Modal</h1>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
