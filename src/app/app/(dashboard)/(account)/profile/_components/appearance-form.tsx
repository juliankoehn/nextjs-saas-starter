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
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { toast } from "#/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateTheme } from "./actions";

const schema = z.object({
  theme: z.enum(["system", "light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: Partial<FormValues> = {
  theme: "light",
};

export const AppearanceForm: React.FC = (props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateTheme(data.theme);
      toast({
        title: "Success",
        description: "Theme updated",
      });
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
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Theme</FormLabel>
                  <FormDescription>
                    Select the theme for the dashboard.
                  </FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="grid max-w-2xl grid-cols-3 gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="system" className="sr-only" />
                        </FormControl>
                        <div className="flex items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="w-1/2 space-y-2 rounded-l-sm bg-[#ecedef] py-2 pl-2">
                            <div className="space-y-2 rounded-l-md bg-white py-2 pl-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-l-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-l-lg bg-[#ecedef]" />
                            </div>
                            <div className="h-[32px] flex items-center space-x-2 rounded-l-md bg-white pl-2 py-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[55px] rounded-l-lg bg-[#ecedef]" />
                            </div>
                            <div className="h-[32px] flex items-center space-x-2 rounded-l-md bg-white pl-2 py-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[55px] rounded-l-lg bg-[#ecedef]" />
                            </div>
                          </div>
                          <div className="w-1/2 space-y-2 rounded-r-sm bg-slate-950 py-2 pr-2">
                            <div className="space-y-2 rounded-md bg-slate-800 py-2 pr-2 shadow-sm">
                              <div className="h-2 w-[30px] rounded-r-lg bg-slate-400" />
                              <div className="h-2 w-[50px] rounded-r-lg bg-slate-400" />
                            </div>
                            <div className="h-[32px] flex items-center space-x-2 rounded-r-md bg-slate-800 py-2 pr-2 shadow-sm">
                              <div className="h-2 w-[40px] rounded-r-lg bg-slate-400" />
                            </div>
                            <div className="h-[32px] flex items-center space-x-2 rounded-r-md bg-slate-800 py-2 pr-2 shadow-sm">
                              <div className="h-2 w-[40px] rounded-r-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          System
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Light
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Dark
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-3">
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
