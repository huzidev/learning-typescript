// undefined so currency wil be shown according to user's location 
const CURRENCY_FORAMTTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency"
})

export function FormatCurrency(number: number) {
  return (
    CURRENCY_FORAMTTER.format(number)
  )
}
