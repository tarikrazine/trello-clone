"use server";

import { db } from "@/lib/db";
import { createBoardSchema } from "@/schema/createBoard";
import { revalidatePath } from "next/cache";

export async function createBoard(formData: FormData) {
  const { title } = createBoardSchema.parse({
    title: formData.get("title"),
  });

  await db.board.create({ data: { title } });

  revalidatePath(`/organization/${formData.get("id")}`);
}
