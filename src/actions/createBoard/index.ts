"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { createBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UNAUTHORIZED",
    };
  }

  const { title, image } = data;

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  ] = image.split("|");

  if (
    !imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields, Failed to create board.",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/boards/${board.id}`);

  return {
    data: board,
  };
}

export const createBoard = createSafeAction(createBoardSchema, handler);
