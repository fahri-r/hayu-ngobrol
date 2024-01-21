"use server";

import { authOptions } from "@/common/lib/auth";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { headers } from "next/headers";
import { adminDB } from "@/common/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function generatePortalLink() {
  const session = await getServerSession(authOptions);
  const host = headers().get("host");

  if (!session?.user.id) return console.error("No user Id found");

  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? `http://${host}/register`
      : `https://${host}/register`;

  const doc = await adminDB.collection("customers").doc(id).get();

  if (!doc.data)
    return console.error("No customer record found with userId: ", id);

  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  redirect(stripeSession.url);
}
