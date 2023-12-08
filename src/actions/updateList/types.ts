import { List } from "@prisma/client";
import { z } from "zod";

import { updateListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateListSchema>;
export type ReturnType = ActionState<InputType, List>;
