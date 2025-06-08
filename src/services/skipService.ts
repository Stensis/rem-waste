export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export const getSkipsByLocation = async (
  postcode: string,
  area: string
): Promise<Skip[]> => {
  const response = await fetch(
    `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
  );
  if (!response.ok) throw new Error("Failed to fetch skips");
  return response.json();
};
