"use client";

import { Message, sortedMessagesRef } from "@/common/lib/converters/Message";
import { useLanguageStore } from "@/common/store/store";
import { MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import UserAvatar from "../../../common/components/UserAvatar";
import ChatBubble from "./ChatBubble";

function ChatMessages({
  chatId,
  initialMessages,
  session,
}: {
  chatId: string;
  initialMessages: Message[];
  session: Session | null;
}) {
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col text-center justify-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />
          <h2>
            <span className="font-bold">Invite a friend</span>&{" "}
            <span className="font-bold">
              Send your first message in any language
            </span>
          </h2>{" "}
          <p>The AI will auto-detect & translate it all for you</p>
        </div>
      )}

      {messages?.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
          variant={message.user.id === session?.user.id ? "sender" : "receiver"}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
