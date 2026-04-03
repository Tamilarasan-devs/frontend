import React from "react";
import { Flag, Smile } from "lucide-react";

export default function OurStory() {
  return (
    <div className="px-6 md:px-16 py-16 bg-[#f9f9f9]">
      <div className="text-center mb-12">
        <p className="text-3xl font-bold uppercase tracking-widest text-[#829b1c] mb-2 ">
          Our Story
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#03349a]">
          Empowering People, Driving Wellness
        </h2>
      </div>

      {/* 4 Column Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        
        {/* Column 1 */}
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Flag className="w-8 h-8 text-green-700" />
          <h3 className="text-xl font-semibold">20+ Years</h3>
          <p className="text-gray-600 text-sm">
            Empowering people to live better, healthier lives with our flagship brands Nutrilite & Artistry
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Flag className="w-8 h-8 text-green-700" />
          <h3 className="text-xl font-semibold">Unleashing Entrepreneurship</h3>
          <p className="text-gray-600 text-sm">
            Proud to have more than 5.50 lakh passionate distributors including &gt; 60% women
          </p>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Flag className="w-8 h-8 text-green-700" />
          <h3 className="text-xl font-semibold">Making In India</h3>
          <p className="text-gray-600 text-sm">
            Manufacturing in a state-of-the-art, LEED Gold Certified plant in Tamil Nadu
          </p>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Smile className="w-8 h-8 text-green-700" />
          <h3 className="text-xl font-semibold">100% Satisfaction</h3>
          <p className="text-gray-600 text-sm">
            We offer our customers a money-back guarantee & seamless product experience
          </p>
        </div>

      </div>
    </div>
  );
}