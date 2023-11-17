"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupSchema } from "./schema";
import { SubmitButton } from "./submit-button";

export const SignupForm = () => {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupSchema) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="panic@thedis.co"
                    />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="panic@thedis.co"
                    />
                  </FormControl>
                  <FormDescription>
                    Your password must be at least 8 characters with a mix of
                    upper and lower case letters, numbers, and symbols.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
