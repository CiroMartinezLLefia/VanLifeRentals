export const formatDailyPrice = (pricePerDay: number, currency = "EUR") => {
  const formatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(pricePerDay);

  return `${formatted} / dia`;
};
