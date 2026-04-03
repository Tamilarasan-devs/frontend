import React from "react";

export default function RefundPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Refund & Return Policy
        </h1>

        <p className="text-gray-600 mb-6">Welcome</p>

        {/* Intro */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold">Aayubakawath</span>, we want you to feel confident 
          when purchasing our products. If something goes wrong, we’re here to help.
        </p>

        {/* Returns */}
        <Section title="Returns">
          <p className="mb-3">
            We accept returns under the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The product was wrongly delivered.</li>
            <li>The product was damaged during transit.</li>
            <li>The product has a tampered safety seal.</li>
          </ul>

          <p className="mt-3">
            To request a return, please email us at{" "}
            <span className="text-blue-600">
              customercare@snablabs.com
            </span>{" "}
            with your order details and a brief description of the issue.
          </p>

          <p className="mt-3 font-medium text-red-600">
            Important: We cannot accept returns of opened or used products due to hygiene reasons.
          </p>
        </Section>

        {/* Refunds */}
        <Section title="Refunds">
          <p>
            Once the returned product is received and inspected, your refund will be issued 
            to the original payment method within 4–5 working days after approval.
          </p>
        </Section>

        {/* Shipping Refund */}
        <Section title="Refund of Shipping Charges">
          <p>
            If your return is approved due to an error on our part (wrong item, damage, or tampered seal), 
            we will also refund the original shipping charges along with the product cost.
          </p>
        </Section>

        {/* Processing */}
        <Section title="Processing Time">
          <p>
            Orders are processed and shipped within 24 hours (excluding weekends and holidays). 
            You’ll receive a confirmation email or SMS once your order has been dispatched.
          </p>
        </Section>

        {/* Delivery */}
        <Section title="Delivery Time">
          <p>
            Most orders arrive within 4–5 working days, depending on your location. 
            External courier delays may occasionally occur.
          </p>
        </Section>

        {/* Shipping Costs */}
        <Section title="Shipping Costs">
          <p>
            Shipping costs are calculated at checkout based on weight and delivery location. 
            We aim to keep charges fair and transparent.
          </p>
        </Section>

        {/* Tracking */}
        <Section title="Order Tracking">
          <p>
            Once dispatched, you’ll receive a tracking number via email or SMS to monitor your order.
          </p>
        </Section>

        {/* Reminder */}
        <Section title="Friendly Reminder">
          <p>
            Please double-check your shipping address before confirming your order. 
            Incorrect addresses may cause delays, but we’ll always try to assist you.
          </p>
        </Section>

        {/* Cancellation */}
        <Section title="Cancellation Policy">
          <p className="mb-2">
            If you need to cancel an order, please contact us with your order number at{" "}
            <span className="text-blue-600">
              customercare@snablabs.com
            </span>.
          </p>

          <p className="mb-2">
            Once confirmed, cancellations are typically processed within one business day.
          </p>

          <p>
            If your order has already been dispatched, please decline delivery. 
            Refunds will be processed as per our Return & Refund Policy.
          </p>
        </Section>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Last updated: March 2026
        </p>

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