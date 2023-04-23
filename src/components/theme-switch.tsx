'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Popover } from '@headlessui/react'
import { Monitor, Moon, Sun } from 'lucide-react'

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Popover className="relative">
      <Popover.Button className="p-1">
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-slate-600" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex  flex-col gap-1 rounded-md bg-slate-200 py-3 text-xs shadow-md dark:bg-slate-800">
          <button
            onClick={() => setTheme('system')}
            className="flex w-full items-center gap-3 rounded-md px-8 py-1 font-semibold outline-none hover:bg-slate-300 hover:dark:bg-slate-700"
          >
            <Monitor className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            System
          </button>
          <button
            onClick={() => setTheme('light')}
            className="flex h-full w-full items-center gap-3 px-8 py-1 font-semibold hover:bg-slate-300 hover:dark:bg-slate-700"
          >
            <Sun className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="flex h-full w-full items-center gap-3 px-8 py-1 font-semibold hover:bg-slate-300 hover:dark:bg-slate-700"
          >
            <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            Dark
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}
