import { Card } from "@prisma/client";
import { z } from "zod";

import { copyCardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof copyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
