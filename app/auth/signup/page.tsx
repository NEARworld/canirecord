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
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema: z.ZodSchema = z
  .object({
    email: z.string().email("invalid email"),
    username: z
      .string({ description: "invalid username" })
      .min(2, { message: "too short" })
      .max(6, "too long")
      .regex(/[A-Za-z]/),
    password: z
      .string({ description: "invalid password" })
      .min(6, "too short")
      .max(8, "too long"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "not matched",
    path: ["confirm"],
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
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  };

  return (
    <section className="w-full grid place-items-center">
      <header className="w-1/5 text-start opacity-50">
        <Link href="/" className="inline-flex">
          <ArrowLeft /> <span>back</span>
        </Link>
      </header>
      <Card className="w-1/5 grid place-items-center py-8 mt-2">
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
              name={"username"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>username</FormLabel>
                  <FormDescription>please input your username</FormDescription>
                  <FormControl>
                    <Input placeholder="min 2, max 6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name={"confirm"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="float-right">sign up</Button>
          </form>
        </Form>
      </Card>
    </section>
  );
}
