import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Scissors, Leaf, Ruler, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { HeroSuitModel } from "@/components/site/HeroSuitModel";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Suit Room — Premium Men's Suits" },
      { name: "description", content: "A luxury digital showroom for premium tailored suits." },
    ],
  }),
  component: LandingPage,
});

const headlineWords = ["Tailored.", "Timeless.", "Yours."];

const VALUE_PROPS = [
  {
    icon: Scissors,
    title: "Hand-finished tailoring",
    body: "Every jacket is finished by hand, from the lapel roll to the buttonholes.",
  },
  {
    icon: Ruler,
    title: "Fit guarantee",
    body: "Free alterations within 30 days if the fit isn't exactly right.",
  },
  {
    icon: Leaf,
    title: "Responsibly sourced",
    body: "Wool and linen sourced from mills committed to sustainable practice.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime care",
    body: "Complimentary pressing and minor repairs for as long as you own the suit.",
  },
];

function LandingPage() {
  const reducedMotion = useReducedMotion();
  const craftRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-40, 40]);

  return (
    <div className="bg-brand-charcoal font-sans text-brand-cream">
      <Navbar />
      <CartDrawer />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-navy/40 to-brand-charcoal" />
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
          <HeroSuitModel />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-gold"
            >
              The Suit Room
            </motion.p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: reducedMotion ? 0 : i * 0.15 }}
                  className="mr-4 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.55 }}
              className="mt-6 max-w-md text-lg text-brand-cream/70"
            >
              Premium, made-to-measure suits for the moments that matter — cut in small batches,
              finished by hand.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.7 }}
              className="mt-8 flex gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
              >
                <Link to="/shop">Shop the collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-cream/30 bg-transparent text-brand-cream hover:bg-brand-cream/10"
              >
                <a href="#craftsmanship">Our craftsmanship</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl px-6 py-28"
      >
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Collection</h2>
          <Link to="/shop" className="text-sm text-brand-gold hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.08 }}
            >
              <Link
                to="/shop/$productId"
                params={{ productId: product.id }}
                className="group block"
              >
                <div
                  className="mb-4 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(160deg, ${product.colorOptions[0].hex}, #0b0b10)`,
                  }}
                />
                <p className="font-serif text-lg">{product.name}</p>
                <p className="text-sm text-brand-cream/50">${product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <section className="border-y border-white/5 bg-black/20 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center font-serif text-3xl md:text-4xl"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.1 }}
                className="text-center"
              >
                <prop.icon className="mx-auto mb-4 size-8 text-brand-gold" />
                <h3 className="mb-2 font-serif text-lg">{prop.title}</h3>
                <p className="text-sm text-brand-cream/60">{prop.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section id="craftsmanship" ref={craftRef} className="overflow-hidden py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">Craftsmanship</p>
            <h2 className="mb-6 font-serif text-3xl md:text-4xl">Built by hand, fitted to you</h2>
            <p className="max-w-md text-brand-cream/70">
              Every suit passes through the hands of a single tailor from cut to finish — over 80
              individual steps, half-canvassed by hand, pressed three times before it ever reaches
              you.
            </p>
          </motion.div>
          <motion.div
            style={{ y: parallaxY }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-charcoal to-black" />
            <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,theme(colors.brand-gold)_0,theme(colors.brand-gold)_1px,transparent_1px,transparent_12px)]" />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-brand-cream/40">
        © {new Date().getFullYear()} The Suit Room. All rights reserved.
      </footer>
    </div>
  );
}
