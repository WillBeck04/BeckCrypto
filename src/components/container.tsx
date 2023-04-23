import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="lg:mx-auto lg:max-w-7xl lg:px-6">{children}</div>
}
