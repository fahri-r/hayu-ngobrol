"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/common/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";
import { useRouter } from "next/navigation";
import useIsMobile from "../hooks/useIsMobile";
import Link from "next/link";

interface UserButtonProps {
  session: Session | null;
}

function UserButton({ session }: UserButtonProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session)
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign In
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subscription === undefined && (
          <DropdownMenuItem>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        {subscription?.role === "pro" && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E935C1" />
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}
        {isMobile && (
          <DropdownMenuItem onClick={() => router.push("/chat")}>
            Chats
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push("/chat")}>
          <Link
            href={"https://github.com/fahri-r/hayu-ngobrol"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Source
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
