import { getPageSession } from "#/lib/auth/lucia";
import { redirect } from "next/navigation";
import { AppearanceForm } from "./_components/appearance-form";
import { DeleteAccountForm } from "./_components/delete-account-form";
import { DisplayNameForm } from "./_components/display-name-form";
import { EmailForm } from "./_components/email-form";

export default async function Profile() {
  const session = await getPageSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="grid gap-6">
      <DisplayNameForm name={session.user.name} />
      <EmailForm email={session.user.email} />
      <AppearanceForm />
      <DeleteAccountForm />
    </div>
  );
}
