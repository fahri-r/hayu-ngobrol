import ChatConfig from "@/chat.config";
import Home from "@/modules/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ChatConfig.TITLE,
  description: "Chat with Anyone, anywhere!",
};

function HomePage() {
  return <Home />;
}

export default HomePage;
