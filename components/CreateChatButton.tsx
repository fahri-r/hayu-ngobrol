"use client";

import React from "react";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function CreateChatButton() {
  const router = useRouter();

  const createNewChat = async () => {
    router.push("/chat/abc");
  };

  return (
    <Button variant={"ghost"} onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
