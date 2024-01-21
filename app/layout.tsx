import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import ClientProvider from "@/context/ClientProvider";
import FirebaseAuthProvider from "@/context/FirebaseAuthProvider";
import SubscriptionProvider from "@/context/SubscriptionProvider";
import { Toaster } from "@/components/ui/toaster";
import ChatConfig from "@/chat.config";

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
                <Header />
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
