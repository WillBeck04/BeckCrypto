import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="lg:max-w-7xl lg:mx-auto">{children}</div>;
}
