import React from "react";

export default function Policy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">Welcome</p>

        {/* Intro */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold">Aayubakawath</span> (“Company”, “we”, “our”, or “us”), 
          we respect your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you 
          visit our website or purchase our products.
        </p>

        {/* Section 1 */}
        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping address.</li>
            <li><strong>Payment Information:</strong> Processed securely through third-party payment gateways. We do not store your card/bank details.</li>
            <li><strong>Order Information:</strong> Products purchased, order history, and delivery details.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, and website usage patterns.</li>
          </ul>
        </Section>

        {/* Section 2 */}
        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and deliver your orders.</li>
            <li>Communicate order confirmations, shipping updates, and customer support.</li>
            <li>Improve our website, services, and product offerings.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            We do not sell or rent your personal information to third parties.
          </p>
        </Section>

        {/* Section 3 */}
        <Section title="3. Sharing of Information">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Trusted Service Providers:</strong> Shipping partners, payment gateways, and IT support who help us fulfill your order.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            All service providers are bound by confidentiality obligations.
          </p>
        </Section>

        {/* Section 4 */}
        <Section title="4. Data Security">
          <p>
            We implement reasonable technical and organizational safeguards to protect your personal information 
            from unauthorized access, misuse, or disclosure.
          </p>
        </Section>

        {/* Section 5 */}
        <Section title="5. Cookies & Tracking">
          <p>
            Our website may use cookies to enhance your browsing experience. You may disable cookies in your 
            browser settings, but some features may not function properly.
          </p>
        </Section>

        {/* Section 6 */}
        <Section title="6. Your Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate details.</li>
            <li>Request deletion of your personal data (subject to legal obligations).</li>
          </ul>
          <p className="mt-3">
            For such requests, please email us at{" "}
            <span className="text-blue-600">customercare@snablabs.com</span>.
          </p>
        </Section>

        {/* Section 7 */}
        <Section title="7. Children’s Privacy">
          <p>
            Our website and products are not directed at individuals under the age of 18. 
            We do not knowingly collect data from minors.
          </p>
        </Section>

        {/* Contact */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            We’re here to help! Whether you have a question about our products, your order, or need support.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg text-gray-800 space-y-2">
            <p className="font-semibold">Aayubakawath</p>
            <p className="italic text-sm">
              Nature's wisdom, crafted for your well-being. Rooted in tradition, refined for today.
            </p>

            <p className="font-semibold mt-3">Sri Bakawathi Life Science</p>
            <p>
              No: 1/770, K. Ayyampalayam (PO) <br />
              K.S.N Puram, Palladam <br />
              Tiruppur – 641662, Tamil Nadu
            </p>

            <p>📞 +91 94431 57282</p>
            <p>📧 info.sblsmarketing@gmail.com</p>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}

/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}