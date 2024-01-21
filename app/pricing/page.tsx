import ChatConfig from "@/chat.config";
import Pricing from "@/modules/pricing";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Pricing - ${ChatConfig.TITLE}`,
  description: "The right price for you, whoever you are",
};

function PricingPage() {
  return <Pricing />;
}

export default PricingPage;
