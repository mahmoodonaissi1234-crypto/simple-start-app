import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const paymentSchema = z.object({
  cardName: z.string().trim().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .trim()
    .regex(/^\d{13,19}$/, "Enter a valid card number (digits only, demo — not processed)"),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

interface PaymentStepProps {
  initialValue: PaymentInfo;
  onContinue: (info: PaymentInfo) => void;
  onBack: () => void;
}

export function PaymentStep({ initialValue, onContinue, onBack }: PaymentStepProps) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentInfo, string>>>({});

  function update(field: keyof PaymentInfo, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = paymentSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PaymentInfo, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof PaymentInfo;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onContinue(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="rounded-md border border-brand-gold/30 bg-brand-gold/10 px-3 py-2 text-xs text-brand-gold">
        Demo checkout — no real payment is processed.
      </p>
      <div>
        <Label htmlFor="cardName">Name on card</Label>
        <Input
          id="cardName"
          value={values.cardName}
          onChange={(e) => update("cardName", e.target.value)}
          className="mt-1"
        />
        {errors.cardName && <p className="mt-1 text-xs text-destructive">{errors.cardName}</p>}
      </div>
      <div>
        <Label htmlFor="cardNumber">Card number</Label>
        <Input
          id="cardNumber"
          inputMode="numeric"
          placeholder="4242424242424242"
          value={values.cardNumber}
          onChange={(e) => update("cardNumber", e.target.value)}
          className="mt-1"
        />
        {errors.cardNumber && <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">Expiry</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={values.expiry}
            onChange={(e) => update("expiry", e.target.value)}
            className="mt-1"
          />
          {errors.expiry && <p className="mt-1 text-xs text-destructive">{errors.expiry}</p>}
        </div>
        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            inputMode="numeric"
            value={values.cvc}
            onChange={(e) => update("cvc", e.target.value)}
            className="mt-1"
          />
          {errors.cvc && <p className="mt-1 text-xs text-destructive">{errors.cvc}</p>}
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 border-white/20 bg-transparent text-brand-cream hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
        >
          Review order
        </Button>
      </div>
    </form>
  );
}
