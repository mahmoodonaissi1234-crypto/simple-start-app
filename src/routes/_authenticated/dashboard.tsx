import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Starter" },
      { name: "description", content: "Your dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", userData.user.id)
        .maybeSingle();
      return { email: userData.user.email, plan: profile?.plan ?? null };
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome</h1>
        {isLoading ? (
          <p className="mt-4 text-muted-foreground">Loading…</p>
        ) : (
          <>
            {data?.email && (
              <p className="mt-2 text-sm text-muted-foreground">{data.email}</p>
            )}
            <p className="mt-6 text-lg">
              Your plan:{" "}
              <span className="font-semibold capitalize text-foreground">
                {data?.plan ?? "None"}
              </span>
            </p>
          </>
        )}
        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" onClick={() => navigate({ to: "/plan" })}>
            Change plan
          </Button>
          <Button variant="ghost" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
