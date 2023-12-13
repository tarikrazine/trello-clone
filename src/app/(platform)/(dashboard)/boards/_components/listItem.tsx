import { ElementRef, useRef, useState } from "react";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";
import CardForm from "./cardForm";
import { cn } from "@/lib/utils";
import CardItem from "./cardItem";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

function ListItem({ index, data }: ListItemProps) {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    textareaRef.current?.focus();
    console.log("runn");
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-1.5",
            data.cards.length > 0 ? "mt-2" : "mt-0",
          )}
        >
          {data.cards.map((card, index) => {
            return <CardItem key={card.id} index={index} data={card} />;
          })}
        </ol>
        <CardForm
          listId={data.id}
          boardId={data.boardId}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}

export default ListItem;
