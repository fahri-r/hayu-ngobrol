import CardContainer from "@/common/components/CardContainer";
import { authOptions } from "@/common/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

async function Register() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 text-black dark:text-white text-center lg:px-8 flex flex-col gap-10">
      <div className="mx-auto max-w-4xl">
        <p className="mt-2 text-4xl font-bold tracking-tight sm: text-5xl">
          Lets handle your Membership {session?.user?.name?.split(" ")?.[0]}!
        </p>
      </div>
      <CardContainer redirect={false} />
    </div>
  );
}

export default Register;
