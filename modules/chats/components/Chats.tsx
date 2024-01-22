import ChatList from "@/modules/chats/components/ChatList";
import ChatPermissionError from "@/modules/chats/components/ChatPermissionError";
import React from "react";

function Chats({ error }: { error: string }) {
  return (
    <>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList />
    </>
  );
}

export default Chats;
