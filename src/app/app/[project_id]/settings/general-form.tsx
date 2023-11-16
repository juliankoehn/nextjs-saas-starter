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
import { toast } from "#/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { updateProject } from "./actions";
import { GeneralFormSchema, generalFormSchema } from "./schema";

export interface GeneralFormProps {
  projectId: string | number;
  defaultValues: Partial<GeneralFormSchema>;
}

export const GeneralForm: React.FC<GeneralFormProps> = (props) => {
  const { defaultValues, projectId } = props;

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<GeneralFormSchema>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      name: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: GeneralFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await updateProject(projectId, data);
      if (result.status === "OK") {
        return toast({
          title: "Success",
          description: "Project updated successfully.",
        });
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } catch (e) {
      // error5t
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormDescription>Name of the project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};
