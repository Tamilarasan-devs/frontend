import React from "react";

export default function TermsOfService() {
  const content = `AAYUBAKWATH – TERMS OF USE

Terms of Use
This website (the “Site”) is owned and operated by Aayubakwath (“we” or “us”) for your information, education, communication and, where applicable, the purchase of products and services. Please feel free to browse the Site; however, your access to and use of the Site is subject to the following Terms of Use (“Terms”) and all applicable laws.

By accessing and browsing this Site, you accept, without limitation or qualification, these Terms. If you do not agree with any of these Terms, you should not use this Site. We reserve the right to modify these Terms at any time.

Intellectual Property Rights
All material on this Site (“Material”), including text, images, graphics, and product descriptions, is protected by intellectual property laws and owned by us or licensed to us. You may not copy, reproduce, or distribute any Material without permission.

Use of the Site
This Site is intended for personal, non-commercial use. You agree not to use the Site unlawfully or attempt unauthorized access. Orders placed are subject to acceptance at our discretion.

Health and Information Disclaimer
The information provided is for educational purposes only and not medical advice. Consult a qualified healthcare professional before using any product.

Linked Sites
We may provide links to third-party websites. We are not responsible for their content or practices.

Disclaimer of Warranties
THIS SITE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE ERROR-FREE OR UNINTERRUPTED SERVICE.

Limitation of Liability
WE ARE NOT LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE SITE. USE AT YOUR OWN RISK.

Limitation of Remedy
If dissatisfied, your sole remedy is to stop using the Site.

Jurisdictional Issues
These Terms are governed by applicable laws, and courts shall have exclusive jurisdiction.

Termination
We may terminate access at any time if Terms are violated.

Other
If any provision is invalid, the rest remain in effect. Continued use means acceptance of updates.`;

  const sections = content.split("\n\n");

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        {/* Main Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Terms of Use
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
                {/* Section Heading */}
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
        <p className="text-sm text-gray-400 mt-10 text-center border-t pt-4">
          Last updated: April 2026
        </p>
      </div>
    </div>
  );
}