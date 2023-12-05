import { Board } from "@prisma/client";

import BoardTitleForm from "./boardTitleForm";
import BoardOptions from "./boardOptions";

interface BoardNavbarProps {
  data: Board;
}

async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
}

export default BoardNavbar;
