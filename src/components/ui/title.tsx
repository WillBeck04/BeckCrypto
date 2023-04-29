import { ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-medium lg:text-2xl">{children}</h3>
}
