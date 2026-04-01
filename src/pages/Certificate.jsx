import React from "react";

export default function Certificate() {
  const features = [
    {
      label: "Purity Tested Ingredients",
      image:
        "https://img.freepik.com/premium-vector/premium-ingredients-icon-vector-flat-thin-line-illustration_1223784-31773.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      label: "Free from Toxins & Additives",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/016/872/211/small/no-additives-icon-design-free-vector.jpg",
    },
    {
      label: "Herbal & Natural Formula",
      image:
        "https://media.gettyimages.com/id/2157335082/vector/herbal-medicine-duocolor-line-icon-design-with-editable-stroke.jpg?s=612x612&w=0&k=20&c=ZsR8D3oGBr76nC8MLCPyeFhQK6Y81dD0-w2LLN984Ds=",
    },
    {
      label: "Quality Assured Manufacturing",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/077/137/314/small/award-badge-icon-with-checkmark-and-certificate-design-element-in-simple-style-featuring-graphic-symbol-achievement-with-recognition-and-verification-elements-for-approval-confirmation-projects-vector.jpg",
    },
    {
      label: "GMP & ISO Certified Facility",
      image:
        "https://t4.ftcdn.net/jpg/19/14/05/67/360_F_1914056798_kNkErZfZ142SYzPDLvZJgr4fQZidpCIY.jpg",
    },
    {
      label: "Clean & Safe Supplement",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/070/405/729/small/icon-a-supplement-isolated-against-a-clean-background-free-vector.jpg",
    },
    {
      label: "Made for Everyday Health",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/019/974/777/small/healthy-icon-design-free-vector.jpg",
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