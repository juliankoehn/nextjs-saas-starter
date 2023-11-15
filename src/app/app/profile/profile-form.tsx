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
import { useForm } from "react-hook-form";
import { editProfile } from "./actions";
import { ProfileFormValues, profileFormSchema } from "./schema";

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  email: "",
};

export interface ProfileFormProps {
  defaultValues: Partial<ProfileFormValues>;
}

export const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultValues,
      ...props.defaultValues,
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    await editProfile(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Julian Köhn" {...field} />
              </FormControl>
              <FormDescription>
                Your full name will be displayed in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@julian.pro" {...field} />
              </FormControl>
              <FormDescription>
                You may need to log out and back in to see any change take
                effect
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};
