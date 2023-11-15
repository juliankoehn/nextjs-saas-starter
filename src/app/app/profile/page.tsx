import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { getPageSession } from "#/lib/auth/lucia";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export default async function Profile() {
  const session = await getPageSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is your Profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm
          defaultValues={{
            email: session.user.email,
            name: session.user.name ?? "",
          }}
        />
      </CardContent>
    </Card>
  );
}
