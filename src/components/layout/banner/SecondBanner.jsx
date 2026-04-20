import React, { useEffect, useRef, useState } from "react";
import iconbc2 from "../../../assets/images/gmo.jpg";
import iconbc1 from "../../../assets/images/noadd.jpg";
import iconbc3 from "../../../assets/images/gltn.jpg";
import iconbc4 from "../../../assets/images/sugar.jpg";
import ShopPageBanner from "./ShopPageBanner";

export default function SecondBanner() {
  const data = [
    {
      icon: iconbc1,
      name: "Preservative Free",
      category:
        "No artificial preservatives added. Maintains natural purity and is safe for daily use.",
    },
    {
      icon: iconbc2,
      name: "GMO Free",
      category:
        "Made with non-GMO ingredients. No genetic modification, ensuring a pure and natural formulation.",
    },
    {
      icon: iconbc3,
      name: "Gluten Free",
      category:
        "Completely free from gluten. Suitable for gluten-sensitive individuals and gentle on digestion.",
    },
    {
      icon: iconbc4,
      name: "No Added Sugar",
      category:
        "Contains no added sugar. Supports healthy lifestyle choices with a naturally balanced formulation.",
    },
  ];

  const sectionRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState([false, false, false, false]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          data.forEach((_, i) => {
            setTimeout(() => {
              setCardVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 200 + i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-cover bg-center">
      <ShopPageBanner />
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div
          className="text-center mb-12"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(-24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span style={{ color: "#03349a" }}>Pure, Clean & </span>
            <span style={{ color: "#c9643a" }}>Conscious Choices</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
              style={{
                opacity: cardVisible[index] ? 1 : 0,
                transform: cardVisible[index]
                  ? "translateY(0) scale(1)"
                  : "translateY(36px) scale(0.96)",
                transition:
                  "opacity 0.55s ease, transform 0.55s cubic-bezier(.22,.68,0,1.15)",
              }}
            >
              <div
                className="flex justify-center mb-4"
                style={{
                  opacity: cardVisible[index] ? 1 : 0,
                  transform: cardVisible[index]
                    ? "scale(1) rotate(0deg)"
                    : "scale(0.6) rotate(-15deg)",
                  transition:
                    "opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(.22,.68,0,1.4) 0.15s",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-14 h-14"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>

              <p className="text-md text-gray-800 ">
                {item.category}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}