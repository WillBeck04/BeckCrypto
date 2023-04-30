'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { Fragment, ReactNode, useState } from 'react'
import { ThemeSwitch } from './theme-switch'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function MobileMenu() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const router = useRouter()

  return (
    <div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="group inline-flex items-center justify-center rounded-lg border border-slate-300 p-1.5  dark:border-slate-600 dark:text-slate-500"
          onClick={() => setMobileMenu(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu
            className="h-6 w-6 text-slate-600 dark:text-slate-500"
            aria-hidden="true"
          />
        </button>
      </div>
      <Transition appear show={mobileMenu} as={Fragment}>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenu}
          onClose={setMobileMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="fixed inset-x-4 top-8 z-50 origin-top scale-100 rounded-3xl bg-white p-8 opacity-100 ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-800">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="-m-2.5 rounded-md border border-slate-300 bg-slate-200 p-1.5 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200  dark:hover:border-slate-500"
                  onClick={() => setMobileMenu(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X
                    className="h-6 w-6 text-slate-600 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="flow-root">
                <div>
                  <MenuLink closeMenu={() => setMobileMenu(false)} href="/">
                    Currencies
                  </MenuLink>
                  <MenuLink
                    closeMenu={() => setMobileMenu(false)}
                    href="/watchlist"
                  >
                    Watchlist
                  </MenuLink>
                  <MenuLink
                    closeMenu={() => setMobileMenu(false)}
                    href="/portfolio"
                  >
                    Portfolio
                  </MenuLink>
                  <div className="mt-3">
                    <ThemeSwitch />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}

function MenuLink({
  children,
  href,
  closeMenu,
}: {
  children: ReactNode
  href: string
  closeMenu: () => void
}) {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="-mx-3 block rounded-md border-b border-slate-200 px-3 py-2 text-sm font-medium leading-8 text-slate-800 dark:border-slate-800 dark:text-slate-200"
    >
      {children}
    </Link>
  )
}
