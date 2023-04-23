import { CryptoData } from '@/utils/getCryptoData'
import { Table } from '@tanstack/table-core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from './ui/input'

export function Pagination({ table }: { table: Table<CryptoData> }) {
  return (
    <div className="flex flex-col items-center justify-between gap-2 px-4">
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
        <div>
          <label className="text-sm">Show rows</label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="ml-3 rounded-md border-indigo-500 px-4 py-1 text-sm focus:ring focus:ring-indigo-400 dark:bg-slate-800"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
