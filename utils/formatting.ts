export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).substring(2);

  return `${day}-${month}-${year}`;
}

export function getFormattedTanzaniaTime() {
  const tanzaniaTime = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Dar_es_Salaam",
  });
  return new Date(tanzaniaTime);
}

export function formatDateForLeadsTable(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    timeZone: "Africa/Dar_es_Salaam",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function formatDateForProject(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    timeZone: "Africa/Dar_es_Salaam",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateToTimeZone(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    timeZone: "Africa/Dar_es_Salaam",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("en-tz", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 1,
  });

  if (amount >= 1_000_000) {
    return formatter.format(amount / 1_000_000) + "M";
  } else if (amount >= 1_000) {
    return formatter.format(amount / 1_000) + "K";
  }
  return formatter.format(amount);
}