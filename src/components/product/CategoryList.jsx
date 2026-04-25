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
          <style>{`
        :root { --red:#03349a; --amber:#c9643a; --cream:#fdf8f4; }
        @keyframes shim{0%{background-position:200% center}100%{background-position:-200% center}}
        .shim-btn{background:linear-gradient(90deg,var(--red),var(--amber),#c2410c,var(--red));background-size:200% auto;animation:shim 3s linear infinite;}
        .nav-hover:hover { color: #0337a4 !important; }
      `}</style>
      {/* Title */}
      <div className="text-center mb-10">
          <h2 className="inline-block text-3xl font-bold tracking-tight text-[#0f296a]">
  Explore Our Categories
</h2>
      
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