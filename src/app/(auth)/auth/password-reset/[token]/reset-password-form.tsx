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
import { PasswordInput } from "#/components/ui/password-input";
import { toast } from "#/components/ui/use-toast";
import { CP_PREFIX } from "#/lib/const";
import { isAppError } from "#/lib/error-code";
import { zPassword } from "#/lib/validation/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPaswordAction } from "./actions";

const schema = z.object({
  password: zPassword,
});

type FormValue = z.infer<typeof schema>;

export interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
  const { token } = props;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<FormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: FormValue) => {
    setIsSubmitting(true);
    try {
      await resetPaswordAction(token, values.password);
      toast({
        title: "Success",
        description: "Password reset successfully.",
      });
      router.push(CP_PREFIX);
    } catch (e) {
      if (isAppError(e)) {
        return toast({
          title: "Error",
          variant: "destructive",
          description: e.message,
        });
      }

      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong, please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
