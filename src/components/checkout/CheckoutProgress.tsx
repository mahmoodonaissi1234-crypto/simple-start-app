import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = ["Shipping", "Payment", "Review"];

interface CheckoutProgressProps {
  currentStep: number;
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="mb-12 flex items-center">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const complete = step < currentStep;
        const active = step === currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex size-9 items-center justify-center rounded-full border text-sm transition-colors ${
                  complete || active
                    ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                    : "border-white/20 text-brand-cream/50"
                }`}
              >
                {complete ? <Check className="size-4" /> : step}
              </div>
              <span className={`text-xs ${active ? "text-brand-cream" : "text-brand-cream/40"}`}>
                {label}
              </span>
            </div>
            {step < STEPS.length && (
              <div className="mx-3 mb-5 h-px flex-1 bg-white/10">
                <motion.div
                  className="h-full bg-brand-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: complete ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
