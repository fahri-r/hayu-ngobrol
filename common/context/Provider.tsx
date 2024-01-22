"use client";

import { useState, useContext } from "react";

import AppContext from "@/common/context/AppContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [selectedChat, setSelectedChat] = useState("");

  const value = {
    selectedChat,
    setSelectedChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useHooks() {
  return useContext(AppContext);
}
