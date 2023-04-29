import type { CryptoData } from '@/lib/getCryptoData'
import { Table } from '@tanstack/table-core'
import {
  BoxSelect,
  CheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Input } from './ui/input'
import { Listbox } from '@headlessui/react'

export function Pagination({ table }: { table: Table<CryptoData[number]> }) {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="space-x-2 font-semibold">
        <button
          className="rounded border border-slate-200 bg-slate-100 p-1 text-slate-700 hover:bg-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-400/10"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <div className="flex">
            <ChevronLeft className="h-5 w-5" />{' '}
            <ChevronLeft className="-ml-2 h-5 w-5" />
          </div>
        </button>
        <button
          className="w-8 rounded border border-slate-200 bg-slate-100 p-1  text-slate-700 hover:bg-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-400/10"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="w-8 rounded border border-slate-200 bg-slate-100 p-1 text-slate-700 hover:bg-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-400/10"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          className="rounded border border-slate-200 bg-slate-100 p-1 text-slate-700 hover:bg-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-400/10"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <div className="flex">
            <ChevronRight className="h-5 w-5" />{' '}
            <ChevronRight className="-ml-2 h-5 w-5" />
          </div>
        </button>
      </div>

      <div className="mt-6 flex w-full items-center justify-between text-sm lg:mt-0">
        <div>
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-100">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="mt-3 hidden lg:block">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-100">
              Go to page:
              <Input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                min={0}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="ml-3 w-16 rounded-md border p-1 dark:bg-slate-800"
              />
            </span>
          </div>
        </div>
        <RowsSelector table={table} />
      </div>
    </div>
  )
}

function RowsSelector({ table }: { table: Table<CryptoData[number]> }) {
  return (
    <div>
      <label className="text-sm">Show rows</label>
      <Listbox
        value={table.getState().pagination.pageSize}
        onChange={(value) => {
          table.setPageSize(Number(value))
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-800 sm:text-sm">
            <span className="block truncate">
              {table.getState().pagination.pageSize}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
              <ChevronDown className="h-5 w-5" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute right-10 z-10 mt-1 max-h-60 w-28 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 sm:text-sm">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <Listbox.Option
                key={pageSize}
                value={pageSize}
                className={({ active }) =>
                  `${
                    active
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-900 dark:text-slate-100'
                  } relative cursor-default select-none py-2 pl-10 pr-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-semibold' : 'font-normal'
                      } block truncate`}
                    >
                      {pageSize}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-white' : 'text-indigo-500'
                        } absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}
