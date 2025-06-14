export type Skip = {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  imageUrl?: string;
};

export interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
