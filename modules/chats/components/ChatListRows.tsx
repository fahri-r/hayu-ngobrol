"use client";

import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from "@/common/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";
import { MessageSquare } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import ChatListRow from "./ChatListRow";
import { useHooks } from "@/common/context/Provider";
import ChatDetail from "./ChatDetail";

function ChatListRows({ initialChats }: { initialChats: ChatMembers[] }) {
  const { selectedChat } = useHooks();
  const { data: session } = useSession();
  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    {
      initialValue: initialChats,
    }
  );

  if (members?.length === 0)
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome</h1>
        <h2 className="pb-10">
          Lets get you started by creating your first chat!
        </h2>
        <CreateChatButton isLarge />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="flex flex-col">
        {members?.map((member, i) => (
          <ChatListRow key={member.chatId} chatId={member.chatId} />
        ))}
      </div>
      <div className="flex flex-1">
        {selectedChat && (
          <div className="flex flex-col grow">
            <ChatDetail />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListRows;
