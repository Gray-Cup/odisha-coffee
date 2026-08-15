import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Sales & Shipping Policy") },
    { name: "description", content: generateDescription("Sales and Shipping Policy for Gray Cup Enterprises Private Limited including order processing, delivery timelines, international shipping and returns.") },
  ];
}

export default function SalesShippingPolicy() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-3 sm:md-py-5 md:py-10 lg:py-20">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6">
        Sales & Shipping Policy
      </h1>

      <div className="prose prose-neutral">
        <p className="text-muted-foreground mb-6">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          1. Order Processing
        </h2>
        <p className="mb-4">
          Orders are typically processed within 1-3 business days after payment
          confirmation. You will receive an order confirmation email with
          tracking details once your order has been dispatched.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Orders placed on weekends or holidays will be processed on the next business day.</li>
          <li>B2B orders may have different processing times based on order volume.</li>
          <li>Custom or bulk orders may require additional processing time.</li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          2. Domestic Shipping (India)
        </h2>
        <p className="mb-4">
          We ship to all serviceable pin codes across India through reputed
          courier partners.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Standard Delivery:</strong> 5-7 business days
          </li>
          <li>
            <strong>Express Delivery:</strong> 2-4 business days (where available)
          </li>
          <li>
            <strong>Metro Cities:</strong> Typically faster delivery within 3-5 business days
          </li>
          <li>
            Shipping charges are calculated based on weight, dimensions, and delivery location.
          </li>
          <li>
            Free shipping may be available for orders above a certain value (as displayed at checkout).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          3. International Shipping
        </h2>
        <p className="mb-4">
          Gray Cup Enterprises exports tea, coffee, and spices to various
          countries in compliance with the Foreign Trade Policy of India.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Delivery Time:</strong> 7-21 business days depending on destination
          </li>
          <li>
            International shipments may be subject to customs duties, taxes, and import regulations of the destination country.
          </li>
          <li>
            The recipient is responsible for any customs duties, taxes, or fees imposed by the destination country.
          </li>
          <li>
            Some products may not be available for export to certain countries due to regulatory restrictions.
          </li>
          <li>
            IEC Code: AAMCG4985H
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          4. Pricing and Payment
        </h2>
        <p className="mb-4">
          All prices displayed on our website are in Indian Rupees (INR) unless
          otherwise specified.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Prices include applicable GST (GST: 06AAMCG4985H1Z4).</li>
          <li>
            We accept payments via UPI, credit/debit cards, net banking, and other payment methods as displayed at checkout.
          </li>
          <li>
            <strong>UPI ID:</strong> graycup@kotak
          </li>
          <li>
            For B2B orders, we may offer credit terms subject to approval.
          </li>
          <li>
            Prices are subject to change without prior notice.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          5. Order Tracking
        </h2>
        <p className="mb-4">
          Once your order is dispatched, you will receive a tracking number via
          email or SMS. You can use this tracking number to monitor the status
          of your shipment on the courier partner&apos;s website.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          6. Delivery Issues
        </h2>
        <p className="mb-4">If you experience any delivery issues:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Delayed Delivery:</strong> Please allow an additional 2-3 business days beyond the estimated delivery date before contacting us.
          </li>
          <li>
            <strong>Damaged Products:</strong> Please photograph the damage and contact us within 48 hours of delivery.
          </li>
          <li>
            <strong>Wrong Product:</strong> Contact us immediately and we will arrange for replacement or refund.
          </li>
          <li>
            <strong>Missing Items:</strong> Please verify the packing slip and contact us if any items are missing.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          7. Returns and Refunds
        </h2>
        <p className="mb-4">
          Due to the nature of food products, we have specific return policies:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            Returns are accepted only for damaged, defective, or incorrect products.
          </li>
          <li>
            Return requests must be made within 7 days of delivery.
          </li>
          <li>
            Products must be unopened and in their original packaging for returns (except for damaged items).
          </li>
          <li>
            Refunds will be processed within 7-10 business days after we receive and verify the returned product.
          </li>
          <li>
            Refunds will be credited to the original payment method.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          8. Cancellations
        </h2>
        <p className="mb-4">
          Orders can be cancelled before they are dispatched. Once an order has
          been shipped, it cannot be cancelled. To request a cancellation,
          please contact us as soon as possible with your order details.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          9. B2B Orders
        </h2>
        <p className="mb-4">
          For bulk and B2B orders, please contact us directly for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Custom pricing and volume discounts</li>
          <li>Sample requests</li>
          <li>Custom packaging requirements</li>
          <li>Export documentation and compliance</li>
        </ul>
        <p className="mb-4">
          Visit our B2B portal at{" "}
          <a
            href="https://b2b.graycup.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            b2b.graycup.in
          </a>{" "}
          for more information.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          10. Contact Us
        </h2>
        <p className="mb-4">
          For any questions regarding sales, shipping, or orders, please contact
          us through our{" "}
          <a href="/contact" className="text-blue-700 underline">
            contact page
          </a>
          .
        </p>

        <p className="text-sm text-muted-foreground mt-10">
          Gray Cup Enterprises Private Limited | CIN: U47211DL2025PTC457808 |
          GST: 06AAMCG4985H1Z4
        </p>
      </div>
    </div>
  );
}
