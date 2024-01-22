import Link from "next/link";
import React from "react";
import LanguageSelect from "../LanguageSelect";
import { useSession } from "next-auth/react";
import ChatConfig from "@/chat.config";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "@/modules/chats/components/CreateChatButton";
import DarkModeToggle from "../DarkModeToggle";
import UserButton from "../UserButton";

function DesktopNavigation() {
  const { data: session } = useSession();
  return (
    <nav className="flex flex-row gap-0 items-center p-5 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
      <Link href={"/"}>
        <h1 className="font-bold text-3xl">{ChatConfig.TITLE}</h1>
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-4">
        <LanguageSelect />
        {session ? (
          <>
            <Link href={"/chat"} prefetch={false}>
              <MessageSquareIcon className="text-black dark:text-white" />
            </Link>
            <CreateChatButton />
          </>
        ) : (
          <Link href={"/pricing"}>Pricing</Link>
        )}

        <DarkModeToggle />
        <UserButton session={session} />
      </div>
    </nav>
  );
}

export default DesktopNavigation;
