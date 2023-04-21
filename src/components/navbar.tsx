import { ThemeSwitch } from "./theme-switch";
import { Menu } from "lucide-react";
import { InfoNav } from "./info-nav";

export function Navbar() {
  return (
    <header className="border-b dark:border-slate-800 border-slate-200">
      <div className="flex flex-col lg:flex-col-reverse">
        <div className="lg:max-w-7xl lg:mx-auto w-full">
          <nav className="w-full flex justify-between border-b dark:border-slate-800 border-slate-200 lg:border-none py-5 px-4 lg:px-0">
            <p className="font-bold text-xl">Crypto App</p>
            <button className="lg:hidden">
              <Menu />
            </button>
          </nav>
        </div>
        <div className="w-full border-b dark:border-slate-800 border-slate-200">
          <div className="lg:max-w-7xl lg:mx-auto flex justify-between items-center">
            {/* @ts-expect-error Async Server Component */}
            <InfoNav />
            <div className="hidden lg:block">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
