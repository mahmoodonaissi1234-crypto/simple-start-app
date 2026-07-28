import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShippingStep, type ShippingInfo } from "@/components/checkout/ShippingStep";
import { PaymentStep, type PaymentInfo } from "@/components/checkout/PaymentStep";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — The Suit Room" }],
  }),
  component: CheckoutPage,
});

const EMPTY_SHIPPING: ShippingInfo = {
  fullName: "",
  address: "",
  city: "",
  zip: "",
  country: "",
};

const EMPTY_PAYMENT: PaymentInfo = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function generateOrderNumber() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(EMPTY_SHIPPING);
  const [payment, setPayment] = useState(EMPTY_PAYMENT);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 && !orderNumber) {
      navigate({ to: "/shop" });
    }
  }, [items, orderNumber, navigate]);

  function handlePlaceOrder() {
    setOrderNumber(generateOrderNumber());
    clearCart();
  }

  if (orderNumber) {
    return (
      <div className="min-h-screen bg-brand-charcoal font-sans text-brand-cream">
        <Navbar />
        <OrderConfirmation orderNumber={orderNumber} />
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-brand-charcoal font-sans text-brand-cream">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <h1 className="mb-2 font-serif text-4xl">Checkout</h1>
        <Link
          to="/shop"
          className="mb-8 inline-block text-sm text-brand-cream/50 hover:text-brand-cream"
        >
          ← Back to shop
        </Link>

        <CheckoutProgress currentStep={step} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {step === 1 && (
                  <ShippingStep
                    initialValue={shipping}
                    onContinue={(info) => {
                      setShipping(info);
                      setStep(2);
                    }}
                  />
                )}
                {step === 2 && (
                  <PaymentStep
                    initialValue={payment}
                    onBack={() => setStep(1)}
                    onContinue={(info) => {
                      setPayment(info);
                      setStep(3);
                    }}
                  />
                )}
                {step === 3 && (
                  <ReviewStep
                    shipping={shipping}
                    payment={payment}
                    onBack={() => setStep(2)}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
