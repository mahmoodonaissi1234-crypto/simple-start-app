import type { CartItem } from "@/store/cart";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

const SHIPPING = 0;

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-6">
      <h2 className="mb-5 font-serif text-lg">Order Summary</h2>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={`${item.product.id}-${item.color}-${item.size}-${i}`} className="flex gap-3">
            <div
              className="size-12 shrink-0 rounded-md border border-white/10"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 text-sm">
              <div className="flex justify-between">
                <span>{item.product.name}</span>
                <span className="text-brand-cream/70">${item.product.price * item.quantity}</span>
              </div>
              <p className="text-xs text-brand-cream/40">
                Size {item.size} · Qty {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-brand-cream/60">
          <span>Subtotal</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-brand-cream/60">
          <span>Shipping</span>
          <span>{SHIPPING === 0 ? "Free" : `$${SHIPPING}`}</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2 text-base font-medium">
          <span>Total</span>
          <span className="text-brand-gold">${totalPrice + SHIPPING}</span>
        </div>
      </div>
    </div>
  );
}
