import React from "react";
import ChatConfig from "@/chat.config";
import { Metadata } from "next";
import Register from "@/modules/register";

export const metadata: Metadata = {
  title: `Register - ${ChatConfig.TITLE}`,
  description: "Lets handle your Membership",
};

function RegisterPage() {
  return <Register />;
}

export default RegisterPage;
