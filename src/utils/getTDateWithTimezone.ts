export const getTDateWithTimezone = (date) => {
  if (!date) return
  let tzOffset = new Date().getTimezoneOffset() * 60000
  return new Date(new Date(date) - tzOffset).toISOString().slice(0, -1)
}
