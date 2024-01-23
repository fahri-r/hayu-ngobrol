import React from "react";
import Link from "next/link";

function Home() {
  return (
    <>
      <div className="py-12 sm:py-20 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Chat with Anyone, anywhere!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              You speak your language, they speak their language.{" "}
              <span className="text-indigo-600 dark: text-indigo-500">
                Let AI handle the translation.
              </span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/chat"
                className="rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>{" "}
              <Link
                href="/pricing"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
              >
                View Pricing <span aria-hidden="true"></span>{" "}
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
