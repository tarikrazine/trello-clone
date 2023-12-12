import { List } from "@prisma/client";
import { z } from "zod";

import { copyListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof copyListSchema>;
export type ReturnType = ActionState<InputType, List>;
