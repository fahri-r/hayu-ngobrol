import { authOptions } from "@/auth";
import ChatList from "@/components/ChatList";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
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
      <ChatList />
    </div>
  );
}

export default ChatsPage;
