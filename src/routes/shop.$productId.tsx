import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductViewer } from "@/components/product/ProductViewer";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { PRODUCTS, FITS } from "@/data/products";
import { useCartStore } from "@/store/cart";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — The Suit Room` },
          { name: "description", content: loaderData.description },
        ]
      : [],
  }),
  component: ProductDetailPage,
});

/**
 * PLACEHOLDER photo angles: solid gradient panels standing in for real
 * product photography. Replace with actual shot images once available.
 */
function photoGradients(hex: string) {
  return [
    `linear-gradient(160deg, ${hex}, #0b0b10)`,
    `linear-gradient(200deg, ${hex}, #0b0b10 80%)`,
    `linear-gradient(20deg, ${hex}, #1a1a1f)`,
  ];
}

function ProductDetailPage() {
  const product = Route.useLoaderData();
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[Math.floor(product.sizes.length / 2)],
  );
  const [viewMode, setViewMode] = useState<"3d" | "photos">("3d");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  function handleAddToCart() {
    addItem(product, selectedColor.hex, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="min-h-screen bg-brand-charcoal font-sans text-brand-cream">
      <Navbar />
      <CartDrawer />
      <SizeGuideModal open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Viewer */}
          <div>
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setViewMode("3d")}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                  viewMode === "3d"
                    ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                    : "border-white/20 text-brand-cream/70 hover:border-white/40"
                }`}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode("photos")}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                  viewMode === "photos"
                    ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                    : "border-white/20 text-brand-cream/70 hover:border-white/40"
                }`}
              >
                Photos
              </button>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <AnimatePresence mode="wait">
                {viewMode === "3d" ? (
                  <motion.div
                    key="3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <ProductViewer
                      color={selectedColor.hex}
                      trouserColor={product.colorOptions[0].hex}
                      fallbackGradient={photoGradients(selectedColor.hex)[0]}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 grid grid-cols-3 gap-1 p-1"
                  >
                    {photoGradients(selectedColor.hex).map((bg, i) => (
                      <div key={i} className="rounded-md" style={{ background: bg }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {viewMode === "3d" && (
              <p className="mt-3 text-center text-xs text-brand-cream/40">
                Drag to rotate · Scroll to zoom
              </p>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-gold">
              {FITS.find((f) => f.value === product.fit)?.label} Fit
            </p>
            <h1 className="font-serif text-4xl">{product.name}</h1>
            <p className="mt-2 text-2xl text-brand-gold">${product.price}</p>
            <p className="mt-4 max-w-md text-brand-cream/70">{product.description}</p>
            <p className="mt-2 text-sm text-brand-cream/40">{product.fabric}</p>

            {/* Color selector */}
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-wide text-brand-cream/50">
                Color — {selectedColor.name}
              </p>
              <div className="flex gap-2">
                {product.colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                    className={`size-9 rounded-full border-2 transition-transform ${
                      selectedColor.name === c.name
                        ? "scale-110 border-brand-gold"
                        : "border-white/20 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-brand-cream/50">Size</p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-brand-gold hover:underline"
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      selectedSize === size
                        ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                        : "border-white/20 text-brand-cream/70 hover:border-white/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <motion.div className="mt-10" whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full gap-2 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {justAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="size-4" /> Added to bag
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={justAdded ? { scale: [1, 1.3, 1] } : {}}
                        className="flex items-center"
                      >
                        <ShoppingBag className="size-4" />
                      </motion.span>
                      Add to cart — ${product.price}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-28">
          <h2 className="mb-8 font-serif text-2xl">You may also like</h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {related.map((p) => (
                <CarouselItem key={p.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
                  <Link to="/shop/$productId" params={{ productId: p.id }} className="group block">
                    <div
                      className="mb-3 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(160deg, ${p.colorOptions[0].hex}, #0b0b10)`,
                      }}
                    />
                    <p className="font-serif text-base">{p.name}</p>
                    <p className="text-sm text-brand-cream/50">${p.price}</p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-white/20 bg-black/40 text-brand-cream hover:bg-black/60" />
            <CarouselNext className="border-white/20 bg-black/40 text-brand-cream hover:bg-black/60" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
