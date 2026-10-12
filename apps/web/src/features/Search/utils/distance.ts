// Convierte textos mock como "A 450 m" o "A 1,8 km" a metros.
export function distanceToMeters(distance?: string): number | null {
  if (!distance) return null;
  const normalized = distance.toLowerCase().replace("a", "").trim();
  const value = Number.parseFloat(normalized.replace(",", "."));
  if (Number.isNaN(value)) return null;
  return normalized.includes("km") ? value * 1000 : value;
}
