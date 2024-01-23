import CardContainer from "@/common/components/CardContainer";
import React from "react";

function Pricing() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-10 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mt-2 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6 flex flex-col gap-10">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            Were 99% sure we have a plan to match 100% of your needs
          </p>
          <CardContainer redirect={true} />
        </div>
      </div>
    </>
  );
}

export default Pricing;
