import Link from "next/link";
import React from "react";
import { Button } from "../../../common/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../common/components/ui/alert";
import { AlertCircle } from "lucide-react";

function ChatPermissionError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p className="flex-1">You do not have permission to view this chat.</p>
        <span className="font-bold">
          Please ask the chat admin to add you to the chat.
        </span>

        <Link href="/chat" replace>
          <Button variant="destructive">Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

export default ChatPermissionError;
