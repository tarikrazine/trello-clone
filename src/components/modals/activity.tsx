"use client";

import { AuditLog } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "../activityItem";

interface ActivityProps {
  data: AuditLog[];
}

function Activity({ data }: ActivityProps) {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-2">
          {data?.map((log) => <ActivityItem data={log} key={log.id} />)}
        </ol>
        {data?.length === 0 && (
          <span className="text-sm text-neutral-700">No activity yet.</span>
        )}
      </div>
    </div>
  );
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-20 w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;
