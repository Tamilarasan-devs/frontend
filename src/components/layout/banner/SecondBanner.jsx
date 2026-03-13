import React from "react";
import bnr from "../../../assets/images/bnr-1.webp";
import iconbc1 from "../../../assets/images/icon-bc1.svg";
import iconbc2 from "../../../assets/images/icon-bc2.svg";
import iconbc3 from "../../../assets/images/icon-bc3.svg";
import iconbc4 from "../../../assets/images/icon-bc4.svg";

export default function SecondBanner() {
  const data = [
    {
      icon: iconbc1,
      name: "Milk Is Our Signature Ingredient",
      category:
        "Our products are made with the goodness of Goat Milk, Rice Milk, Oat Milk, Almond Milk & Soy Milk.",
    },
    {
      icon: iconbc2,
      name: "Plant-Based Actives",
      category:
        "Our advanced formulations are infused with plant-derived actives that are safe & gentle for everyone.",
    },
    {
      icon: iconbc3,
      name: "FDA-Approved Lab",
      category:
        "Our in-house R&D experts build powerful, world-class formulations that are gentle on all skin types.",
    },
    {
      icon: iconbc4,
      name: "Cruelty-Free",
      category:
        "Our products are responsibly made, ethically created, and never tested on animals.",
    },
  ];

  return (
    <section
      className="py-16 px-6 bg-cover bg-center"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Grounded In Nature, Growing With Science
          </h2>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-14 h-14"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.category}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}