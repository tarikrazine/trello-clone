"use client";

import { ElementRef, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { toast } from "sonner";
import { Layout } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import FormInput from "../form/formInput";
import { Skeleton } from "@/components/ui/skeleton";

import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/updateCard";

interface HeaderProps {
  data: CardWithList;
}

function Header({ data }: HeaderProps) {
  const [title, setTitle] = useState(data?.title);
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);

  const queryClient = useQueryClient();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["card-logs", data?.id] });
      toast.success(`${data.title} Card updated`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function onBlur() {
    inputRef.current?.form?.requestSubmit();
  }

  function onSubmit(formData: FormData) {
    const title = formData?.get("title") as string;

    if (title === data?.title) return;

    execute({
      title,
      id: data?.id,
      boardId: params?.boardId as string,
    });
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="relative -left-1.5 mb-0.5 w-[95%] truncate bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          In list <span className="underline">{data?.list?.title}</span>
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Header;
