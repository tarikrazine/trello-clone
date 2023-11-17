import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

function Navbar() {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
          size="sm"
          variant="primary"
        >
          Create
        </Button>
        <Button
          className="block h-auto rounded-sm px-2 py-1.5 md:hidden"
          size="sm"
          variant="primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: { height: 30, width: 30 } } }}
        />
      </div>
    </div>
  );
}

export default Navbar;
