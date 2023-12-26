"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModalStore } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import { AuditLog } from "@prisma/client";
import Activity from "./activity";

function CardModal() {
  const id = useCardModalStore((state) => state.id);
  const isOpen = useCardModalStore((state) => state.isOpen);
  const onClose = useCardModalStore((state) => state.onClose);

  const { data: dataCard } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!dataCard ? <Header.Skeleton /> : <Header data={dataCard} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!dataCard ? (
                <Description.Skeleton />
              ) : (
                <Description data={dataCard} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity data={auditLogsData} />
              )}
            </div>
          </div>
          {!dataCard ? <Actions.Skeleton /> : <Actions data={dataCard} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
