export const PACKAGING_TYPES = ["caixa", "fardo", "pacote"] as const;
export type PackagingType = (typeof PACKAGING_TYPES)[number];

export interface IPackaging {
  primary_type: PackagingType;
  secondary_type?: PackagingType;
  secondary_qty?: number;
  unit_type: string;
  unit_qty: number;
}
