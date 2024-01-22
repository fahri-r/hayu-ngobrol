import ChatConfig from "@/chat.config";
import Chats from "@/modules/chats";
import { Metadata } from "next";
import React from "react";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
    chatId: string;
  };
};

export const metadata: Metadata = {
  title: `Chats - ${ChatConfig.TITLE}`,
};

function ChatsPage({ searchParams: { error, chatId } }: ChatsPageProps) {
  return <Chats error={error} chatId={chatId} />;
}

export default ChatsPage;
