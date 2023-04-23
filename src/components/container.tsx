import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="py-6 lg:mx-auto lg:max-w-7xl lg:px-6 px-3 lg:py-12">
      {children}
    </div>
  )
}
