import { LanguagesSupported } from "./store/store";

interface ChatConfigProps {
  TITLE: string;
  DESCRIPTION: string;
  DEFAULT_LANGUAGE: LanguagesSupported;
  DEFAULT_THEME: "light" | "dark";
  FREE_LANGUAGE_SUPPORTED: number;
}

const ChatConfig: ChatConfigProps = {
  TITLE: "Hayu Ngobrol",
  DESCRIPTION: "Chat with Anyone, anywhere!",
  DEFAULT_LANGUAGE: "en",
  DEFAULT_THEME: "light",
  FREE_LANGUAGE_SUPPORTED: 3,
};
export default ChatConfig;
