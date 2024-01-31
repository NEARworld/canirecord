import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-[100vh] w-full grid place-items-center">
      <section className="w-2/3 h-5/6 flex flex-col justify-center items-center gap-5">
        <Button className="self-end">signup</Button>
        <Card className="w-full h-[70vh]"></Card>
      </section>
    </main>
  );
}
