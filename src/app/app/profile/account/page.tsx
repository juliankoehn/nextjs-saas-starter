import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { AccountForm } from "./account-form";

export default function Account() {
  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Update your account settings. Set your preferred language and
          timezone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountForm />
      </CardContent>
    </Card>
  );
}
