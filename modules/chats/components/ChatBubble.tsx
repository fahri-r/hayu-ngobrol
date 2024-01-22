import LoadingSpinner from "@/common/components/LoadingSpinner";
import UserAvatar from "@/common/components/UserAvatar";
import { Message } from "@/common/lib/converters/Message";
import { useLanguageStore } from "@/common/store/store";
import React, { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const bubble = tv({
  slots: {
    base: "flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-2xl",
    text: "text-xs italic font-extralight line-clamp-1",
    avatar: "",
  },
  variants: {
    variant: {
      sender: {
        base: "ml-auto bg-[#4D426D] dark:bg-[#EFA985] text-white rounded-tr-none",
        text: "text-right",
      },
      receiver: {
        base: "text-black bg-[#F5F7FB] dark:text-white dark:bg-[#4D426D] rounded-tl-none",
        text: "text-left",
        avatar: "-order-1",
      },
    },
  },
  defaultVariants: {
    variant: "sender",
  },
});

type MessageProps = {
  message: Message;
};

type ChatBubbleProps = ComponentProps<"div"> &
  VariantProps<typeof bubble> &
  MessageProps;

function ChatBubble({
  variant,
  className,
  message,
  ...props
}: ChatBubbleProps) {
  const language = useLanguageStore((state) => state.language);

  const { base, text, avatar } = bubble({ variant });

  return (
    <div className="flex my-2 items-start">
      <div className={base()}>
        <p className={text()}>{message.user.name.split(" ")[0]}</p>
        <div className="flex space-x-2">
          <p>{message.translated?.[language] || message.input}</p>
          {!message.translated && <LoadingSpinner />}
        </div>
      </div>
      <UserAvatar
        name={message.user.name}
        image={message.user.image}
        className={avatar()}
      />
    </div>
  );
}

export default ChatBubble;
