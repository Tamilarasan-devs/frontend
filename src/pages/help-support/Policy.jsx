import React from "react";

export default function Policy() {
  const content = `Privacy Policy

Introduction
This Privacy Policy is issued by Aayubakwath (“we”, “us”, “our”). It explains how we collect, use, store, and protect your personal information when you access or use our website, mobile application, or any related services. “You” or “your” refers to any user, visitor, or customer of Aayubakwath platforms. By using our services, you agree to the practices described in this Privacy Policy.

Information We Collect
We may collect personal information that you provide directly, such as your name, email address, phone number, delivery address, date of birth, gender, login credentials, and payment-related details. We may also collect information when you contact us, place an order, fill out forms, participate in surveys, or interact with customer support.

In addition, we may automatically collect certain technical and usage data such as IP address, device information, browser type, operating system, pages visited, time spent on pages, and interaction patterns on our platform.

How We Collect Information
We collect information when you register an account, place an order, subscribe to updates, or communicate with us. We also collect data automatically through cookies, analytics tools, and similar tracking technologies.

Use of Information
We use your information to provide, operate, and improve our services. This includes processing orders, delivering products, managing payments, responding to queries, and offering customer support.

Sharing of Information
We do not sell your personal information. However, we may share it with trusted third parties who help us operate our business.

Data Storage and Security
We take appropriate security measures to protect your personal information from unauthorized access, loss, misuse, or alteration.

Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy.

Cookies and Tracking Technologies
We use cookies and similar technologies to improve your browsing experience and analyze usage.

Your Rights
You may have rights to access, correct, update, or delete your personal information.

Third-Party Links
Our platform may contain links to third-party websites. We are not responsible for their privacy practices.

Children’s Privacy
We do not knowingly collect personal information from minors.

Changes to This Privacy Policy
We may update this Privacy Policy from time to time.

Contact Us
If you have any questions, you may contact us through our official website.`;

  // Split content into sections
  const sections = content.split("\n\n");

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Dynamic Content */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const lines = section.split("\n");
            const title = lines[0];
            const body = lines.slice(1).join(" ");

            return (
              <div key={index} className="border-b pb-4 last:border-none">
                
                {/* Section Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {title}
                </h2>

                {/* Section Content */}
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
        <p className="text-sm text-gray-400 mt-10 text-center">
          Last updated: March 2026
        </p>
      </div>
    </div>
  );
}