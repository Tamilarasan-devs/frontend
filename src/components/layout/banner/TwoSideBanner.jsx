import React from 'react';
import img1 from '../../../assets/images/img1.jpg';
import img2 from '../../../assets/images/img2.jpg';

export default function TwoSideBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-96">
      {/* Left Side */}
      <div className="flex-1 overflow-hidden rounded-lg">
        <img 
          src={img1} 
          alt="Left Banner" 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1 overflow-hidden rounded-lg">
        <img 
          src={img2} 
          alt="Right Banner" 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}