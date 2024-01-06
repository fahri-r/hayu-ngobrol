"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <SessionProvider> {children} </SessionProvider>;
}
