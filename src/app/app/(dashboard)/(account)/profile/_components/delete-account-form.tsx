import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { APP_NAME } from "#/lib/const";
import React from "react";

export const DeleteAccountForm: React.FC = () => {
  return (
    <Card variant="destructive">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-normal leading-6">
          Permanently remove your Personal Account and all of its contents from
          the <strong>{APP_NAME}</strong> platform. This action is not
          reversible, so please continue with caution.
        </p>
      </CardContent>
      <CardFooter variant="destructive" className="py-3">
        <div className="flex items-center justify-end ml-auto">
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
