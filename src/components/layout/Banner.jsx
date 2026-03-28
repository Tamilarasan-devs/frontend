import React, { useEffect, useRef } from "react";
// import bnnr1 from "../../assets/images/bnnr1.avif";
// import bnnr2 from "../../assets/images/bnnr2.avif";
// import bnnr3 from "../../assets/images/bnnr3.avif";
// import bnnr4 from "../../assets/images/bnnr4.avif";
// import bnnr5 from "../../assets/images/bnnr5.avif";

import bnr1 from '../../assets/images/banners/bnr1.jpeg'
import bnr2 from '../../assets/images/banners/bnr2.jpeg'
import bnr3 from '../../assets/images/banners/bnr3.jpeg'
import bnr4 from '../../assets/images/banners/bnr4.jpeg'
import bnr5 from '../../assets/images/banners/bnr5.jpeg'
import bnr6 from '../../assets/images/banners/bnr6.jpeg'
import bnr7 from '../../assets/images/banners/bnr7.jpeg'
import bnr8 from '../../assets/images/banners/bnr8.jpeg'
import bnr9 from '../../assets/images/banners/bnr9.jpeg'
import bnr10 from '../../assets/images/banners/bnr10.jpeg'
import bnr11 from '../../assets/images/banners/bnr11.jpeg'
export default function Banner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      const width = container.offsetWidth;

      // responsive scroll size
      let scrollStep = width;
      if (window.innerWidth >= 768) scrollStep = width / 2;
      if (window.innerWidth >= 1024) scrollStep = width / 3;

      scrollAmount += scrollStep;

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (scrollAmount >= container.scrollWidth / 2) {
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "auto",
          });
          scrollAmount = 0;
        }, 500);
      }
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, []);

  const images = [bnr1,bnr2,bnr3
  ,bnr4,bnr5
  ,bnr6,bnr7,bnr8,bnr9,bnr10,bnr11
  ];
  const allImages = [...images, ...images];

  return (
    <div ref={containerRef} className="flex overflow-hidden w-full">
      {allImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 object-cover"
        />
      ))}
    </div>
  );
}