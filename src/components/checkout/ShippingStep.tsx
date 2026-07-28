import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

const shippingSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  address: z.string().trim().min(4, "Enter a valid address"),
  city: z.string().trim().min(2, "Enter a city"),
  zip: z.string().trim().min(3, "Enter a valid postal code"),
  country: z.string().trim().min(2, "Enter a country"),
});

interface ShippingStepProps {
  initialValue: ShippingInfo;
  onContinue: (info: ShippingInfo) => void;
}

export function ShippingStep({ initialValue, onContinue }: ShippingStepProps) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  function update(field: keyof ShippingInfo, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = shippingSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ShippingInfo, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ShippingInfo;
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
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className="mt-1"
        />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={values.address}
          onChange={(e) => update("address", e.target.value)}
          className="mt-1"
        />
        {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            className="mt-1"
          />
          {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
        </div>
        <div>
          <Label htmlFor="zip">Postal code</Label>
          <Input
            id="zip"
            value={values.zip}
            onChange={(e) => update("zip", e.target.value)}
            className="mt-1"
          />
          {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={values.country}
          onChange={(e) => update("country", e.target.value)}
          className="mt-1"
        />
        {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90"
      >
        Continue to payment
      </Button>
    </form>
  );
}
