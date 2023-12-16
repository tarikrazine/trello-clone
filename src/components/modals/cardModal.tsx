"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModalStore } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";

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
        {!dataCard ? <Header.Skeleton /> : <Header data={dataCard} />}
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
