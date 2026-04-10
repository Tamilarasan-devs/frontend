import React, { useState } from 'react';

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase for a full refund.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping fees may vary.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, we will email you a tracking number.",
  },
  {
    question: "Can I change my order after placing it?",
    answer: "Yes, you can modify your order within 24 hours of placing it.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team via email or live chat 24/7.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition"
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <span className="text-2xl text-gray-500 transform transition-transform duration-300">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;