import AdminControls from "@/modules/chats/components/AdminControls";
import ChatInput from "@/modules/chats/components/ChatInput";
import ChatMembersBadges from "@/modules/chats/components/ChatMembersBadges";
import ChatMessages from "@/modules/chats/components/ChatMessages";
import React from "react";
import { getDocs } from "firebase/firestore";
import { sortedMessagesRef } from "@/common/lib/converters/Message";
import { getServerSession } from "next-auth";
import { authOptions } from "@/common/lib/auth";

async function ChatDetail({ chatId }: { chatId: string }) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-col overflow-y-scroll grow basis-0">
        <AdminControls chatId={chatId} />
        <ChatMembersBadges chatId={chatId} />
        <div className="flex-1">
          <ChatMessages
            chatId={chatId}
            session={session}
            initialMessages={initialMessages}
          />
        </div>
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
}

export default ChatDetail;
