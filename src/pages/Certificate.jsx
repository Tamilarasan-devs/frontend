import React from "react";
import iso from "../assets/images/iso-img.webp";
import gmp from "../assets/images/gmp-img.webp";

export default function Certificate() {
  const certs = [iso, gmp, iso, gmp, iso, gmp, iso, gmp];

  return (
    <div className="overflow-hidden w-full py-6 bg-white">
      <div className="flex w-max animate-scroll gap-8">
        {[...certs, ...certs].map((img, i) => (
          <img
            key={i}
            src={img}
            alt="certificate"
          className={`rounded-full object-cover ${
  i % 2 === 0 ? "w-48 h-48" : "w-36 h-36 mt-4"
}`}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 18s linear infinite;
          }
        `}
      </style>
    </div>
  );
}