"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import * as z from "zod";
import { useToast } from "../../../common/components/ui/use-toast";
import useAdminId from "@/common/hooks/useAdminId";
import { useSubscriptionStore } from "@/common/store/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/components/ui/dialog";
import { Button } from "../../../common/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../common/components/ui/form";
import { Input } from "../../../common/components/ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersRef,
} from "@/common/lib/converters/ChatMembers";
import { ToastAction } from "../../../common/components/ui/toast";
import { getUserByEmailRef } from "@/common/lib/converters/User";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();
  console.log(adminId);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
      title: "Sending Invite",
      description: "Please wait while we send the invite...",
    });

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";
    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You have exceeded the limit of users in a single chat for the Free plan. Please upgrade to Pro to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));
    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of registered user or resend the invitation once they have signed up!",
        variant: "destructive",
      });
      return;
    } else {
      const user = querySnapshot.docs[0].data();

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);
          toast({
            title: "Added to chat",
            description: "The user has been added to the chat successfully",
            className: "bg-green-600 text-white",
            duration: 3000,
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description:
              "Whoops... there was an error adding the user to the chat!",
            variant: "destructive",
          });
          setOpen(false);
        });
    }
    form.reset();
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                chat!{" "}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="john@doe.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full bg-green-600 hover:bg-green-500" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    )
  );
}

export default InviteUser;
