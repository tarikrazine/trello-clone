"use client";

import { Plus } from "lucide-react";
import ListWrapper from "./listWrapper";

function ListForm() {
  return (
    <ListWrapper>
      <button className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50">
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
}

export default ListForm;
