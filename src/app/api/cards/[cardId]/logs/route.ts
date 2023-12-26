import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { cardId: string } },
) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return NextResponse.json("UNAUTHORIZED", { status: 401 });
  }

  try {
    const auditLog = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLog);

    return;
  } catch (error) {
    console.log("[LOGS_GET_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
