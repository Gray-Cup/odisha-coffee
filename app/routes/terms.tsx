import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Terms of Use") },
    { name: "description", content: generateDescription("Terms of Use for Gray Cup Enterprises Private Limited including conditions for using our website, purchasing products and accessing services.") },
  ];
}

export default function TermsOfUse() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-3 sm:md-py-5 md:py-10 lg:py-20">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6">Terms of Use</h1>

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
          1. Introduction
        </h2>
        <p className="mb-4">
          Welcome to Gray Cup Enterprises Private Limited. By accessing or using
          our website, products, and services, you agree to comply with and be
          bound by the following terms and conditions. Please review them
          carefully before using our services.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          2. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using any part of our website or purchasing our
          products, you acknowledge that you have read, understood, and agree to
          be bound by these Terms of Use. If you do not agree to these terms,
          please do not use our services or purchase our products.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          3. About Our Business
        </h2>
        <p className="mb-4">
          Gray Cup Enterprises Private Limited is engaged in the sourcing,
          packaging, trading, and export of tea, coffee, and spices. We operate
          both B2B and consumer retail channels, serving customers in India and
          internationally.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          4. Product Information
        </h2>
        <p className="mb-4">
          We strive to provide accurate product descriptions, images, and
          pricing. However:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            Product images are for illustrative purposes only. Actual products
            may vary slightly in appearance.
          </li>
          <li>
            Prices are subject to change without prior notice and may vary based
            on location and applicable taxes.
          </li>
          <li>
            Product availability is subject to stock levels and may change
            without notice.
          </li>
          <li>
            Nutritional information and ingredients are provided as accurately
            as possible but may vary slightly between batches.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          5. Ordering and Payment
        </h2>
        <p className="mb-4">
          When placing an order through our website or other channels:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            You confirm that all information provided is accurate and complete.
          </li>
          <li>
            We reserve the right to refuse or cancel any order for any reason,
            including pricing errors or stock unavailability.
          </li>
          <li>
            Payment must be completed as per the payment terms agreed upon at
            the time of purchase.
          </li>
          <li>All prices are inclusive of applicable GST unless stated otherwise.</li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          6. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on this website, including but not limited to text,
          graphics, logos, images, and software, is the property of Gray Cup
          Enterprises Private Limited and is protected by applicable
          intellectual property laws. You may not reproduce, distribute, or use
          any content without our prior written consent.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          7. User Conduct
        </h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Use our website for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the website or servers</li>
          <li>Upload malicious code or harmful content</li>
          <li>Misrepresent your identity or affiliation</li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          8. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the maximum extent permitted by law, Gray Cup Enterprises Private
          Limited shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising from your use of our
          website or products. Our total liability shall not exceed the amount
          paid by you for the specific product or service in question.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          9. Indemnification
        </h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless Gray Cup Enterprises Private
          Limited, its directors, employees, and agents from any claims,
          damages, losses, or expenses arising from your violation of these
          terms or misuse of our services.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          10. Modifications to Terms
        </h2>
        <p className="mb-4">
          We reserve the right to modify these Terms of Use at any time. Changes
          will be effective immediately upon posting on our website. Your
          continued use of our services after any modifications constitutes
          acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          11. Governing Law and Jurisdiction
        </h2>
        <p className="mb-4">
          These Terms of Use shall be governed by and construed in accordance
          with the laws of India. Any disputes arising from these terms shall be
          subject to the exclusive jurisdiction of the courts in New Delhi,
          India.
        </p>

        <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">
          12. Contact Us
        </h2>
        <p className="mb-4">
          If you have any questions about these Terms of Use, please contact us
          through our{" "}
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
