export type Fit = "slim" | "classic" | "tailored";
export type Occasion = "business" | "wedding" | "formal";

export interface ColorOption {
  name: string;
  hex: string;
  /**
   * PLACEHOLDER: no real per-color texture/material assets exist yet.
   * Swap in real fabric texture maps (albedo/normal/roughness) here once
   * photogrammetry-scanned suit assets are available.
   */
  textureUrl: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  fabric: string;
  fit: Fit;
  occasion: Occasion;
  colorOptions: ColorOption[];
  sizes: string[];
  description: string;
  /**
   * PLACEHOLDER: no real .glb model exists yet — the product viewer falls
   * back to a procedural low-poly mannequin. Swap in a real
   * photogrammetry-scanned .glb at this path once available.
   */
  modelUrl: string | null;
  thumbnailUrl: string | null;
  images: string[];
}

export const FITS: { value: Fit; label: string }[] = [
  { value: "slim", label: "Slim" },
  { value: "classic", label: "Classic" },
  { value: "tailored", label: "Tailored" },
];

export const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: "business", label: "Business" },
  { value: "wedding", label: "Wedding" },
  { value: "formal", label: "Formal" },
];

export const PRODUCTS: Product[] = [
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    price: 449,
    fabric: "Italian wool twill",
    fit: "slim",
    occasion: "business",
    colorOptions: [
      { name: "Midnight Navy", hex: "#16213e", textureUrl: null },
      { name: "Ink Black", hex: "#111214", textureUrl: null },
    ],
    sizes: ["36R", "38R", "40R", "42R", "44R"],
    description:
      "A sharp two-button navy suit cut for a modern silhouette. Half-canvassed construction.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "charcoal-classic",
    name: "Charcoal Classic",
    price: 399,
    fabric: "Wool-blend flannel",
    fit: "classic",
    occasion: "business",
    colorOptions: [
      { name: "Charcoal", hex: "#36454f", textureUrl: null },
      { name: "Slate Grey", hex: "#4a5560", textureUrl: null },
    ],
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
    description: "The everyday power suit. Soft flannel with just enough stretch for long days.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "burgundy-statement",
    name: "Burgundy Statement",
    price: 519,
    fabric: "Velvet-finish wool",
    fit: "tailored",
    occasion: "formal",
    colorOptions: [{ name: "Burgundy", hex: "#5e2129", textureUrl: null }],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "A bold single-breasted cut for evenings that call for attention.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "sandstone-linen",
    name: "Sandstone Linen",
    price: 379,
    fabric: "Breathable linen blend",
    fit: "slim",
    occasion: "wedding",
    colorOptions: [
      { name: "Sandstone", hex: "#c2a878", textureUrl: null },
      { name: "Ivory", hex: "#ece4d3", textureUrl: null },
    ],
    sizes: ["36R", "38R", "40R", "42R"],
    description: "Lightweight and unlined, built for warm-weather occasions.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "onyx-black",
    name: "Onyx Black",
    price: 469,
    fabric: "Super 120s wool",
    fit: "tailored",
    occasion: "formal",
    colorOptions: [{ name: "Onyx", hex: "#111214", textureUrl: null }],
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
    description:
      "The formal essential. Peak lapels, a fully canvassed jacket, and a razor-sharp break.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "forest-tweed",
    name: "Forest Tweed",
    price: 429,
    fabric: "Donegal tweed",
    fit: "classic",
    occasion: "business",
    colorOptions: [{ name: "Forest", hex: "#2f4538", textureUrl: null }],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "Textured tweed with a flecked weave, built for cooler seasons.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "dove-grey-wedding",
    name: "Dove Grey",
    price: 489,
    fabric: "Mohair-wool blend",
    fit: "tailored",
    occasion: "wedding",
    colorOptions: [{ name: "Dove Grey", hex: "#9a9a92", textureUrl: null }],
    sizes: ["36R", "38R", "40R", "42R", "44R"],
    description: "A soft-shouldered wedding suit with a subtle sheen for photographs.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "bronze-tuxedo",
    name: "Bronze Tuxedo",
    price: 599,
    fabric: "Satin-lapel wool",
    fit: "tailored",
    occasion: "formal",
    colorOptions: [{ name: "Bronze Black", hex: "#1c1a17", textureUrl: null }],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "Satin peak lapels and a bronze-black weave for black-tie evenings.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "cobalt-business",
    name: "Cobalt Business",
    price: 439,
    fabric: "Performance wool stretch",
    fit: "slim",
    occasion: "business",
    colorOptions: [{ name: "Cobalt", hex: "#22385f", textureUrl: null }],
    sizes: ["36R", "38R", "40R", "42R"],
    description: "A travel-friendly stretch wool suit that resists creasing all day.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "chestnut-check",
    name: "Chestnut Check",
    price: 409,
    fabric: "Windowpane check wool",
    fit: "classic",
    occasion: "business",
    colorOptions: [{ name: "Chestnut", hex: "#5a3d2b", textureUrl: null }],
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    description: "A subtle windowpane check over warm chestnut, cut with classic proportions.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "ivory-linen-wedding",
    name: "Ivory Linen",
    price: 419,
    fabric: "Textured linen",
    fit: "slim",
    occasion: "wedding",
    colorOptions: [{ name: "Ivory", hex: "#ece4d3", textureUrl: null }],
    sizes: ["36R", "38R", "40R", "42R"],
    description: "A destination-wedding staple: breathable, unstructured, and unlined.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
  {
    id: "steel-blue-formal",
    name: "Steel Blue",
    price: 459,
    fabric: "Sharkskin wool",
    fit: "tailored",
    occasion: "formal",
    colorOptions: [{ name: "Steel Blue", hex: "#2c3e52", textureUrl: null }],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "A light-reactive sharkskin weave that shifts from grey to blue in motion.",
    modelUrl: null,
    thumbnailUrl: null,
    images: [],
  },
];
