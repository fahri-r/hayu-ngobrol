import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/common/context/ThemeProvider";
import ClientProvider from "@/common/context/ClientProvider";
import FirebaseAuthProvider from "@/common/context/FirebaseAuthProvider";
import SubscriptionProvider from "@/common/context/SubscriptionProvider";
import { Toaster } from "@/common/components/ui/toaster";
import ChatConfig from "@/chat.config";
import Navbar from "@/common/components/navbar/Navbar";
import { Poppins, Kanit } from "next/font/google";
import { cn } from "@/common/lib/utils";
import Provider from "@/common/context/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-default",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

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
    <Provider>
      <ClientProvider>
        <html lang="en">
          <body className={cn(poppins.variable, kanit.variable)}>
            <div className="flex flex-col min-h-screen max-h-screen overflow-hidden max-w-7xl mx-auto">
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
            </div>
          </body>
        </html>
      </ClientProvider>
    </Provider>
  );
}
