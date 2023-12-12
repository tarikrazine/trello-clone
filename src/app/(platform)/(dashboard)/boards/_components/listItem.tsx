import { ElementRef, useRef, useState } from "react";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

function ListItem({ index, data }: ListItemProps) {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  );
}

export default ListItem;
