const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function moneyFormat(price: number) {
  return `$${formatter.format(price)}`
}
