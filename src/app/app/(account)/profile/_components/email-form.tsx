"use client";

import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { toast } from "#/components/ui/use-toast";
import { APP_NAME } from "#/lib/const";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateDisplayName } from "./actions";

const schema = z.object({
  email: z.string().email(),
});

export interface EmailFormProps {
  email?: string;
}

export const EmailForm: React.FC<EmailFormProps> = (props) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: props?.email ?? "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await updateDisplayName(data.email);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="hello@julian.pro" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter the email address you want to use to log in
                    with {APP_NAME}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-3">
            <div className="flex items-center">
              We will email you to verify the change.
            </div>
            <div className="flex items-center justify-end ml-auto">
              <Button
                isLoading={form.formState.isSubmitting}
                type="submit"
                disabled={!form.formState.isValid}
              >
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
