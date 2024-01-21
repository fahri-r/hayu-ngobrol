import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
import React from "react";

type ChatsPageProps = {
  params: {};
  searchParams: {
    error: string;
  };
};

async function ChatsPage({ searchParams: { error } }: ChatsPageProps) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList />
    </div>
  );
}

export default ChatsPage;
