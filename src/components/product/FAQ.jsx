import React, { useState } from 'react';

const faqs = [
  {
    question: "Blood Cholesterol Support",
    answer: `How does this nutraceutical help maintain healthy cholesterol levels naturally?
It supports lipid metabolism using herbs like berberine, garlic, and green tea to help balance cholesterol naturally.

Can I take this product if I already have high cholesterol medication?
It is best to consult your healthcare provider before combining it with prescription cholesterol medicines.

How long does it usually take to notice improvements in cholesterol balance?
Visible improvements may typically be seen with consistent use over 6–12 weeks.

Does this formulation also help support heart and vascular health?
Yes, it supports overall cardiovascular health through antioxidant and lipid-balancing action.

What makes this combination of herbs effective for lipid metabolism?
The synergistic blend targets multiple pathways like fat absorption, synthesis, and clearance.`,
  },
  {
    question: "Blood Sugar Support",
    answer: `How does this product help support healthy blood glucose levels?
It supports glucose metabolism and insulin function using berberine, cinnamon, and fenugreek.

Can it help reduce post-meal sugar spikes?
Yes, it helps slow carbohydrate absorption to reduce post-meal glucose spikes.

Is it safe to take this along with diabetic medication?
Consult your doctor before combining it with anti-diabetic medications.

How do ingredients like berberine and cinnamon work together in this formula?
They work synergistically to improve insulin sensitivity and glucose utilization.

Can this be used for long-term blood sugar management?
Yes, it is designed for regular use to support long-term metabolic balance.`,
  },
  {
    question: "Brain Tonic",
    answer: `How does this nutraceutical support memory and cognitive function?
It enhances brain function using Bacopa, Ginkgo, and Ashwagandha for memory and focus support.

Can it help with stress-related mental fatigue and lack of focus?
Yes, it helps reduce mental fatigue and supports stress resilience.

Is it suitable for students or professionals with high mental workload?
Yes, it is suitable for individuals needing sustained mental performance.

How do herbs like Bacopa and Ginkgo support brain health?
They support neurotransmission and improve cerebral blood flow for better cognition.

How long does it take to notice improvements in focus and clarity?
Consistent use for 4–8 weeks may support noticeable cognitive benefits.`,
  },
  {
    question: "General Health",
    answer: `What daily health benefits can I expect from this nutraceutical?
It supports energy, immunity, metabolism, and overall daily wellness.

Can it help improve energy levels and reduce fatigue naturally?
Yes, it helps reduce fatigue and supports natural energy production.

Is this suitable for long-term daily wellness support?
Yes, it is designed for safe long-term daily health maintenance.

How does this product support immunity and stress balance?
It uses adaptogens like Ashwagandha to support stress response and immunity.

Can it be combined with other supplements or vitamins?
Yes, it can generally be combined, but medical advice is recommended.`,
  },
  {
    question: "Vitality Power Plus",
    answer: `How does this product help improve stamina and physical performance?
It enhances energy and endurance using Shilajit, Ginseng, and Ashwagandha.

Is it suitable for people experiencing low energy or fatigue?
Yes, it is formulated to help combat fatigue and boost vitality.

How do ingredients like Shilajit and Ginseng enhance vitality?
They support mitochondrial energy production and physical endurance.

Can this help with both physical and mental endurance?
Yes, it supports both physical stamina and mental resilience.

When is the best time to take this for maximum energy benefits?
It is generally best taken in the morning for optimal energy support.`,
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
              <p className="text-gray-700 whitespace-pre-line">
  {faq.answer}
</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;