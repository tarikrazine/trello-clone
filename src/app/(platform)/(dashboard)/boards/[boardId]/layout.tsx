import { notFound, redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import BoardNavbar from "../_components/boardNavbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId: orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

export default async function LayoutBoard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: { id: params.boardId!, orgId: orgId },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-cover bg-center bg-no-repeat"
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
}
