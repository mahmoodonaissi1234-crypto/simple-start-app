import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — The Suit Room" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-charcoal font-sans text-brand-cream">
      <Navbar />
      <CartDrawer />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-40 text-center">
        <h1 className="font-serif text-4xl">Checkout is on its way</h1>
        <p className="mt-4 text-brand-cream/60">
          The full multi-step checkout (shipping, payment, confirmation) is coming in the next build
          phase.
        </p>
        <Button asChild className="mt-8 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90">
          <Link to="/shop">← Back to shop</Link>
        </Button>
      </div>
    </div>
  );
}
