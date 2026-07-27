import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Starter" },
      { name: "description", content: "Sign in or create an account to get started." },
      { property: "og:title", content: "Sign in — Starter" },
      { property: "og:description", content: "Sign in or create an account to get started." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(72);

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // If already signed in, route to plan or dashboard.
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", data.session.user.id)
        .maybeSingle();
      navigate({ to: profile?.plan ? "/dashboard" : "/plan", replace: true });
    })();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in or create an account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) return setError(emailResult.error.issues[0].message);
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) return setError(passwordResult.error.issues[0].message);

    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: emailResult.data,
      password: passwordResult.data,
    });
    setLoading(false);

    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes("invalid")
          ? "Invalid email or password."
          : signInError.message,
      );
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", data.user!.id)
      .maybeSingle();
    navigate({ to: profile?.plan ? "/dashboard" : "/plan", replace: true });
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Log in"}
      </Button>
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) return setError(emailResult.error.issues[0].message);
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) return setError(passwordResult.error.issues[0].message);

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: emailResult.data,
      password: passwordResult.data,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setLoading(false);

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      if (msg.includes("registered") || msg.includes("already")) {
        setError("An account with that email already exists.");
      } else {
        setError(signUpError.message);
      }
      return;
    }

    if (!data.session) {
      setError("Check your email to confirm your account, then log in.");
      return;
    }

    navigate({ to: "/plan", replace: true });
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">At least 6 characters.</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Sign up"}
      </Button>
    </form>
  );
}
