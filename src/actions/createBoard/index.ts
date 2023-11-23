"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { createBoardSchema } from "./schema";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "UNAUTHORIZED",
    };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
}

export const createBoard = createSafeAction(createBoardSchema, handler);
