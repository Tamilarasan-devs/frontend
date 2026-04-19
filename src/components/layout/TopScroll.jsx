import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function TopScroll() {

//   const announcements = [
//   { title: "0% Harmful Chemicals" },
//   { title: "Manufactured in GMP & ISO 9001 Certified Facility" },
//   { title: "Made with Natural Ingredients" },
//   { title: "Power of Nature, Strength for Life" }
// ];
  const [announcements, setAnnouncements] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch announcements from API
  const getAnnouncements = async () => {
    try {
      const res = await axiosInstance.get("announcement/getAllAnnouncements");
      // Assuming res.data.data is an array of { id, title } objects
      setAnnouncements(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  // Automatic sliding
  useEffect(() => {
    if (announcements.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      (prev - 1 + announcements.length) % announcements.length
    );
  };

  if (loading) return null; // Or a small loader

  if (announcements.length === 0) return <h1 >No data</h1>; // Nothing to show

  return (
    <div
      className="text-white py-3 flex justify-center"
      style={{
        background:
          // "linear-gradient(90deg, #4a0000 0%, #8b0000 50%, #4a0000 100%)",
          "linear-gradient(90deg, #061e5a 0%, #0145cb 50%, #061e5a 100%)",


      }}
    >
      <div className="flex items-center w-full max-w-3xl justify-between px-4">

        {/* Left Arrow */}
        <button onClick={prevSlide} className="text-xl font-bold">
          ❮
        </button>

        {/* Message */}
        <div className="flex-1 text-center px-4">
          <h2 className="text-sm md:text-lg font-semibold">
            {announcements[index]?.title}
          </h2>
        </div>

        {/* Right Arrow */}
        <button onClick={nextSlide} className="text-xl font-bold">
          ❯
        </button>

      </div>
    </div>
  );
}