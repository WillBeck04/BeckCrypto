import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:w-[32rem]">
      {children}
    </div>
  )
}
