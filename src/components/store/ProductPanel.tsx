import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Suit } from "@/data/suits";

interface ProductPanelProps {
  suit: Suit | null;
  onClose: () => void;
}

export function ProductPanel({ suit, onClose }: ProductPanelProps) {
  return (
    <AnimatePresence>
      {suit && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="pointer-events-auto absolute right-4 top-4 bottom-4 w-full max-w-sm overflow-y-auto rounded-xl border border-white/10 bg-black/70 p-6 text-white backdrop-blur-md"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="mb-4 h-20 w-20 rounded-lg border border-white/10"
            style={{ backgroundColor: suit.fabricColor }}
          />
          <h2 className="text-2xl font-semibold">{suit.name}</h2>
          <p className="mt-1 text-lg text-white/80">${suit.price}</p>
          <p className="mt-1 text-sm uppercase tracking-wide text-white/40">{suit.fabric}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{suit.description}</p>
          <Button
            className="mt-6 w-full"
            onClick={() => toast.success(`${suit.name} added to cart`)}
          >
            Add to cart — ${suit.price}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
