import React from "react";
import ChatConfig from "@/chat.config";
import ChatDetail from "@/modules/chats/components/ChatDetail";

type Props = {
  params: {
    chatId: string;
  };
};

export async function generateMetadata({ params: { chatId } }: Props) {
  return {
    title: `Chat#${chatId.substring(0, 4)} - ${ChatConfig.TITLE}`,
  };
}

function ChatPage({ params: { chatId } }: Props) {
  return <ChatDetail chatId={chatId} />;
}

export default ChatPage;
