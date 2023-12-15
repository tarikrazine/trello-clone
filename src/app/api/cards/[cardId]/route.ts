import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[GET_CARD_ID_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
    });
  }
}
