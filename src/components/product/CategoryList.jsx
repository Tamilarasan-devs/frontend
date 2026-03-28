import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import pro from '../../assets/images/grp.webp'
import pro1 from '../../assets/images/grp2.webp'
import pro2 from '../../assets/images/grp1.webp'
import pro3 from '../../assets/images/Group.webp'
import pro4 from '../../assets/images/pro4.webp'


import cate1 from '../../assets/images/category/cate1.jpeg'
import cate2 from '../../assets/images/category/cate2.jpeg'
import cate3 from '../../assets/images/category/cate3.jpeg'
import cate4 from '../../assets/images/category/cate4.jpeg'
import cate5 from '../../assets/images/category/cate5.jpeg'

const categories = [
  {
    id: 1,
    image: cate1,
  },
  {
    id: 2,
    image: cate2,
  },
  {
    id: 3,
    image: cate3,
  },
  {
    id: 4,
    image: cate4,
  },
  {
    id: 5,
    image: cate5,
  },
];

export default function CategoryList() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-10">
      {/* Section Title */}
      <h2
        className="text-2xl sm:text-3xl font-bold text-center text-[#0c2460] mb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        Explore Our Categories 
        <span
          className="block h-1 bg-[#729cfc] mx-auto mt-2 rounded-full"
          style={{
            width: visible ? "80px" : "0px",
            transition: "width 0.8s ease 0.4s",
          }}
        ></span>
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 p-4 rounded-lg">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center cursor-pointer group p-4 rounded-lg transition-colors duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
              transition: `opacity 0.6s ease ${0.15 * index + 0.2}s, transform 0.6s ease ${0.15 * index + 0.2}s`,
            }}
          >
            {/* Circular Image */}
            <div className="overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}