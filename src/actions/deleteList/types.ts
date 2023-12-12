import { List } from "@prisma/client";
import { z } from "zod";

import { deleteListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
