import React from "react";
import { ArrowRight } from "lucide-react";
import pro from '../../assets/images/grp.webp'
import pro1 from '../../assets/images/grp2.webp'
import pro2 from '../../assets/images/grp1.webp'
import pro3 from '../../assets/images/group.webp'
import pro4 from '../../assets/images/pro4.webp'


const categories = [
  {
    id: 1,
    image: pro,
  },
  {
    id: 2,
    image: pro1,
  },
  {
    id: 3,
    image: pro2,
  },
  {
    id: 4,
    image: pro3,
  },
 
];

export default function CategoryList() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 ">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#820c0c] mb-10">
       Explore Our Categories
        <span className="block w-20 h-1 bg-[#c9643a] mx-auto mt-2 rounded-full"></span>
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8  p-4 rounded-lg">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center cursor-pointer group p-4 rounded-lg  transition-colors duration-300"
          >
            {/* Circular Image */}
            <div className=" overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 "
              />
            </div>

            
          </div>
        ))}
      </div>
    </section>
  );
}