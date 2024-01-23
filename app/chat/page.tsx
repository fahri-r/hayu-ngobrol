import ChatConfig from "@/chat.config";
import { authOptions } from "@/common/lib/auth";
import { chatMembersRef } from "@/common/lib/converters/ChatMembers";
import Chats from "@/modules/chats";
import { getDocs } from "firebase/firestore";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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

async function ChatsPage({ searchParams: { error, chatId } }: ChatsPageProps) {
  const session = await getServerSession(authOptions);

  if (chatId) {
    const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
      .map((doc) => doc.id)
      .includes(session?.user.id!);

    if (!hasAccess) redirect("/chat?error=permission");
  }

  return <Chats error={error} chatId={chatId} />;
}

export default ChatsPage;
