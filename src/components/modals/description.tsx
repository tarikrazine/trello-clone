"use client";

import { ElementRef, KeyboardEventHandler, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlignLeft, Save } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { CardWithList } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import FormTextarea from "@/components/form/formTextarea";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/form/formSubmit";

import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/updateCard";

interface DescriptionProps {
  data: CardWithList;
}

function Description({ data }: DescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const params = useParams();

  const queryClient = useQueryClient();

  function disableEditing() {
    setIsEditing(false);
  }

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disableEditing();
    }
  }

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      toast.success(`${data.title} Card updated successfully`);
      disableEditing();
    },
    onError(data) {
      toast.error(data);
    },
  });

  function onSubmit(formData: FormData) {
    const description = formData.get("description");

    if (description === data.description) return;

    execute({
      id: data.id,
      description: description as string,
      boardId: params?.boardId as string,
    });
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              className="min-h-[78px] w-full rounded-md  px-3.5 py-3 text-sm font-medium"
              defaultValue={data?.description || undefined}
              onKeyDown={onTextareaKeyDown}
              ref={textareaRef}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>
                <Save className="mr-2 h-4 w-4" />
                Save
              </FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
          >
            {data.description
              ? data.description
              : "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
