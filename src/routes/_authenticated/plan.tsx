import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PlanTier = "free" | "pro" | "premium";

const PLANS: { id: PlanTier; name: string; price: string; description: string; features: string[] }[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Get started with the essentials.",
    features: ["Basic features", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    description: "For growing individuals.",
    features: ["Everything in Free", "Priority support", "Advanced features"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29",
    description: "For teams that need it all.",
    features: ["Everything in Pro", "Unlimited usage", "Dedicated support"],
  },
];

export const Route = createFileRoute("/_authenticated/plan")({
  head: () => ({
    meta: [
      { title: "Choose your plan — Starter" },
      { name: "description", content: "Pick a pricing tier to continue." },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState<PlanTier | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(plan: PlanTier) {
    setError(null);
    setSaving(plan);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setSaving(null);
      setError("You must be signed in.");
      return;
    }
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ plan, updated_at: new Date().toISOString() })
      .eq("id", userData.user.id);
    setSaving(null);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Choose your plan</h1>
          <p className="mt-2 text-muted-foreground">Pick the tier that fits you best. You can change this later.</p>
        </div>

        {error && <p className="mt-6 text-center text-sm text-destructive">{error}</p>}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground"> / month</span>
                </div>
                <ul className="mb-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  onClick={() => choose(plan.id)}
                  disabled={saving !== null}
                >
                  {saving === plan.id ? "Saving…" : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
