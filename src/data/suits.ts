export interface Suit {
  id: string;
  name: string;
  price: number;
  fabricColor: string;
  trouserColor: string;
  fabric: string;
  description: string;
}

export const SUITS: Suit[] = [
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    price: 449,
    fabricColor: "#16213e",
    trouserColor: "#0f172a",
    fabric: "Italian wool twill",
    description:
      "A sharp two-button navy suit cut for a modern silhouette. Half-canvassed construction.",
  },
  {
    id: "charcoal-classic",
    name: "Charcoal Classic",
    price: 399,
    fabricColor: "#36454f",
    trouserColor: "#2b3540",
    fabric: "Wool-blend flannel",
    description: "The everyday power suit. Soft flannel with just enough stretch for long days.",
  },
  {
    id: "burgundy-statement",
    name: "Burgundy Statement",
    price: 519,
    fabricColor: "#5e2129",
    trouserColor: "#3a1418",
    fabric: "Velvet-finish wool",
    description: "A bold single-breasted cut for evenings that call for attention.",
  },
  {
    id: "sandstone-linen",
    name: "Sandstone Linen",
    price: 379,
    fabricColor: "#c2a878",
    trouserColor: "#a68a5f",
    fabric: "Breathable linen blend",
    description: "Lightweight and unlined, built for warm-weather occasions.",
  },
  {
    id: "onyx-black",
    name: "Onyx Black",
    price: 469,
    fabricColor: "#111214",
    trouserColor: "#0a0a0b",
    fabric: "Super 120s wool",
    description:
      "The formal essential. Peak lapels, a fully canvassed jacket, and a razor-sharp break.",
  },
  {
    id: "forest-tweed",
    name: "Forest Tweed",
    price: 429,
    fabricColor: "#2f4538",
    trouserColor: "#22322a",
    fabric: "Donegal tweed",
    description: "Textured tweed with a flecked weave, built for cooler seasons.",
  },
];
