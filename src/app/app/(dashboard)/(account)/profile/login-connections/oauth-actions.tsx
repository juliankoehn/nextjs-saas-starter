"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "#/components/ui/dropdown-menu";
import { toast } from "#/components/ui/use-toast";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Key } from "lucia";
import {
  FingerprintIcon,
  Loader2,
  MoreVerticalIcon,
  UnplugIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { disconnectKey } from "./actions";

export interface OAuthActionsProps {
  providerName: string;
  authKey?: Key;
}

export const OAuthActions: React.FC<OAuthActionsProps> = (props) => {
  const { providerName, authKey } = props;

  const [isDisconnectConfirmOpen, setIsDisconnectConfirmOpen] =
    React.useState(false);
  const [isDisconnecting, setIsDisconnecting] = React.useState(false);

  const onDisconnect = async () => {
    if (!authKey) return;

    setIsDisconnecting(true);

    await disconnectKey(authKey.providerId, authKey.providerUserId);

    toast({
      title: "Success",
      description: `You have successfully disconnected ${providerName}.`,
    });

    setIsDisconnecting(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem asChild>
            <Link href="/auth/oauth?provider=github" className="cursor-pointer">
              <FingerprintIcon className="h-4 w-4 me-2" />
              <span>Re-authenticate</span>
            </Link>
          </DropdownMenuItem>
          {authKey && (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setIsDisconnectConfirmOpen(true)}
              variant="destructive"
            >
              <UnplugIcon className="h-4 w-4 me-2" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={isDisconnectConfirmOpen}
        onOpenChange={setIsDisconnectConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {providerName}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4" asChild>
              <div>
                <p>
                  You are about to remove the Login Connection for{" "}
                  {providerName}.
                </p>
                <p>
                  After removing it, you won&apos;t be able to use{" "}
                  {providerName} to log into your Personal Vercel Account
                  anymore.
                </p>
                <p>Do you want to continue?</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDisconnect}>
              {isDisconnecting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
