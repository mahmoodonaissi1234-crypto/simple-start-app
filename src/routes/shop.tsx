import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCartStore } from "@/store/cart";
import { FITS, OCCASIONS, PRODUCTS, type Fit, type Occasion } from "@/data/products";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — The Suit Room" },
      { name: "description", content: "Browse the full collection of premium tailored suits." },
    ],
  }),
  component: ShopPage,
});

const MAX_PRICE = 650;

function ShopPage() {
  const reducedMotion = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [fits, setFits] = useState<Fit[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

  const allColors = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of PRODUCTS) {
      for (const c of p.colorOptions) seen.set(c.name, c.hex);
    }
    return Array.from(seen.entries());
  }, []);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (fits.length && !fits.includes(p.fit)) return false;
      if (occasions.length && !occasions.includes(p.occasion)) return false;
      if (colors.length && !p.colorOptions.some((c) => colors.includes(c.name))) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [fits, occasions, colors, priceRange]);

  function toggle<T>(list: T[], value: T, setter: (v: T[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const activeCount =
    fits.length + occasions.length + colors.length + (priceRange[1] < MAX_PRICE ? 1 : 0);

  return (
    <div className="min-h-screen bg-brand-charcoal font-sans text-brand-cream">
      <Navbar />
      <CartDrawer />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-gold">Collection</p>
            <h1 className="font-serif text-4xl">Shop All Suits</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setFiltersOpen((v) => !v)}
            className="gap-2 border-white/20 bg-transparent text-brand-cream hover:bg-white/10"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-brand-gold px-1.5 text-xs text-brand-charcoal">
                {activeCount}
              </span>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10 overflow-hidden rounded-lg border border-white/10 bg-black/20"
            >
              <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-wide text-brand-cream/50">Fit</p>
                  <div className="flex flex-wrap gap-2">
                    {FITS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => toggle(fits, f.value, setFits)}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          fits.includes(f.value)
                            ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                            : "border-white/20 text-brand-cream/70 hover:border-white/40"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-wide text-brand-cream/50">
                    Occasion
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OCCASIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => toggle(occasions, o.value, setOccasions)}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          occasions.includes(o.value)
                            ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                            : "border-white/20 text-brand-cream/70 hover:border-white/40"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-wide text-brand-cream/50">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map(([name, hex]) => (
                      <button
                        key={name}
                        onClick={() => toggle(colors, name, setColors)}
                        title={name}
                        style={{ backgroundColor: hex }}
                        className={`size-6 rounded-full border-2 transition-transform ${
                          colors.includes(name)
                            ? "scale-110 border-brand-gold"
                            : "border-white/20 hover:scale-105"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-wide text-brand-cream/50">
                    Price up to ${priceRange[1]}
                  </p>
                  <Slider
                    min={0}
                    max={MAX_PRICE}
                    step={10}
                    value={[priceRange[1]]}
                    onValueChange={([v]) => setPriceRange([0, v])}
                  />
                </div>
              </div>

              {activeCount > 0 && (
                <div className="border-t border-white/10 px-6 py-3">
                  <button
                    onClick={() => {
                      setFits([]);
                      setOccasions([]);
                      setColors([]);
                      setPriceRange([0, MAX_PRICE]);
                    }}
                    className="flex items-center gap-1 text-xs text-brand-cream/60 hover:text-brand-cream"
                  >
                    <X className="size-3" /> Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-black/20 transition-shadow hover:shadow-xl hover:shadow-black/40"
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{
                    background: `linear-gradient(160deg, ${product.colorOptions[0].hex}, #0b0b10)`,
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-1.5 p-4 transition-transform duration-300 group-hover:translate-y-0">
                    {product.colorOptions.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        style={{ backgroundColor: c.hex }}
                        className="size-4 rounded-full border border-white/30"
                      />
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-serif text-lg">{product.name}</p>
                    <p className="text-brand-gold">${product.price}</p>
                  </div>
                  <p className="mb-3 text-xs text-brand-cream/50">
                    {product.fabric} · {FITS.find((f) => f.value === product.fit)?.label}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-white/20 bg-transparent text-brand-cream hover:bg-white/10"
                    onClick={() =>
                      addItem(
                        product,
                        product.colorOptions[0].hex,
                        product.sizes[Math.floor(product.sizes.length / 2)],
                      )
                    }
                  >
                    Quick add
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-24 text-center text-brand-cream/50">No suits match those filters.</p>
        )}
      </div>
    </div>
  );
}
