"use client";

import { ListWithCards } from "@/types";
import ListForm from "./listForm";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function ListContainer({ boardId, data }: ListContainerProps) {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
}

export default ListContainer;
