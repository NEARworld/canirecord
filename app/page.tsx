"use client";
import { Card } from "@/components/ui/card";
import Header from "./(main)/header";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") return <p>loading...</p>;

  return (
    <main className="min-h-[100vh] w-full grid place-items-center">
      <section className="w-2/3 h-5/6 flex flex-col justify-center items-center gap-5">
        <Header />
        <Card className="w-full h-[70vh]"></Card>
      </section>
    </main>
  );
}
