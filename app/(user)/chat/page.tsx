import ChatConfig from "@/chat.config";
import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
import { Metadata } from "next";
import React from "react";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
  };
};

export const metadata: Metadata = {
  title: `Chats - ${ChatConfig.TITLE}`,
};

async function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList />
    </div>
  );
}

export default ChatsPage;
