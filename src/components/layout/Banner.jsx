import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function Banner() {
  const containerRef = useRef(null);
  const [banners, setBanners] = useState([]);

  const allImages = [...banners, ...banners];

  // 🔁 Continuous Smooth Scroll
  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;
    let speed = 0.3; // 🔥 reduce speed here (lower = slower)

    const scroll = () => {
      if (!container) return;

      container.scrollLeft += speed;

      // Reset when half scrolled (for infinite loop)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 📡 Fetch banners
  const getBanners = async () => {
    try {
      const res = await axiosInstance.get("/homeBanner/getAllHomeBanner");
      setBanners(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden w-full gap-2"
    >
      {allImages.map((img, index) => (
        <img
          key={index}
          src={img.homeBanner}
          alt={`Banner ${index + 1}`}
          className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}