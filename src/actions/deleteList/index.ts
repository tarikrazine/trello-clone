"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { deleteListSchema } from "./schema";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UNAUTHORIZED",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete",
    };
  }

  revalidatePath(`/boards/${list.boardId}`);

  return {
    data: list,
  };
}

export const deleteList = createSafeAction(deleteListSchema, handler);
