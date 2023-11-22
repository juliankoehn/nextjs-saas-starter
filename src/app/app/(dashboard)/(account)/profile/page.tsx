import { getPageSession } from "#/lib/auth/lucia";
import { db } from "#/lib/db";
import { MembershipRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { AppearanceForm } from "./_components/appearance-form";
import { DeleteAccountForm } from "./_components/delete-account-form";
import { DisplayNameForm } from "./_components/display-name-form";
import { EmailForm } from "./_components/email-form";
import { LocalizationForm } from "./_components/localization-form";

export default async function Profile() {
  const session = await getPageSession();

  if (!session) {
    redirect("/auth/login");
  }

  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          role: MembershipRole.OWNER,
        },
      },
    },
  });

  return (
    <div className="grid gap-6">
      <DisplayNameForm name={session.user.name} />
      <EmailForm email={session.user.email} />
      <AppearanceForm />
      <LocalizationForm
        defaultValues={{
          language: session.user.locale,
          timezone: session.user.timezone,
        }}
      />
      <DeleteAccountForm projects={projects} />
    </div>
  );
}
