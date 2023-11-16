import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import { ArrowRight, Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export default function MarketingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          headingFont.className,
        )}
      >
        <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 text-amber-700 shadow-sm">
          <Medal className="mr-2 h-6 w-6" />
          <p>No 1 task management</p>
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Trello helps team move
        </h1>
        <h2 className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl font-medium text-white md:text-3xl">
          work forward.
        </h2>
      </div>
      <h3
        className={cn(
          "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-lg",
          textFont.className,
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        hight rises to the home office, the way your team works is unique -
        accomplish it all with Trello.
      </h3>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign_up">
          Get Trello for free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </main>
  );
}
