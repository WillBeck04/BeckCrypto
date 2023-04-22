"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Popover } from "@headlessui/react";
import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Popover className="relative">
      <Popover.Button className="p-1 text-slate-600 dark:text-slate-400">
        {theme === "light" ? (
          <Moon className="w-6 h-6" />
        ) : (
          <Sun className="w-6 h-6" />
        )}
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex  rounded-md flex-col gap-3 text-xs dark:bg-slate-800 shadow-md bg-slate-200">
          <button
            onClick={() => setTheme("system")}
            className="flex gap-3 items-center font-semibold px-4 py-2 hover:dark:bg-slate-700 hover:bg-slate-300 w-full"
          >
            <Monitor className="text-slate-600 dark:text-slate-400 w-5 h-5" />
            System
          </button>
          <button
            onClick={() => setTheme("light")}
            className="flex gap-3 items-center font-semibold px-4 py-2 hover:dark:bg-slate-700 hover:bg-slate-300 w-full"
          >
            <Sun className="text-slate-600 dark:text-slate-400 w-5 h-5" />
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="flex gap-3 items-center font-semibold px-4 py-2 hover:dark:bg-slate-700 hover:bg-slate-300 w-full"
          >
            <Moon className="text-slate-600 dark:text-slate-400 w-5 h-5" />
            Dark
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
