"use client";

import { createUser } from "@/app/actions";
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
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const formSchema: z.ZodSchema = z.object({
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
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    await signIn("credentials", { ...data, redirect: false });
  };

  return (
    <Card className="w-1/5 grid place-items-center py-8">
      <Form {...form}>
        <form
          style={{ width: 250 }}
          action={createUser}
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                  <Input placeholder="min 6, max 8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="float-right">sign up</Button>
        </form>
      </Form>
    </Card>
  );
}
