'use client'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="ml-2 w-48">
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 mb-1 text-slate-700 dark:text-slate-300"
      >
        Search coin
      </label>
      <Input
        {...props}
        value={value}
        name="search"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
