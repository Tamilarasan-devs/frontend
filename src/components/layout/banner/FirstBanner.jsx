import React, { useEffect, useRef, useState } from "react";
import banner from '../../../assets/images/rewards_desktop.webp'

export default function FirstBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-6 py-10">
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden shadow-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <img
          src={banner}
          alt="Banner"
          className="w-full"
          style={{
            transform: visible ? "scale(1)" : "scale(1.05)",
            transition: "transform 0.9s ease",
          }}
        />
      </div>
    </div>
  );
}