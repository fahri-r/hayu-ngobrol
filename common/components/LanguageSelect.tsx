"use client";

import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/common/store/store";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "../lib/utils";

function LanguageSelect({ classname }: { classname?: string }) {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro =
    subscription?.role === "pro" && subscription?.status === "active";

  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  useEffect(() => {
    console.log(language);
  }, [language]);

  return (
    isChatPage && (
      <Select onValueChange={(value: LanguagesSupported) => setLanguage(value)}>
        <SelectTrigger
          className={cn("w-[150px] text-black dark:text-white", classname)}
        >
          <SelectValue
            placeholder={LanguagesSupportedMap[language]}
            className=""
          />
        </SelectTrigger>
        <SelectContent>
          {subscription === undefined ? (
            <LoadingSpinner />
          ) : (
            <>
              {getLanguages(isPro).map((language) => (
                <SelectItem key={language} value={language}>
                  {LanguagesSupportedMap[language]}
                </SelectItem>
              ))}
              {getNotSupportedLanguages(isPro).map((language) => (
                <Link href={"/register"} key={language} prefetch={false}>
                  <SelectItem
                    key={language}
                    value={language}
                    disabled
                    className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                  >
                    {LanguagesSupportedMap[language]} (Pro)
                  </SelectItem>
                </Link>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    )
  );
}

export default LanguageSelect;
