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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "#/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { TimezoneSelect } from "#/components/ui/timezone-select";
import { toast } from "#/components/ui/use-toast";
import { cn } from "#/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateLocalizations } from "./actions";

const languages = [
  { label: "English", value: "en" },
  { label: "German", value: "de" },
] as const;

const schema = z.object({
  timezone: z.string({
    required_error: "A Timezone is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

type FormValues = z.infer<typeof schema>;

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  timezone: "Europe/Berlin",
  language: "en",
};

export interface LocalizationFormProps {
  defaultValues?: Partial<FormValues>;
}

export const LocalizationForm: React.FC<LocalizationFormProps> = (props) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      language: props.defaultValues?.language ?? defaultValues.language,
      timezone: props.defaultValues?.timezone ?? defaultValues.timezone,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateLocalizations(data.language, data.timezone);
      toast({
        title: "Successfully updated",
        description: "Your changes have been saved.",
      });
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Localization</CardTitle>
          </CardHeader>
          <CardContent className="grid space-y-6">
            <TimezoneSelect name="timezone" />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-3">
            <div className="flex items-center justify-end ml-auto">
              <Button isLoading={form.formState.isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
