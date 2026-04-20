import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

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

  // duplicate for infinite loop
  const allImages = [...banners, ...banners];

  // -------------------------
  // 🎯 Manual smooth control (JS fallback + mobile support)
  // -------------------------
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let speed = 0.8;
    let isPaused = false;

    const animate = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;

        // seamless reset
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Pause on hover
    const pause = () => (isPaused = true);
    const resume = () => (isPaused = false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [banners]);

  // -------------------------
  // 📱 Basic drag support (mobile swipe)
  // -------------------------
  let isDown = false;
  let startX;
  let scrollLeft;

  const startDrag = (e) => {
    isDown = true;
    startX = e.pageX || e.touches?.[0].pageX;
    scrollLeft = trackRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown = false;
  };

  const moveDrag = (e) => {
    if (!isDown) return;
    const x = e.pageX || e.touches?.[0].pageX;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full overflow-hidden">
      {/* 🔥 SCROLL TRACK */}
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-hidden scroll-smooth"
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={moveDrag}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={moveDrag}
        style={{
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
        }}
      >
        {allImages.map((img, index) => (
          <img
            key={index}
            src={img.homeBanner}
            alt={`banner-${index}`}
            className="
              flex-shrink-0
              w-full sm:w-1/2 lg:w-1/3
              object-cover
              rounded-lg
              pointer-events-none
              select-none
            "
          />
        ))}
      </div>
    </div>
  );
}