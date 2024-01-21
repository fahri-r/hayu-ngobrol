import AdminControls from "@/modules/chats/components/AdminControls";
import ChatInput from "@/modules/chats/components/ChatInput";
import ChatMembersBadges from "@/modules/chats/components/ChatMembersBadges";
import ChatMessages from "@/modules/chats/components/ChatMessages";
import { authOptions } from "@/common/lib/auth";
import { chatMembersRef } from "@/common/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/common/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function ChatDetail({ chatId }: { chatId: string }) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
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
    </>
  );
}

export default ChatDetail;
