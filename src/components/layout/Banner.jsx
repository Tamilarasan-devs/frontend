import React, { useEffect, useRef } from 'react';
import bnnr1 from '../../assets/images/bnnr1.avif';
import bnnr2 from '../../assets/images/bnnr2.avif';
import bnnr3 from '../../assets/images/bnnr3.avif';
import bnnr4 from '../../assets/images/bnnr4.avif';
import bnnr5 from '../../assets/images/bnnr5.avif';

export default function Banner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      scrollAmount += container.offsetWidth / 3; // scroll by one image width
      if (scrollAmount >= container.scrollWidth / 2) {
        // reset to start for infinite loop
        scrollAmount = 0;
      }
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }, 2000); // change image every 2 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  // Duplicate images for seamless infinite scroll
  const images = [bnnr1, bnnr2, bnnr3, bnnr4, bnnr5];
  const allImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden w-full"
      style={{ scrollBehavior: 'smooth' }}
    >
      {allImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className="w-1/3 flex-shrink-0 object-cover"
        />
      ))}
    </div>
  );
}