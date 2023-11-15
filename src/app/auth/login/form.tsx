"use client";

import { Button } from "#/components/ui/button";
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
import { loginSchema, type LoginSchema } from "./schema";

export interface LoginFormProps {
  callbackUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { callbackUrl = "/app" } = props;

  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }

    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl,
    // });

    // if (!result?.error) {
    //   router.push(callbackUrl);
    // }
    // await loginAction(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="panic@thedis.co" />
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
                Your password must be at least 8 characters with a mix of upper
                and lower case letters, numbers, and symbols.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};
