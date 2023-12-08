import { List } from "@prisma/client";
import { z } from "zod";

import { createListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createListSchema>;
export type ReturnType = ActionState<InputType, List>;
