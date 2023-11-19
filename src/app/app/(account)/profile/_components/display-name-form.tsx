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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateDisplayName } from "./actions";

const schema = z.object({
  name: z.string().min(1).max(32),
});

export interface DisplayNameFormProps {
  name?: string;
}

export const DisplayNameForm: React.FC<DisplayNameFormProps> = (props) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props?.name ?? "",
    },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      await updateDisplayName(data.name);
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
            <CardTitle>Display Name</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your full name, or a display name you are
                    comfortable with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-3">
            <div className="flex items-center">
              Please use 32 characters at maximum.
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
