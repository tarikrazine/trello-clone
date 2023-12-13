import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

function CardItem({ index, data }: CardItemProps) {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
    >
      {data.title}
    </div>
  );
}

export default CardItem;
