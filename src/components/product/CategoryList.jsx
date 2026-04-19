import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { API_URL ,axiosInstance} from "../../utils/axiosInstance";

import "swiper/css";
import "swiper/css/navigation";

export default function CategoryBannerList() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axiosInstance.get("/categoryBanner/getCategoryBanner");
        if (res.data.success) {
          setBanners(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanners();
  }, []);

  const images = banners.flatMap(item => item.categoryBanner);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">

  {/* 🔹 Top Row (3 cards) */}
  <div className="grid grid-cols-3 gap-4 mb-4">
    {images.slice(0, 3).map((img, i) => (
      <div
        key={i}
        onClick={() => navigate("/productListing")}
        className="group cursor-pointer rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="h-28 flex items-center justify-center p-3">
          <img
            src={img}
            alt="category"
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    ))}
  </div>

  {/* 🔹 Bottom Row (2 bigger cards) */}
  <div className="grid grid-cols-2 gap-4">
    {images.slice(3, 5).map((img, i) => (
      <div
        key={i}
        onClick={() => navigate("/productListing")}
        className="group cursor-pointer rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="h-32 sm:h-36 flex items-center justify-center p-4">
          <img
            src={img}
            alt="category"
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    ))}
  </div>

</section>
  );
}