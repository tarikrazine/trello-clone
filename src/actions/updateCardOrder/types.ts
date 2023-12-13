import { Card } from "@prisma/client";
import { z } from "zod";

import { updateCardOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
