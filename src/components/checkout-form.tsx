"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { getCashfree } from "@/lib/cashfree-client";
import type { OdishaOrderRequest } from "@/app/api/create-payment/route";

const NEEDS_CAPTCHA = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Remembers the buyer's own details (not order contents) across visits so
// they never have to retype them - refreshed to a fresh 1-year window on
// every edit, and never sent anywhere; it's purely a localStorage mirror of
// the form fields below.
const BUYER_CACHE_KEY = "odisha_buyer_info";
const BUYER_CACHE_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

type CachedBuyerInfo = {
  customerType: "individual" | "business";
  country: string;
  name: string;
  phone: string;
  email: string;
  pincode: string;
  address: string;
  state: string;
  gstOrTaxId: string;
  businessType: string;
};

function loadCachedBuyerInfo(): Partial<CachedBuyerInfo> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BUYER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; data: Partial<CachedBuyerInfo> };
    if (!parsed?.data || Date.now() - parsed.savedAt > BUYER_CACHE_MAX_AGE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function saveCachedBuyerInfo(data: CachedBuyerInfo) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BUYER_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // ignore quota errors
  }
}

const businessCategories = [
  { id: "roastery",   label: "Roastery" },
  { id: "cafe",       label: "Cafe" },
  { id: "hotel",      label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "importer",   label: "Importer / Distributor" },
  { id: "other",      label: "Other" },
];

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "address" | "pincode", string>>;

function titleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function validate(fields: { name: string; phone: string; email: string; address: string; pincode: string }): FieldErrors {
  const e: FieldErrors = {};
  if (!fields.name.trim())    e.name    = "Name is required.";
  if (!fields.phone.trim())   e.phone   = "Phone number is required.";
  if (!fields.email.trim())   e.email   = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address.";
  if (!fields.address.trim()) e.address = "Delivery address is required.";
  else if (fields.address.trim().length < 7) e.address = "Address must be at least 7 characters.";
  if (!fields.pincode.trim()) e.pincode = "Pincode / ZIP is required.";
  return e;
}

type Props = {
  products: string[];      // "productId:weight" strings
  totalAmount: number;
  country: string;
  onCountryChange: (country: string) => void;
  renderSummary?: () => React.ReactNode;
  onBack?: () => void;
};

export function CheckoutForm({ products, totalAmount, country, onCountryChange: setCountry, renderSummary, onBack }: Props) {
  const turnstile = useTurnstile();

  const [customerType, setCustomerType] = useState<"individual" | "business">("individual");
  const [name,         setName]         = useState("");
  const [phone,        setPhone]        = useState("");
  const [email,        setEmail]        = useState("");
  const [pincode,      setPincode]      = useState("");
  const [address,      setAddress]      = useState("");
  const [state,        setState]        = useState("");
  const [gstOrTaxId,   setGstOrTaxId]   = useState("");
  const [businessType, setBusinessType] = useState("");
  const [isLoading,    setIsLoading]    = useState(false);
  const [submitError,  setSubmitError]  = useState("");
  const [touched,      setTouched]      = useState<Set<string>>(new Set());
  const [triedSubmit,  setTriedSubmit]  = useState(false);

  const touch = (field: string) => setTouched((prev) => new Set([...prev, field]));
  const showErr = (field: string) => touched.has(field) || triedSubmit;

  const fieldValues = { name, phone, email, address, pincode };
  const errors = validate(fieldValues);
  const hasErrors = Object.keys(errors).length > 0;

  // Pre-fill from a cached previous visit, if any (before the geo lookup
  // below runs, so a returning buyer's own country isn't clobbered by IP
  // detection).
  useEffect(() => {
    const cached = loadCachedBuyerInfo();
    if (!cached) return;
    if (cached.customerType)  setCustomerType(cached.customerType);
    if (cached.country)       setCountry(cached.country);
    if (cached.name)          setName(cached.name);
    if (cached.phone)         setPhone(cached.phone);
    if (cached.email)         setEmail(cached.email);
    if (cached.pincode)       setPincode(cached.pincode);
    if (cached.address)       setAddress(cached.address);
    if (cached.state)         setState(cached.state);
    if (cached.gstOrTaxId)    setGstOrTaxId(cached.gstOrTaxId);
    if (cached.businessType)  setBusinessType(cached.businessType);
  }, []);

  // Country now lives in the parent (so the order summary can price
  // delivery off it too), so this ref tracks the latest value for the geo
  // effect below - it only fires once on mount and must still see whatever
  // the buyer/cache have set by the time the fetch resolves.
  const countryRef = useRef(country);
  useEffect(() => { countryRef.current = country; }, [country]);

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => {
        if (!d.country) return;
        // Never overwrite an already-cached/user-entered country once this resolves.
        if (countryRef.current) return;
        try {
          const detected = new Intl.DisplayNames(["en"], { type: "region" }).of(d.country);
          setCountry(detected || d.country);
        } catch {
          setCountry(d.country);
        }
      })
      .catch(() => {});
  }, []);

  // Keep the cache in sync with whatever the buyer has typed - every edit
  // refreshes the 1-year window, and the field stays editable/overwritable
  // exactly like any other controlled input.
  useEffect(() => {
    if (!name && !phone && !email && !address && !pincode && !state && !gstOrTaxId) return;
    saveCachedBuyerInfo({
      customerType, country, name, phone, email, pincode, address, state, gstOrTaxId, businessType,
    });
  }, [customerType, country, name, phone, email, pincode, address, state, gstOrTaxId, businessType]);

  const isIndia    = country.trim().toLowerCase() === "india";
  const isBusiness = customerType === "business";
  const taxLabel   = isIndia ? "GST Number" : "Tax ID";
  const taxPlaceholder = isIndia ? "22AAAAA0000A1Z5" : "VAT / Tax registration number";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (hasErrors) return;

    setSubmitError("");
    setIsLoading(true);

    const payload: OdishaOrderRequest = {
      name, phone, email, country, pincode, address,
      state: state || undefined,
      gstOrTaxId: gstOrTaxId || undefined,
      businessType: businessType || undefined,
      products,
      totalAmount,
    };

    try {
      const res  = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment");

      // Orders API + Checkout.js: renders Cashfree's hosted checkout for this
      // order's payment_session_id, rather than redirecting to a generic
      // Payment Links page. With no redirectTarget this still navigates the
      // full page away to complete payment, then back to returnUrl.
      const cashfree = await getCashfree();
      const result = await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        returnUrl: data.returnUrl,
      });
      if (result?.error) throw new Error(result.error.message || "Payment failed to start.");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const fieldClass = (field: keyof FieldErrors) =>
    errors[field] && showErr(field) ? "border-red-400 focus-visible:ring-red-300" : "";

  const canSubmit = !isLoading && products.length > 0 && (!NEEDS_CAPTCHA || turnstile.isVerified);

  return (
    <div>
      {renderSummary?.()}

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-odisha-black/50 hover:text-odisha-black mb-8 flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to cart
        </button>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Individual / Business */}
        <div className="inline-flex gap-1 bg-odisha-offwhite border-2 border-odisha-black p-1">
          {(["individual", "business"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setCustomerType(type)}
              className={`px-5 py-1.5 text-sm font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
                customerType === type
                  ? "bg-odisha-red text-white"
                  : "text-odisha-black/50 hover:text-odisha-black"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            className={fieldClass("name")}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => { touch("name"); if (name.trim()) setName(titleCase(name.trim())); }}
          />
          {errors.name && showErr("name") && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Phone + Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              className={fieldClass("phone")}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => touch("phone")}
            />
            {errors.phone && showErr("phone") && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="India, Germany, Japan…"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            className={fieldClass("email")}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => touch("email")}
          />
          {errors.email && showErr("email") && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label htmlFor="address">Full Delivery Address</Label>
          <Textarea
            id="address"
            placeholder="House / flat no., street, area, city"
            rows={3}
            value={address}
            className={fieldClass("address")}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => touch("address")}
          />
          {errors.address && showErr("address") && <p className="text-xs text-red-500">{errors.address}</p>}
        </div>

        {/* State + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder={isIndia ? "Odisha" : "State / Province"}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pincode">Pincode / ZIP</Label>
            <Input
              id="pincode"
              placeholder={isIndia ? "751001" : "ZIP / Postal code"}
              value={pincode}
              className={fieldClass("pincode")}
              onChange={(e) => setPincode(e.target.value)}
              onBlur={() => touch("pincode")}
            />
            {errors.pincode && showErr("pincode") && <p className="text-xs text-red-500">{errors.pincode}</p>}
          </div>
        </div>

        {/* Business-only */}
        {isBusiness && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="tax">
                {taxLabel}{" "}
                <span className="text-odisha-black/40 font-normal">(optional)</span>
              </Label>
              <Input
                id="tax"
                placeholder={taxPlaceholder}
                value={gstOrTaxId}
                onChange={(e) => setGstOrTaxId(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Label>
                Business Type{" "}
                <span className="text-odisha-black/40 font-normal">(optional)</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {businessCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setBusinessType(businessType === cat.id ? "" : cat.id)}
                    className={`px-4 py-2 text-sm border-2 transition-colors cursor-pointer ${
                      businessType === cat.id
                        ? "bg-odisha-red border-odisha-red text-white"
                        : "border-odisha-black/30 text-odisha-black/70 hover:border-odisha-black"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <Turnstile
          onVerify={turnstile.handleVerify}
          onError={turnstile.handleError}
          onExpire={turnstile.handleExpire}
        />

        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2">
            {submitError}
          </p>
        )}

        {triedSubmit && hasErrors && (
          <p className="text-sm text-red-600">Please fix the errors above before continuing.</p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-12 bg-odisha-red text-white font-semibold text-sm uppercase tracking-widest border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing…" : `Pay ₹${totalAmount.toLocaleString("en-IN")} & Order`}
        </button>
      </form>
    </div>
  );
}
