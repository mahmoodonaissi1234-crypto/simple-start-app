import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const close = useCartStore((s) => s.close);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-brand-charcoal text-brand-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-serif text-xl">Your Bag</h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="text-brand-cream/60 hover:text-brand-cream"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-8 text-center text-sm text-brand-cream/50">Your bag is empty.</p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item, index) => (
                    <li
                      key={`${item.product.id}-${item.color}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div
                        className="size-16 shrink-0 rounded-md border border-white/10"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-brand-cream/40 hover:text-brand-cream"
                            aria-label="Remove item"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-brand-cream/50">Size {item.size}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/15 px-2 py-1">
                            <button
                              onClick={() => setQuantity(index, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="text-brand-cream/70 hover:text-brand-cream"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-4 text-center text-xs">{item.quantity}</span>
                            <button
                              onClick={() => setQuantity(index, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="text-brand-cream/70 hover:text-brand-cream"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <p className="text-sm text-brand-gold">
                            ${item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-brand-cream/60">Subtotal</span>
                <span className="font-medium">${totalPrice}</span>
              </div>
              {items.length === 0 ? (
                <Button className="w-full bg-brand-gold text-brand-charcoal" disabled>
                  Checkout
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
                >
                  <Link to="/checkout" onClick={close}>
                    Checkout
                  </Link>
                </Button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
