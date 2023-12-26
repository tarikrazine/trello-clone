import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import ActivityItem from "@/components/activityItem";
import { Skeleton } from "@/components/ui/skeleton";

import { db } from "@/lib/db";

async function ActivityList() {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="mr-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity yet
      </p>
      {auditLogs?.map((log) => <ActivityItem data={log} key={log.id} />)}
    </ol>
  );
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="mt-4 space-y-4">
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[50%]" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[75%]" />
    </div>
  );
};

export default ActivityList;
