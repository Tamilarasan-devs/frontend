import React from "react";

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold">Aayubakwath</span>, operated by SNAB Labs LLP (“Company”, “we”, “our”, or “us”). 
          These Terms & Conditions (“Terms”) govern your access to and use of our website (the “Site”), including browsing content 
          and purchasing our plant-based cleaning solutions (“Products”). By using this Site, you agree to these Terms. If you do 
          not agree, please discontinue use immediately.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          {/* Section */}
          <div>
            <h2 className="section-title">1. Eligibility & Use of the Site</h2>
            <p>
              You must be at least 18 years old to place an order. You agree to use the Site lawfully. Any fraudulent, disruptive, 
              or unauthorized activity may result in termination of access and legal action.
            </p>
          </div>

          <div>
            <h2 className="section-title">2. Our Products</h2>
            <p>
              Our plant-based cleaning solutions are designed for safe and effective use. Product descriptions and images are for 
              reference only, and minor variations may occur. We may update formulations, packaging, or discontinue products 
              without prior notice.
            </p>
          </div>

          <div>
            <h2 className="section-title">3. Orders & Acceptance</h2>
            <p>
              Placing an order constitutes an offer to purchase. Orders are subject to availability and confirmation. We reserve 
              the right to cancel orders suspected of fraud or unauthorized activity.
            </p>
          </div>

          <div>
            <h2 className="section-title">4. Pricing & Payment</h2>
            <p>
              All prices are listed in INR and include applicable taxes unless stated otherwise. Payments can be made via UPI, 
              cards, net banking, or wallets. You confirm that you are authorized to use the selected payment method.
            </p>
          </div>

          <div>
            <h2 className="section-title">5. Shipping & Delivery</h2>
            <p>
              We deliver across India. Estimated delivery timelines are shown after entering your pincode. Delays may occur due 
              to logistics or unforeseen circumstances. Risk transfers once the product is handed to the courier.
            </p>
          </div>

          <div>
            <h2 className="section-title">6. Returns, Replacements & Refunds</h2>
            <p>
              Returns are accepted only for damaged, incorrect, or tampered products. Contact us at{" "}
              <span className="font-medium">customercare@snablabs.com</span> with order details. Opened or used products cannot be 
              returned due to hygiene reasons.
            </p>
          </div>

          <div>
            <h2 className="section-title">7. Intellectual Property</h2>
            <p>
              All content on this Site, including branding, design, and text, is owned by SNAB Labs LLP. Unauthorized use or 
              reproduction is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="section-title">8. User Content</h2>
            <p>
              By submitting reviews or feedback, you grant us the right to use it for marketing purposes. Content must not be 
              unlawful, offensive, or misleading.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <h2 className="font-semibold text-yellow-800 mb-1">
              9. Safety & Disclaimer
            </h2>
            <p className="text-yellow-700">
              Our products are plant-based but must be used as directed. We are not responsible for misuse, improper storage, or 
              individual allergic reactions.
            </p>
          </div>

          <div>
            <h2 className="section-title">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect or consequential damages. Liability is limited 
              to the purchase price of the product.
            </p>
          </div>

          <div>
            <h2 className="section-title">11. Privacy</h2>
            <p>
              Your use of the Site is governed by our Privacy Policy in accordance with Indian laws.
            </p>
          </div>

          <div>
            <h2 className="section-title">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Disputes fall under the jurisdiction of courts in Tamil Nadu.
            </p>
          </div>

          <div>
            <h2 className="section-title">13. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Site indicates acceptance of the updated Terms.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-800 mb-1">
              14. Contact & Grievance
            </h2>
            <p>
              SNAB Labs LLP <br />
              Email: <span className="font-medium">info.sblsmarketing@gmail.com</span>
            </p>
          </div>

          <p className="text-sm text-gray-400 pt-6 border-t">
            Last updated: March 2026
          </p>

        </div>
      </div>

      {/* Reusable Tailwind class */}
      <style jsx>{`
        .section-title {
          @apply text-xl font-semibold text-gray-900 mb-2;
        }
      `}</style>
    </div>
  );
}