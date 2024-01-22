"use client";

import AdminControls from "@/modules/chats/components/AdminControls";
import ChatInput from "@/modules/chats/components/ChatInput";
import ChatMembersBadges from "@/modules/chats/components/ChatMembersBadges";
import ChatMessages from "@/modules/chats/components/ChatMessages";
import { authOptions } from "@/common/lib/auth";
import { chatMembersRef } from "@/common/lib/converters/ChatMembers";
import { Message, sortedMessagesRef } from "@/common/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useHooks } from "@/common/context/Provider";

function ChatDetail() {
  const { data: session } = useSession();
  const { selectedChat } = useHooks();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedChat) {
      const getInitialMessages = async () => {
        const messages = (
          await getDocs(sortedMessagesRef(selectedChat))
        ).docs.map((doc) => doc.data());
        setInitialMessages(messages);
      };
      getInitialMessages();
    }
  }, [selectedChat]);

  return (
    <div className="flex flex-col overflow-y-scroll grow basis-0">
      <AdminControls chatId={selectedChat} />
      <ChatMembersBadges chatId={selectedChat} />
      <div className="flex-1">
        <ChatMessages
          chatId={selectedChat}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={selectedChat} />
    </div>
  );
}

export default ChatDetail;
