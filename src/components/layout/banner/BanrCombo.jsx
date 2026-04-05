import React, { useEffect, useState } from "react";
import { axiosInstance,API_URL } from "../../../utils/axiosInstance";

export default function  BanrCombo() {
  const [banner, setBanner] = useState(null);
  console.log(banner)
  const [loading, setLoading] = useState(true);

  // const API_URL = "https://aayubakwath-backend.onrender.com/";
  // const API_URL = "http://localhost:8080/";

  const getBanners = async () => {
    try {
      const res = await axiosInstance.get("/offerBanner/getAllOfferBanner");
console.log('sec ; ban',res)
      if (res.data.success && res.data.data.length > 0) {
        // ✅ Take first banner
        setBanner(res.data.data[1].offerBanner[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  // 🔹 Loading Skeleton
  if (loading) {
    return (
      <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse"></div>
    );
  }

  // 🔹 No banner
  if (!banner) return null;

  return (
    <div className="w-full overflow-hidden">

      {/* Full Banner */}
      <div className="relative w-full  group cursor-pointer">

        {/* Image */}
        <img
          src={banner}
          alt="Offer Banner"
          className="w-full  object-cover group-hover:scale-105 transition duration-700"
        />



      </div>

    </div>
  );
}