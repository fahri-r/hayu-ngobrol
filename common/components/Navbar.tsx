"use client";

import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "../../modules/chats/components/CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";
import ChatConfig from "@/chat.config";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  return (
    <header
      className={`${
        isChatPage ? "" : "sticky"
      } top-0 z-50 bg-white dark:bg-gray-900`}
    >
      <nav className="flex flex-col gap-5 sm:flex-row sm:gap-0 items-center p-5 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
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
      <UpgradeBanner />
    </header>
  );
}

export default Navbar;
