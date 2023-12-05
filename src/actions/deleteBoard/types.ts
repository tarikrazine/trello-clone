import { Board } from "@prisma/client";
import { z } from "zod";

import { deleteBoardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof deleteBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
