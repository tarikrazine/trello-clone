"use client";

import Link from "next/link";

import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import NavItem from "./navItem";

interface SidebarProps {
  storageKey: string;
}

function Sidebar({ storageKey = "t-sidebar-storage" }: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    [],
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    [],
  );

  function onExpand(id: string) {
    setExpanded((expanded) => ({
      ...expanded,
      [id]: !expanded[id],
    }));
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="text-sx mb-1 flex items-center font-medium">
        <span className="pl-4">WorkSpaces</span>
        <Button asChild size="icon" variant="ghost" className="ml-auto">
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization?.id}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
}

export default Sidebar;
