import React from "react";
import img1 from '../assets/images/nat:img/1.jpg'
import img2 from '../assets/images/nat:img/2.jpg'
import img3 from '../assets/images/nat:img/3.jpg'
import img4 from '../assets/images/nat:img/4.jpg'
import img5 from '../assets/images/nat:img/5.jpg'
import img6 from '../assets/images/nat:img/6.jpg'
import img7 from '../assets/images/nat:img/7.jpg'
export default function Certificate() {
  const features = [
    {
      label: "Purity Tested Ingredients",
      image:img1
    },
    {
      label: "Free from Toxins & Additives",
      image:
        img2
    },
    {
      label: "Herbal & Natural Formula",
      image:img3
    },
    {
      label: "Quality Assured Manufacturing",
      image:
        img4
    },
    {
      label: "GMP & ISO Certified Facility",
      image:
        img5
    },
    {
      label: "Clean & Safe Supplement",
      image:
img6
    },
    {
      label: "Made for Everyday Health",
      image:
        img7
    },
  ];

  return (
    <div className="overflow-hidden w-full py-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#820c0c]">
        Only Nature. Only Wellness.
      </h1>

      {/* Images in a horizontal row */}
      <div className="flex flex-wrap justify-center gap-20">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center w-32">
            <img
              src={feature.image}
              alt={feature.label}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-md font-semibold">{feature.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}