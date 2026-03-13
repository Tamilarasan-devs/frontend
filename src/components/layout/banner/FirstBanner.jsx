import React from "react";
import banner from '../../../assets/images/rewards_desktop.webp'

export default function FirstBanner() {
  return (
    <div className="px-6 py-10">
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        <img
          src={banner}
          alt="Banner"
          className="w-full "
        />
      </div>
    </div>
  );
}