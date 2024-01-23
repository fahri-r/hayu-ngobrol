import ChatPermissionError from "@/modules/chats/components/ChatPermissionError";
import React from "react";
import { getServerSession } from "next-auth";
import { getDocs } from "firebase/firestore";
import { chatMembersCollectionGroupRef } from "@/common/lib/converters/ChatMembers";
import { authOptions } from "@/common/lib/auth";
import ChatDetail from "./ChatDetail";
import ChatList from "./ChatList";

async function Chats({ error, chatId }: { error: string; chatId: string }) {
  const session = await getServerSession(authOptions);
  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return (
    <>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <div className="flex flex-1 gap-10 pb-10">
        <ChatList initialChats={initialChats} />
        {chatId && <ChatDetail chatId={chatId} />}
      </div>
    </>
  );
}

export default Chats;
