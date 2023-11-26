import FormPopover from "@/components/form/formPopover";
import Hint from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

export default BoardList;
