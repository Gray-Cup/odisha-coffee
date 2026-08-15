// Loads Cashfree's Checkout.js SDK (the Orders/Payment Session product) as a
// plain <script> tag rather than an npm dependency, mirroring how
// components/ui/turnstile.tsx loads Cloudflare Turnstile — one script tag,
// checked for before re-adding, no build-time SDK dependency.

export type CashfreeCheckoutResult = {
  error?: { message: string };
  redirect?: boolean;
  paymentDetails?: unknown;
};

type CashfreeInstance = {
  checkout: (options: {
    paymentSessionId: string;
    returnUrl?: string;
    redirectTarget?: HTMLElement | "_self" | "_blank" | "_top";
  }) => Promise<CashfreeCheckoutResult>;
};

declare global {
  interface Window {
    Cashfree?: (config: { mode: "production" | "sandbox" }) => CashfreeInstance;
  }
}

const CASHFREE_SDK_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CASHFREE_SDK_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Cashfree SDK")));
      return;
    }

    const script = document.createElement("script");
    script.src = CASHFREE_SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
    document.head.appendChild(script);
  });
}

export async function getCashfree(): Promise<CashfreeInstance> {
  await loadScript();
  if (!window.Cashfree) throw new Error("Cashfree SDK failed to initialize");
  return window.Cashfree({ mode: "production" });
}
