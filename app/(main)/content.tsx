"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function Content() {
  const session = useSession();

  if (session.status === "loading")
    return <Skeleton className="w-full h-[70vh]" />;

  return <Card className="w-full h-[70vh]"></Card>;
}
