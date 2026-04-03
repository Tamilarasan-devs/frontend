import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Policy
        </h1>

        <section className="space-y-6 text-gray-600 leading-relaxed">
          
          <p>
            We deliver across India through our logistics partners. Estimated
            delivery timelines will be displayed after you enter your delivery
            pincode on the Site. Delays may occur due to courier issues, force
            majeure, or regulatory checks. Risk of loss transfers to you once
            the products are handed over to the courier.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Refund of Shipping Charges
            </h2>
            <p>
              If your return is approved because of an error on our part, such
              as a wrong item being delivered, damage in transit, or a tampered
              seal, we will also refund the original shipping charges you paid,
              along with the product cost. Refunds will be made to your original
              payment method within 4–5 working days after inspection and
              approval.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Shipping Costs
            </h2>
            <p>
              Shipping costs are calculated at checkout based on weight and
              delivery location. We aim to keep shipping charges fair and
              transparent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Order Tracking
            </h2>
            <p>
              Once dispatched, you’ll receive a tracking number by email or SMS.
              This allows you to monitor your order until it arrives safely at
              your door.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-yellow-800 mb-1">
              Friendly Reminder
            </h2>
            <p className="text-yellow-700">
              Please double-check your shipping address before confirming your
              order. While we will always do our best to assist, an incorrect
              address may cause delays.
            </p>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Last updated: March 2026
          </p>
        </section>
      </div>
    </div>
  );
}