export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function daysUntil(value: string, today = new Date()): number {
  const end = new Date(`${value}T12:00:00`).getTime();
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  return Math.ceil((end - start) / 86400000);
}

export function formatDateInput(value: Date): string {
  return value.toISOString().slice(0, 10);
}
