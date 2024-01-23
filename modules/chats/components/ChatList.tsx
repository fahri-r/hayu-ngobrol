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
import ChatListItem from "./ChatListItem";
import useIsMobile from "@/common/hooks/useIsMobile";
import { useSearchParams } from "next/navigation";
import { cn } from "@/common/lib/utils";

function ChatList({ initialChats }: { initialChats: ChatMembers[] }) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    {
      initialValue: initialChats,
    }
  );

  if (members?.length === 0)
    return (
      <div
        className={cn(
          "flex flex-col bg-white dark:bg-butterfly-bush-800 rounded-3xl justify-center items-center pt-40 space-y-2 px-5",
          {
            "text-center": isMobile,
          }
        )}
      >
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome</h1>
        <h2 className="pb-10">
          Lets get you started by creating your first chat!
        </h2>
        <CreateChatButton isLarge />
      </div>
    );

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-butterfly-bush-800 rounded-3xl overflow-hidden",
        {
          "max-w-sm": !isMobile,
          hidden: searchParams.has("chatId") && isMobile,
          "flex-1": !searchParams.has("chatId") && isMobile,
        }
      )}
    >
      <div className="flex flex-col overflow-y-scroll grow basis-0">
        {members?.map((member, i) => (
          <ChatListItem key={member.chatId} chatId={member.chatId} />
        ))}
      </div>
      {isMobile && (
        <div className="absolute bottom-[5%] right-[2%]">
          <CreateChatButton
            variant={"icon"}
            className="bg-green-600 hover:bg-green-500 text-white rounded-full h-14 w-14"
          />
        </div>
      )}
    </div>
  );
}

export default ChatList;
