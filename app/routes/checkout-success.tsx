import { Link, useSearchParams } from "react-router";

export function meta() {
  return [
    { title: "Order Placed - Odisha Coffee" },
    { name: "description", content: "Your Odisha Coffee order has been placed successfully." },
  ];
}

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const orderRef = params.get("order_ref") ?? undefined;

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

        {orderRef && (
          <div className="inline-block border-2 border-odisha-black bg-odisha-offwhite px-4 py-1.5 mb-4">
            <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 mr-2">Order ID</span>
            <span className="font-serif font-bold text-odisha-black">{orderRef}</span>
          </div>
        )}

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
            to="/buy-green-beans"
            className="px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors"
          >
            Shop More Coffee
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-black hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
