import React from "react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/images/q3.jpg'
export default function OurStory() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-stone-800">
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight flex flex-col items-start gap-2">
            <div>
              <span className="text-black">Our</span>{" "}
              <span className="text-[#03349a]">Roots</span>
            </div>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#03349a] to-[#c9643a]" />
          </h1>

          <p className="text-lg text-stone-600">
            Founded on a simple, powerful vision.
          </p>

          <p className="text-stone-600 leading-relaxed">
            Aayubakwath was founded to support healthier lives through natural
            wellness solutions. In today's fast-paced world, people face
            increasing health challenges — unstable blood sugar, high
            cholesterol, mental fatigue, poor concentration in children, and
            general lifestyle-related issues.
          </p>

          <p className="text-stone-600 leading-relaxed">
            Our mission is to bring balance back to everyday life using trusted,
            natural ingredients and time-tested practices.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/about")}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition"
          >
            Learn More About Us →
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src={img}
            alt="natural wellness"
            className="w-full h-[400px] object-cover rounded-2xl shadow-sm"
          />

          {/* Decorative Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold shadow">
            Natural • Trusted • Effective
          </div>
        </div>
      </div>

      {/* Highlight Section */}
      <div className="bg-stone-50 py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold">🌿 Natural Ingredients</h3>
            <p className="text-stone-600 text-sm">
              Carefully selected for purity and effectiveness.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">💚 Holistic Wellness</h3>
            <p className="text-stone-600 text-sm">
              Supporting body and mind together.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">⚡ Modern Lifestyle Fit</h3>
            <p className="text-stone-600 text-sm">
              Designed for today’s fast-paced world.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}