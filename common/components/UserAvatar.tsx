import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import { cn } from "@/common/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
}

function UserAvatar({ name, image, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <Image
          src={image}
          alt={name || "Username"}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <AvatarFallback
        delayMs={1000}
        className="dark:bg-white dark:text-black text-lg"
      >
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
