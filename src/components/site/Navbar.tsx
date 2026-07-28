import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useAnimationControls } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (reducedMotion) {
        controls.set({ y: 0 });
      } else if (y > lastY.current && y > 120) {
        controls.start({ y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } });
      } else {
        controls.start({ y: 0, transition: { duration: 0.3, ease: "easeInOut" } });
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, reducedMotion]);

  return (
    <motion.header
      animate={controls}
      initial={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-charcoal/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif text-xl tracking-wide text-brand-cream">
          THE SUIT ROOM
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm tracking-wide text-brand-cream/70 transition-colors hover:text-brand-gold"
              activeProps={{ className: "text-brand-gold" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-sm tracking-wide text-brand-cream/70 transition-colors hover:text-brand-gold"
          >
            Sign in
          </Link>
        </div>
        <button
          onClick={openCart}
          className="relative flex items-center gap-2 text-brand-cream/90 transition-colors hover:text-brand-gold"
          aria-label="Open cart"
        >
          <ShoppingBag className="size-5" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-medium text-brand-charcoal">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </motion.header>
  );
}
