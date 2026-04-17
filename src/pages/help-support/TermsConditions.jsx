import React from "react";

export default function TermsOfService() {
  const content = `

Terms of Use
This website (the “Site”) is owned and operated by Aayubakwath (“we” or “us”) for your information, education, communication and, where applicable, the purchase of products and services. Please feel free to browse the Site; however, your access to and use of the Site is subject to the following Terms of Use (“Terms”) and all applicable laws.
By accessing and browsing this Site, you accept, without limitation or qualification, these Terms. If you do not agree with any of these Terms, you should not use this Site. We reserve the right, in our sole discretion, to modify, alter or otherwise update these Terms at any time, and you agree to be bound by such modifications.

Intellectual Property Rights
All material on this Site (“Material”), including but not limited to text, images, graphics, product descriptions and illustrations, is protected by intellectual property laws and is owned and controlled by us or by third parties who have licensed their material to us. Material from this Site may not be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way.
You may not modify the Material or use the Material for any commercial purpose. The trademarks, logos and service marks displayed on the Site are our property or the property of third parties, and you are prohibited from using them without prior written permission.

Use of the Site
This Site is intended for personal, non-commercial use. You agree not to use the Site for any unlawful purpose or in any manner that could damage, disable or impair the Site. You also agree not to attempt to gain unauthorized access to any part of the Site or its systems.
Where applicable, any orders placed through the Site constitute an offer to purchase products, and we reserve the right to accept or reject such offers at our discretion.

Health and Information Disclaimer
The information provided on this Site is for general informational and educational purposes only and is not intended as medical advice. The content is not a substitute for professional medical consultation, diagnosis or treatment.
Any information relating to health, wellness, or products has not necessarily been evaluated by regulatory authorities. You should consult a qualified healthcare professional before using any product or relying on any information provided on this Site. Your reliance on such information is strictly at your own risk.

Linked Sites
We may provide links to websites operated by third parties (“Third Party Sites”). We do not control such sites and are not responsible for their content, accuracy, or availability. Accessing Third Party Sites is done at your own risk.

Disclaimer of Warranties
TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THIS SITE AND ALL MATERIALS ARE PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT.
WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS. WE MAKE NO REPRESENTATIONS OR GUARANTEES AS TO THE ACCURACY, COMPLETENESS OR RELIABILITY OF THE MATERIAL.

Limitation of Liability
UNDER NO CIRCUMSTANCES SHALL WE OR ANY PARTY INVOLVED IN CREATING, PRODUCING OR DELIVERING THE SITE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF YOUR ACCESS TO OR USE OF THE SITE OR THE MATERIAL.
YOU AGREE THAT YOUR USE OF THE SITE IS AT YOUR SOLE RISK AND THAT YOU WILL NOT RELY SOLELY ON THE MATERIAL PROVIDED WITHOUT SEEKING PROFESSIONAL ADVICE WHERE APPROPRIATE.

Limitation of Remedy
If you are dissatisfied with the Site or any Material, your sole and exclusive remedy is to discontinue using the Site.

Jurisdictional Issues
This Site is controlled and operated by us from our offices in [Insert Location]. We make no representation that the Material is appropriate or available for use in other locations. Those who choose to access this Site from other locations do so on their own initiative and are responsible for compliance with local laws.
These Terms shall be governed by and construed in accordance with the laws of [Insert Country, e.g., India/Ireland], and the courts of [Insert City] shall have exclusive jurisdiction.

Termination
This agreement is effective unless terminated by us. We may terminate or suspend your access to the Site at any time without notice if you fail to comply with these Terms. Upon termination, you must destroy all materials obtained from the Site.
The provisions relating to disclaimers, limitation of liability and governing law shall survive termination.

Other
If any provision of these Terms is found to be unlawful, void or unenforceable, that provision shall be deemed severable and shall not affect the validity of the remaining provisions.
We may revise these Terms at any time by updating this page. Your continued use of the Site signifies your agreement to such revisions.

`;

  const sections = content.trim().split("\n\n");

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Terms of Use
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Please read these terms carefully before using our services
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => {
            const lines = section.trim().split("\n");
            const title = lines[0];
            const paragraphs = lines.slice(1);

            return (
              <div key={index}>
                
                {/* Section Heading */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-gray-900 pl-3">
                  {title}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-3">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-gray-600 leading-relaxed text-sm md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-gray-400">
            Last updated: April 2026
          </p>
        </div>
      </div>
    </div>
  );
}