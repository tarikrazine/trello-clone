"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Organization = {
  id: string;
  name: string;
  slug: string | null;
  imageUrl: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

function NavItem(props: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/organization/${props.organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/organization/${props.organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/organization/${props.organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/organization/${props.organization.id}/billing`,
    },
  ];

  function onClick(href: string) {
    router.push(href);
  }

  return (
    <AccordionItem value={props.organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => props.onExpand(props.organization.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          props.isActive && !props.isExpanded
            ? "bg-sky-500/10 text-sky-700"
            : null,
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image
              src={props.organization.imageUrl}
              fill
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{props.organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.label}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "mb-1 w-full justify-start pl-10 font-normal",
              pathname === route.href ? "bg-sky-500/10 text-sky-700" : null,
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default NavItem;
