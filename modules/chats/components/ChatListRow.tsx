"use client";
import React from "react";
import { Message } from "@/common/lib/converters/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { limitedSortedMessagesRef } from "@/common/lib/converters/Message";
import { Skeleton } from "../../../common/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UserAvatar from "../../../common/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useLanguageStore } from "@/common/store/store";

function ChatListRow({ chatId }: { chatId: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const language = useLanguageStore((state) => state.language);

  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  );

  const pretyUUID = (n = 4) => {
    return chatId.substring(0, n);
  };

  const row = (message?: Message) => (
    <div
      key={chatId}
      onClick={() => router.push(`/chat/${chatId}`)}
      className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      <UserAvatar
        name={message?.user.name || session?.user.name}
        image={message?.user.image || session?.user.image}
      />
      <div className="flex-1">
        <p className="font-bold">
          {!message && "New Chat "}
          {
            [(message && message?.user.name) || session?.user.name]
              .toString()
              .split(" ")[0]
          }
          <p className="text-gray-400 line-clamp-1">
            {message?.translated?.[language] ||
              "Get the conversation started..."}
          </p>
        </p>
      </div>

      <div className="text-xs text-gray-400 text-right">
        <p className="mb-auto">
          {message
            ? new Date(message.timestamp).toLocaleDateString()
            : "No messages yet"}
        </p>
        <p className="">chat #{pretyUUID()}</p>
      </div>
    </div>
  );
  return (
    <div>
      {loading && (
        <div className="flex p-5 items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      )}
      {messages?.length === 0 && !loading && row()}
      {messages?.map((message) => row(message))}
    </div>
  );
}

export default ChatListRow;