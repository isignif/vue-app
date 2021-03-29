export const moneyFmt = new Intl.NumberFormat("fr", {
  currency: "EUR",
  maximumSignificantDigits: 2,
  style: "currency",
});

export const dateFmt = new Intl.DateTimeFormat("fr");
