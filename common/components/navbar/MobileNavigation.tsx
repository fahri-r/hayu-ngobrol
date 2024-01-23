import ChatConfig from "@/chat.config";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "../DarkModeToggle";
import { useSession } from "next-auth/react";
import UserButton from "../UserButton";
import LanguageSelect from "../LanguageSelect";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "@/modules/chats/components/CreateChatButton";

function MobileNavigation() {
  const { data: session } = useSession();
  return (
    <nav className="flex flex-col gap-5 p-5 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <Link href={"/"}>
          <h1 className="font-bold text-3xl">{ChatConfig.TITLE}</h1>
        </Link>
        <div className="flex gap-5 items-center">
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </div>
      <LanguageSelect classname="w-full" />
    </nav>
  );
}

export default MobileNavigation;
