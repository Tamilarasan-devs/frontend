import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

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
    <section className="px-4 sm:px-6 lg:px-12 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          <span style={{ color: "#1a0a0a" }}>Explore </span>
          <span style={{ color: "#03349a" }}>Our </span>
          <span style={{ color: "#c9643a" }}>Categories</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Discover products tailored for you
        </p>
      </div>

      {/* Image Grid */}
<div className="grid grid-cols-2 sm:grid-cols-6 gap-6 px-4 sm:px-6 lg:px-12">
  {images.map((img, i) => (
    <div
      key={i}
      onClick={() => navigate("/productListing")}
      className="cursor-pointer overflow-hidden rounded-xl"
    >
      <img
        src={img}
        alt="category"
        className="h-30 w-50 transition-transform duration-500 hover:scale-110"
      />
    </div>
  ))}
</div>
    </section>
  );
}