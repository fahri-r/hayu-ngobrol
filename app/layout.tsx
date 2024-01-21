import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/common/context/ThemeProvider";
import ClientProvider from "@/common/context/ClientProvider";
import FirebaseAuthProvider from "@/common/context/FirebaseAuthProvider";
import SubscriptionProvider from "@/common/context/SubscriptionProvider";
import { Toaster } from "@/common/components/ui/toaster";
import ChatConfig from "@/chat.config";
import Navbar from "@/common/components/Navbar";

export const metadata: Metadata = {
  title: ChatConfig.TITLE,
  description: ChatConfig.DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                {children}
                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
