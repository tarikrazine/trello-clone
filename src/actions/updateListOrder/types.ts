import { List } from "@prisma/client";
import { z } from "zod";

import { updateListOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
