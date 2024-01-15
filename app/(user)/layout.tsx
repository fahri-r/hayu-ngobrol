import React, { ReactNode } from "react";

export default function ChatsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 w-full flex flex-col max-w-6xl mx-auto">
      {children}
    </div>
  );
}
