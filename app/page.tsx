import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[100vh] w-full grid place-items-center">
      <section className="w-2/3 h-5/6 flex flex-col justify-center items-center gap-5">
        <header className="self-end flex gap-2">
          <Link href="auth/signup">
            <Button>signup</Button>
          </Link>
          <Link href="auth/signin">
            <Button>login</Button>
          </Link>
        </header>
        <Card className="w-full h-[70vh]"></Card>
      </section>
    </main>
  );
}
