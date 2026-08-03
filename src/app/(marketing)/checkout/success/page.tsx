import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Placed — Odisha Coffee",
  description: "Your Odisha Coffee order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border-2 border-odisha-black bg-white p-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-odisha-green mx-auto mb-6 flex items-center justify-center border-2 border-odisha-black">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-odisha-black mb-3">
          Order Confirmed!
        </h1>
        <p className="text-odisha-black/60 text-sm leading-relaxed mb-2">
          Thank you for your order. We&apos;ve received your payment and will prepare your coffee shortly.
        </p>
        <p className="text-odisha-black/50 text-xs leading-relaxed mb-8">
          A confirmation will be sent to your email and phone. For any questions, write to{" "}
          <a href="mailto:office@graycup.org" className="text-odisha-red hover:underline">
            office@graycup.org
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/buy-green-beans"
            className="px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors"
          >
            Shop More Coffee
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-black hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
