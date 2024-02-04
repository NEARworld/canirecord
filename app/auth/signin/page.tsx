"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { isRedirectError } from "next/dist/client/components/redirect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema: z.ZodSchema = z.object({
  email: z.string().email("invalid email"),
  password: z
    .string({ description: "invalid password" })
    .min(6, "too short")
    .max(8, "too long"),
});

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      await signIn("credentials", {
        redirect: false,
        ...data,
      });
    } catch (e) {
      if (isRedirectError(e)) {
        throw e;
      }
    } finally {
      router.push("/");
    }
  };

  return (
    <section className="w-full grid place-items-center">
      <header className="w-1/5 text-start opacity-50">
        <Link href="/" className="inline-flex">
          <ArrowLeft /> <span>back</span>
        </Link>
      </header>

      <Card className="w-1/5 grid place-items-center py-8">
        <Form {...form}>
          <form style={{ width: 250 }} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name={"email"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>email</FormLabel>
                  <FormDescription>please input your email</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              name={"password"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>password</FormLabel>
                  <FormDescription>please input your password</FormDescription>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="min 6, max 8"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="float-right">login</Button>
          </form>
        </Form>
      </Card>
    </section>
  );
}
