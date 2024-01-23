"use client";

import DarkModeToggle from "../DarkModeToggle";
import UserButton from "../UserButton";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "../../../modules/chats/components/CreateChatButton";
import UpgradeBanner from "../UpgradeBanner";

import { usePathname } from "next/navigation";
import MobileNavigation from "./MobileNavigation";
import useIsMobile from "@/common/hooks/useIsMobile";
import DesktopNavigation from "./DesktopNavigation";

function Navbar() {
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");
  const isMobile = useIsMobile();

  return (
    <header
      className={`${
        isChatPage ? "" : "sticky"
      } top-0 z-50 bg-slate-100  dark:bg-butterfly-bush-900`}
    >
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
      <UpgradeBanner />
    </header>
  );
}

export default Navbar;
