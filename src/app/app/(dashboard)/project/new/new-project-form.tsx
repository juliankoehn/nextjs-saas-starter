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
import { CP_PREFIX } from "#/lib/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { createProject } from "./actions";
import { NewProjectFormValues, newProjectFormSchema } from "./schema";

const defaultValues: NewProjectFormValues = {
  name: "",
};

export const NewProjectForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<NewProjectFormValues>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: NewProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createProject(data);
      if (result.data) {
        router.push(`${CP_PREFIX}/${result.data.id}`);
      }

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
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
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                Name of the project you want to create.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
};
