import { ThemeSwitch } from "./theme-switch";
import { InfoNav } from "./info-nav";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b dark:border-slate-800 border-slate-200">
      <div className="flex flex-col lg:flex-col-reverse">
        <div className="lg:max-w-7xl lg:px-6 lg:mx-auto w-full">
          <nav className="w-full flex items-center lg:items-baseline lg:justify-normal justify-between border-b dark:border-slate-800 border-slate-200 lg:border-none py-8 px-4 lg:px-0">
            <h3 className="font-bold text-xl">Cryptosito</h3>
            <ul className="hidden lg:flex text-sm font-medium ml-12">
              <li>
                <Link href="/">Currencies</Link>
              </li>
            </ul>
            <MobileMenu />
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
