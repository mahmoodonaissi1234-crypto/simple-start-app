import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ShippingInfo } from "@/components/checkout/ShippingStep";
import type { PaymentInfo } from "@/components/checkout/PaymentStep";

interface ReviewStepProps {
  shipping: ShippingInfo;
  payment: PaymentInfo;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function ReviewStep({ shipping, payment, onBack, onPlaceOrder }: ReviewStepProps) {
  const [placing, setPlacing] = useState(false);

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(onPlaceOrder, 700);
  }

  const maskedCard = payment.cardNumber.slice(-4).padStart(payment.cardNumber.length, "•");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-brand-cream/50">Shipping to</p>
        <p className="text-sm">{shipping.fullName}</p>
        <p className="text-sm text-brand-cream/70">
          {shipping.address}, {shipping.city} {shipping.zip}
        </p>
        <p className="text-sm text-brand-cream/70">{shipping.country}</p>
      </div>
      <div className="rounded-lg border border-white/10 p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-brand-cream/50">Payment</p>
        <p className="text-sm">{payment.cardName}</p>
        <p className="text-sm text-brand-cream/70">Card ending in {maskedCard.slice(-4)}</p>
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={placing}
          className="flex-1 border-white/20 bg-transparent text-brand-cream hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={placing}
          size="lg"
          className="flex-1 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
        >
          {placing ? "Placing order…" : "Place order"}
        </Button>
      </div>
    </div>
  );
}
