import { Board } from "@prisma/client";

import BoardTitleForm from "./boardTitleForm";

interface BoardNavbarProps {
  data: Board;
}

async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
}

export default BoardNavbar;
