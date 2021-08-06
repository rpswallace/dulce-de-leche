export const applyCurrencyFormat = (number) => {
  if (number) {
    return new Intl.NumberFormat('en-US').format(number)
  } else {
    return 0
  }
}
