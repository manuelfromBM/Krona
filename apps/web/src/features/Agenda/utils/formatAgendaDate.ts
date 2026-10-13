const WEEKDAY_MONTH = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
});

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function formatAgendaDate(isoDate: string): string {
  const date = startOfDay(new Date(`${isoDate}T00:00:00`));
  const today = startOfDay(new Date());
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Mañana";
  if (diffDays === -1) return "Ayer";

  return WEEKDAY_MONTH.format(date);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
