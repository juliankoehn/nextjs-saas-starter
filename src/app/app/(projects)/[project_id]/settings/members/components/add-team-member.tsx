"use client";
import { Button } from "#/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import { toast } from "#/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { MembershipRole } from "@prisma/client";
import { UserPlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inviteMembers } from "../actions";

const schema = z.object({
  email: z.union([z.string().email(), z.array(z.string().email())]),
  role: z.nativeEnum(MembershipRole),
});

interface NewMemberForm {
  email: string | string[];
  role: MembershipRole;
}

const membershipRoleOptions = [
  { value: MembershipRole.MEMBER, label: "Member" },
  { value: MembershipRole.ADMIN, label: "Admin" },
  { value: MembershipRole.OWNER, label: "Owner" },
];

export interface AddTeamMemberProps {
  projectId: string | number;
}

export const AddTeamMember: React.FC<AddTeamMemberProps> = (props) => {
  const { projectId } = props;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<NewMemberForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      role: MembershipRole.MEMBER,
    },
  });

  const inviteMemberWithId = inviteMembers.bind(null, projectId);

  const onSubmit = async (data: NewMemberForm) => {
    setIsSubmitting(true);

    try {
      const result = await inviteMemberWithId({
        emails: Array.isArray(data.email) ? data.email : [data.email],
        role: data.role,
      });

      if (result.status === "OK") {
        toast({
          title: "Invitation sent!",
          description: result.message,
        });
      } else {
        toast({
          title: "Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      }

      setIsOpen(false);
    } catch (e: any) {
      toast({
        title: "Something went wrong.",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(state) => {
        setIsOpen(state);
        form.reset();
      }}
    >
      <SheetTrigger asChild>
        <Button>
          <UserPlusIcon className="mr-2 h-4 w-4" />
          Invite member
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite member</SheetTitle>
          <SheetDescription>Invite a new member to your team</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-10 mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite as</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {membershipRoleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button isLoading={isSubmitting} type="submit">
                Send invite
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
