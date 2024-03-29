"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../common/components/ui/form";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import {
  User,
  limitedMessagesRef,
  messagesRef,
} from "@/common/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "../../../common/components/ui/use-toast";
import { useSubscriptionStore } from "@/common/store/store";
import { ToastAction } from "../../../common/components/ui/toast";
import { PlaneIcon, Send } from "lucide-react";

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formCopy = values;
    form.reset();

    if (formCopy.input.length === 0) {
      return;
    }

    if (!session?.user) {
      return;
    }

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription?.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the Free plan limit of 20 messages per chat. Upgrade to Pro for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to Pro
          </ToastAction>
        ),
      });
    }
    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: formCopy.input,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-b-3xl max-w-4xl mx-auto bg-slate-200 dark:bg-butterfly-bush-700"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in any language..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full"
            size={"icon"}
          >
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
