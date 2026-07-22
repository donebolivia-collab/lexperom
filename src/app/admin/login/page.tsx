"use client";

import { useActionState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { login, type LoginActionState } from "@/features/auth/actions";

const initialState: LoginActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-8">
          <p className="text-center text-sm font-medium text-muted">{siteConfig.siteName}</p>
          <h1 className="mt-1 text-center text-xl font-semibold text-ink">
            Acceso del equipo
          </h1>

          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-urgency-critico">
                {state.error}
              </p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Ingresando…" : "Ingresar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
