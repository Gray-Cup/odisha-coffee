import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Refunds & Cancellations") },
    { name: "description", content: generateDescription("Refund and cancellation policy for orders placed on Odisha Coffee by Gray Cup Enterprises Private Limited.") },
  ];
}

export default function RefundsPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-3 sm:md-py-5 md:py-10 lg:py-20">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6">Refunds &amp; Cancellations</h1>

      <div className="prose prose-neutral">
        <p className="text-muted-foreground mb-6">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">1. Order Cancellations</h2>
        <p className="mb-4">
          You may request a cancellation before your order has been dispatched. Once an order has
          been packed and handed over to our logistics partner, it cannot be cancelled.
        </p>
        <p className="mb-4">
          To cancel an order, please contact us immediately through our{" "}
          <a href="/contact" className="text-blue-700 underline">
            contact page
          </a>{" "}
          with your order reference number. We will do our best to accommodate your request if the
          order has not yet been dispatched.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">2. Eligibility for Refunds</h2>
        <p className="mb-4">We accept refund requests in the following cases:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You received a product that is damaged or defective.</li>
          <li>You received the wrong product or quantity.</li>
          <li>Your order was cancelled before dispatch and payment was already collected.</li>
        </ul>
        <p className="mb-4">
          Refunds are not applicable for change of mind after dispatch, or for custom bulk/export
          orders once production has commenced.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">3. How to Raise a Refund Request</h2>
        <p className="mb-4">
          Contact us within <strong>48 hours</strong> of receiving your order via our{" "}
          <a href="/contact" className="text-blue-700 underline">
            contact page
          </a>
          . Please include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your order reference number</li>
          <li>A description of the issue</li>
          <li>Clear photographs of the damaged or incorrect product (if applicable)</li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">4. Refund Processing</h2>
        <p className="mb-4">
          Once your refund request is approved, the amount will be credited to your original payment
          method within <strong>5–7 business days</strong>. Processing times may vary depending on
          your bank or payment provider.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">5. Bulk &amp; Export Orders</h2>
        <p className="mb-4">
          For B2B, wholesale, and export orders, refund and cancellation terms are governed by the
          specific agreement or proforma invoice issued at the time of the order. Please refer to
          that document or contact us directly for clarification.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">6. Contact</h2>
        <p className="mb-4">
          For any questions about this policy, please reach out through our{" "}
          <a href="/contact" className="text-blue-700 underline">
            contact page
          </a>
          .
        </p>

        <p className="text-sm text-muted-foreground mt-10">
          Gray Cup Enterprises Private Limited | CIN: U47211DL2025PTC457808
        </p>
      </div>
    </div>
  );
}
