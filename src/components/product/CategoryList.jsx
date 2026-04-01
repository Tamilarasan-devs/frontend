import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function CategoryBannerList() {
  const [visible, setVisible] = useState(false);
  const [banners, setBanners] = useState([]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = "https://aayubakwath-backend.onrender.com/api/v1/categoryBanner/getCategoryBanner/";
  const BASE_URL = "https://aayubakwath-backend.onrender.com/";
  // const API_URL = "http://localhost:8080/api/v1/categoryBanner/getCategoryBanner/";
  // const BASE_URL = "http://localhost:8080/";

  // 🔹 Animation Observer
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Fetch Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success) {
          setBanners(data.date);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const BRAND = "#820c0c";
  const ACCENT = "#c9643a";

  // 🔹 Flatten images
  const allImages = banners.flatMap(item =>
    item.categoryBanner.map(img => ({
      id: item.id,
      img
    }))
  );

  const firstFour = allImages.slice(0, 4);
  const remaining = allImages.slice(4);

  return (
    <>
      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            color: #000000;
          }

          .swiper-button-prev:hover,
          .swiper-button-next:hover {
            color: #820c0c;
          }
        `}
      </style>
    
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-10">
      
      {/* Title */}
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10"
        style={{
          color: BRAND,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        Explore Our Categories
        <span
          className="block h-1 mx-auto mt-2 rounded-full"
          style={{
            background: ACCENT,
            width: visible ? "80px" : "0px",
            transition: "width 0.8s ease 0.4s",
          }}
        ></span>
      </h2>

      {/* 🔹 First 4 Images */}
    <div className="mt-6 px-4">
  <Swiper
    modules={[Navigation]}
    navigation={true}
    spaceBetween={20}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}
  >
    {banners.map((item, index) =>
      item.categoryBanner.map((img, i) => (
        <SwiperSlide key={`${item.id}-${i}`}>
          <div
            className="group cursor-pointer rounded-xl overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.95)",
              transition: `all 0.6s ease ${0.1 * index}s`,
            }}
          >
            {/* Image */}
            <div
              className="overflow-hidden rounded-xl group-hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate("/productListing")}
            >
              <img
                src={BASE_URL + img}
                alt="banner"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </SwiperSlide>
      ))
    )}
  </Swiper>
</div>


    </section>
    </>
  );
}