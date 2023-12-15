import { Card } from "@prisma/client";

import { Draggable } from "@hello-pangea/dnd";

import { useCardModalStore } from "@/hooks/useCardModal";

interface CardItemProps {
  index: number;
  data: Card;
}

function CardItem({ index, data }: CardItemProps) {
  const cardModal = useCardModalStore();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
