import React from "react";

export default function ShippingPolicy() {
  const content = `AAYUBAKWATH – SHIPPING POLICY

Shipping Policy
Aayubakwath is committed to ensuring that all products ordered through our website are delivered in a timely and efficient manner. We have partnered with reputed logistics service providers to facilitate safe and reliable delivery across serviceable locations.

All products are carefully inspected, securely packaged, and then handed over to our delivery partners to ensure they reach you in good condition.

By placing an order on our website, you agree to the terms outlined in this Shipping Policy.

Shipping Coverage
We currently ship products to most locations within India, subject to serviceability of our logistics partners. Delivery availability may vary depending on pin code.

Order Processing and Dispatch
Once an order is placed, it is processed and undergoes verification before dispatch. Orders are typically dispatched within [ ] business days.

Orders may be shipped from different warehouses. Items within a single order may be dispatched separately.

Delivery Timelines
Estimated delivery time is generally [ ] business days from dispatch. Delays may occur due to weather, logistics disruptions, or unforeseen circumstances.

Shipping Charges
Shipping charges (if applicable) will be clearly displayed at checkout before order confirmation.

Order Delivery Process
Our logistics partner will deliver the product(s) to the provided address. Failed delivery attempts due to incorrect address or unavailability may result in return to warehouse.

Tracking of Orders
Once dispatched, you will receive a tracking ID via email or SMS. You may also track orders through your account dashboard.

Delivery Attempts
Delivery partners will attempt multiple deliveries. If unsuccessful, re-shipping may incur additional charges.

Shipping Restrictions
We currently do not support international shipping. Some pin codes may be non-serviceable.

Risk and Responsibility
Products are inspected before dispatch. Responsibility transfers to the logistics partner once shipped.

Delays and Unforeseen Circumstances
We are not liable for delays caused by external logistics issues or unforeseen conditions.

Policy Updates
We may update this Shipping Policy at any time. Continued use indicates acceptance.

Contact Information
For shipping-related queries, please contact us through our official support channels.

Final Note
By placing an order, you acknowledge that you have read and agreed to this Shipping Policy.`;

  const sections = content.split("\n\n");

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Shipping Policy
        </h1>

        {/* Dynamic Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const lines = section.split("\n");
            const title = lines[0];
            const body = lines.slice(1).join(" ");

            return (
              <div
                key={index}
                className="border-b border-gray-200 pb-5 last:border-none"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {title}
                </h2>

                {body && (
                  <p className="text-gray-600 leading-relaxed">
                    {body}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-10 text-center border-t pt-4">
          Last updated: April 2026
        </p>
      </div>
    </div>
  );
}