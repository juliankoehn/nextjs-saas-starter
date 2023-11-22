import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

export default function Security() {
  return (
    <div className="grid gap-6">
      <Card className="space-y-6">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Change your password and other security settings.
          </CardDescription>
        </CardHeader>
        <CardContent>Form</CardContent>
      </Card>
    </div>
  );
}
