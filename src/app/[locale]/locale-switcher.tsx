"use client"


import PopOver from "@/components/header/PopOver";
import { cn } from "@/lib/utils";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Globe } from "lucide-react";


export default function LocaleSwitcher() {
      
  return (
    <>
      <PopOver trigger={<Globe />} body={<Body />} />
    </>
  );
}


function Body() {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  return (
    <nav className="text-gray-600 min-w-[180px]">
      <ul>
        <li className={cn(
              "flex items-center gap-2 p-1 mb-5 px-1 py-3 mt-2 rounded-md cursor-pointer  hover:bg-gray-200",
              currentLocale === 'es' && 'bg-zinc-500/10'
              )}          
          onClick={() => changeLocale('es')}
          >
          Español
        </li>
        <li className={cn(
              "flex items-center gap-2 p-1 mb-5 px-1 py-3 mt-2 rounded-md cursor-pointer  hover:bg-gray-200",
              currentLocale === 'en' && 'bg-zinc-500/10'
              )}
          onClick={() => changeLocale('en')}
        >            
          English
        </li>
      </ul>
    </nav>
);
}