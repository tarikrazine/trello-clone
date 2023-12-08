"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { updateListSchema } from "./schema";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UNAUTHORIZED",
    };
  }

  const { id, boardId, title } = data;

  let list;

  try {
    list = await db.list.update({
      data: {
        title,
      },
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
      error: "Failed to create",
    };
  }

  revalidatePath(`/boards/${boardId}`);

  return {
    data: list,
  };
}

export const updateList = createSafeAction(updateListSchema, handler);
