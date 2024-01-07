import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckoutButton from "./CheckoutButton";

interface PricingCardProps {
  id?: string | null;
  name: string;
  priceMonthly?: string | null;
  description: string;
  features: string[];
  redirect: boolean;
}

function PricingCard({
  id,
  name,
  priceMonthly,
  description,
  features,
  redirect,
}: PricingCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
      <div>
        <h3
          id={id + name}
          className="text-base font-semibold leading-7 text-indigo-600"
        >
          {name}
        </h3>
        <div className="mt-4 flex items-baseline gap-x-2">
          {priceMonthly ? (
            <>
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {priceMonthly}
              </span>
              <span className="text-base font-semibold leading-7 text-gray-600">
                /month
              </span>
            </>
          ) : (
            <span className="text-5xl font-bold tracking-tight text-gray-900">
              Free
            </span>
          )}
        </div>
        <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
        <ul
          role="list"
          className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
        >
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon
                className="h-6 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {redirect ? (
        <Link
          href={"/register"}
          className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
        >
          Get Started Today
        </Link>
      ) : (
        id && <CheckoutButton />
      )}
    </div>
  );
}

export default PricingCard;
