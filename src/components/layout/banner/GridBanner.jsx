import React from "react";
import img1 from "../../../assets/images/bhb.png";
import img2 from "../../../assets/images/bthb.png";
import img3 from "../../../assets/images/ghb.png";

export default function GridBanner() {
  return (
    <div className="px-6 py-10">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Large Banner */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-[500px]">
          <img
            src={img1}
            alt="Main Banner"
            className="w-[900px] h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Right Side (2 stacked images) */}
        <div className="flex flex-col gap-6">
          
          {/* Top Right */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[235px]">
            <img
              src={img3}
              alt="Top Banner"
              className="w-[900px] h-[450px] object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          {/* Bottom Right */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[235px]">
            <img
              src={img2}
              alt="Bottom Banner"
              className="w-[900px] h-[450px] object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </div>
  );
}