import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface OrderConfirmationProps {
  orderNumber: string;
  email?: string;
}

export function OrderConfirmation({ orderNumber, email }: OrderConfirmationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center px-6 py-24 text-center">
      <div className="relative mb-8 flex size-24 items-center justify-center">
        {!reducedMotion && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-gold/40"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-gold/40"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
          </>
        )}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: reducedMotion ? 0 : 0.1,
          }}
          className="flex size-24 items-center justify-center rounded-full bg-brand-gold"
        >
          <svg viewBox="0 0 24 24" className="size-10" fill="none">
            <motion.path
              d="M4 12.5L9.5 18L20 6"
              stroke="#19181c"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.35,
                ease: "easeOut",
              }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.5, duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl">Order confirmed</h1>
        <p className="mt-3 text-brand-cream/60">
          Thank you{email ? `, we've sent a confirmation to ${email}` : ""}. Your order{" "}
          <span className="text-brand-gold">#{orderNumber}</span> is being prepared.
        </p>
        <Button asChild className="mt-8 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </motion.div>
    </div>
  );
}
