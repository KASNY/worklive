import type { Asset } from "@/lib/assets-data";

export type WarrantyStatus = "Aktywna" | "Kończy się" | "Wygasła" | "Brak";

const DAY = 24 * 60 * 60 * 1000;

export function getWarrantyStatus(asset: Asset, now = new Date()): WarrantyStatus {
  if (!asset.warrantyUntil) return "Brak";
  const end = new Date(`${asset.warrantyUntil}T23:59:59`);
  const days = Math.ceil((end.getTime() - now.getTime()) / DAY);
  if (days < 0) return "Wygasła";
  if (days <= 90) return "Kończy się";
  return "Aktywna";
}

export function getWarrantyDaysLeft(asset: Asset, now = new Date()) {
  if (!asset.warrantyUntil) return null;
  return Math.max(
    0,
    Math.ceil((new Date(`${asset.warrantyUntil}T23:59:59`).getTime() - now.getTime()) / DAY),
  );
}
