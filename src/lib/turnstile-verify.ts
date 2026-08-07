// Server-side counterpart to the client widget in components/ui/turnstile.tsx.
// TURNSTILE_SECRET_KEY already exists in .env.example; when unset (e.g. local
// dev without a configured site), verification is skipped so the feature
// still works, matching how the client widget itself no-ops without a site key.
export async function verifyTurnstileToken(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
