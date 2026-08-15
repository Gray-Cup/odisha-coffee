import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Privacy Policy • Coffee Recipe Extension") },
    { name: "description", content: generateDescription("Privacy details for Gray Cup's Coffee Recipe Chrome Extension, outlining data collection, local storage usage, remote content retrieval and contact information.") },
  ];
}

export default function PrivacyPolicyChromeExt() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-3 sm:md-py-5 md:py-10 lg:py-20 "> 
          <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-6 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p>
            Daily Coffee Recipe is a Chrome extension that displays a new coffee
            recipe whenever you open a new tab. Your privacy is important to us,
            and this extension is designed to collect minimal data and operate
            locally whenever possible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>
          <p>
            This extension does <strong>not collect, store, or share</strong> any
            personal information such as:
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>Name, email, or contact details</li>
            <li>Browsing history</li>
            <li>Location data</li>
            <li>Cookies or tracking identifiers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Use of Local Storage
          </h2>
          <p>
            The extension may use your browser’s local storage to save basic
            preferences such as the last viewed recipe. This data remains only
            on your device and is never transmitted to any server.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Remote Content
          </h2>
          <p>
            To provide updated coffee recipes, the extension may retrieve
            content from a remote server. This content includes only recipe
            text and images and does not include any executable code or user
            tracking.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Data Sharing
          </h2>
          <p>
            We do not sell, trade, or share any user data with third parties
            because no personal data is collected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Changes to This Policy
          </h2>
          <p>
            This privacy policy may be updated occasionally to reflect changes
            in the extension. Updates will be posted on this page with a revised
            date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            If you have any questions regarding this privacy policy, please
            contact us at:
          </p>
          <p className="mt-2 font-medium">
            office@graycup.org
          </p>
        </section>
      </div>
    </div>
  );
}
