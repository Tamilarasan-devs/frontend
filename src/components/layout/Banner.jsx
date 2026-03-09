import React, { useEffect, useRef } from "react";
import bnnr1 from "../../assets/images/bnnr1.avif";
import bnnr2 from "../../assets/images/bnnr2.avif";
import bnnr3 from "../../assets/images/bnnr3.avif";
import bnnr4 from "../../assets/images/bnnr4.avif";
import bnnr5 from "../../assets/images/bnnr5.avif";

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

  const images = [bnnr1, bnnr2, bnnr3, bnnr4, bnnr5];
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