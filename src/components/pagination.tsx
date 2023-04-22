import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ table }: any) {
  return (
    <div className="flex flex-col px-4 mt-6 items-center justify-between gap-2">
      <div className="space-x-2 font-semibold">
        <button
          className="border rounded p-1 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10 dark:text-slate-300 text-slate-700 dark:border-slate-700 border-slate-200 bg-slate-100 dark:bg-slate-800"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <div className="flex">
            <ChevronLeft className="w-5 h-5" />{" "}
            <ChevronLeft className="w-5 h-5 -ml-2" />
          </div>
        </button>
        <button
          className="border rounded p-1 w-8 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10  dark:text-slate-300 text-slate-700 dark:border-slate-700 border-slate-200 bg-slate-100 dark:bg-slate-800"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="border rounded p-1 w-8 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10 dark:text-slate-300 text-slate-700 dark:border-slate-700 border-slate-200 bg-slate-100 dark:bg-slate-800"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          className="border rounded p-1 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10 dark:text-slate-300 text-slate-700 dark:border-slate-700 border-slate-200 bg-slate-100 dark:bg-slate-800"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <div className="flex">
            <ChevronRight className="w-5 h-5" />{" "}
            <ChevronRight className="w-5 h-5 -ml-2" />
          </div>
        </button>
      </div>

      <div className="flex mt-6 lg:mt-0 w-full text-sm justify-between items-center">
        <div>
          <span className="flex items-center dark:text-slate-300 text-slate-700 gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="hidden lg:block mt-3">
            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16 ml-3"
              />
            </span>
          </div>
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 rounded-md"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
