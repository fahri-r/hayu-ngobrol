import ChatConfig from "@/chat.config";
import Chats from "@/modules/chats";
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

function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return <Chats error={error} />;
}

export default ChatsPage;
