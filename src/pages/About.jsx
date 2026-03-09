import React,{useState} from "react";
import img from "../assets/images/banner1.jpg";
import mission from '../assets/images/mission.jpg';
import vision from '../assets/images/vission.jpg'
import FeaturesSection from "./AboutCard";
import bnr from '../assets/images/bn.png'
import img0 from '../assets/images/emp.png'
import img1 from '../assets/images/cont.png'
import img2 from '../assets/images/the.png'
import img3 from '../assets/images/ com.png'


const CRIMSON = "#820c0c";
const AMBER = "#c9643a";
const BG = "#fefbf6";
const CREAM = "#f5ede0";
const MUTED = "#7a4040";
export default function About() {
    
  const products = [
    {
      icon: "🩸",
      name: "Blood Sugar Balance",
      desc: "Supports healthy glucose metabolism and insulin function with powerful herbal extracts.",
    },
    {
      icon: "💚",
      name: "Blood Cholesterol Balance",
      desc: "Supports lipid metabolism and cardiovascular wellness with botanical ingredients.",
    },
    {
      icon: "🧠",
      name: "Brain Tonic & Vitality Plus",
      desc: "Enhances memory, focus, and cognitive clarity using natural nootropic herbs.",
    },
    {
      icon: "⚡",
      name: "Vitality Power Plus",
      desc: "Boosts stamina, energy levels, and overall vitality with adaptogenic herbs.",
    },
    {
      icon: "🌿",
      name: "General Health",
      desc: "Supports overall well-being with essential daily herbal nutrients.",
    },
  ];

  return (
    <div className="bg-[#fefbf6] text-gray-800">

     {/* HERO SECTION */}
<section className="w-full">
  
  {/* Image */}
  <div className="h-[60vh] w-full overflow-hidden">
    <img
      src={bnr}
      alt="About Banner"
      className="w-full h-full object-cover"
    />
  </div>

<FeaturesSection/>
  {/* Text Below Image */}
 <section className="bg-[#fefbf6] py-24 px-6">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-14">
      <h1 className="text-4xl md:text-5xl font-bold text-[#820c0c]">
        About <span className="text-[#c9643a]">Aayubakawath</span>
      </h1>
      <span className="block w-24 h-1 bg-[#c9643a] mx-auto mt-4 rounded-full"></span>
    </div>

    {/* Content Card */}
    <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 space-y-8">

      <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
        Premium herbal supplements thoughtfully crafted to support
        modern wellness and everyday vitality.
      </p>

      <div className="grid md:grid-cols-2 gap-10 text-gray-600 leading-relaxed text-lg">
        
        <p>
          <span className="font-semibold text-[#820c0c]">
            Aayubakawath
          </span>{" "}
          was created with a simple mission — to provide high-quality,
          science-backed, and herbal-based nutritional supplements that
          help people maintain a healthy and balanced lifestyle.
          In today’s fast-paced world, maintaining proper nutrition
          through diet alone can be challenging.
        </p>

        <p>
          Our carefully formulated supplements are designed to bridge
          that gap. All products are manufactured by
          <span className="font-semibold text-[#820c0c]">
            {" "}Sri Bhakawath Life Science
          </span>,
          ensuring quality production standards and safe ingredient sourcing.
        </p>

      </div>

    </div>

  </div>
</section>
</section>

{/* left right comb */}

<section className="py-20 bg-gray-50">
  <div className="container mx-auto space-y-20">

    {/* Item 1 - Image Left, Content Right */}
    <div className="flex flex-col md:flex-row items-center gap-12">
      <img 
        src={img0} 
        alt="Centrum India Vision" 
        className="w-full md:w-1/2 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
      />
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold" 
            style={{background: `linear-gradient(90deg, ${CRIMSON}, ${AMBER})`, WebkitBackgroundClip: "text", color: "transparent", textShadow: "0 2px 6px rgba(130,12,12,0.4)"}}>
          Centrum India Vision
        </h2>
        <p className="text-2xl font-semibold text-gray-800">TAILORED NUTRITION FOR EVERY LIFE STAGE</p>
        <p className="text-lg text-gray-700">
          It all started with a vision to develop a comprehensive multivitamin that meets the unique nutritional needs of individuals across different stages of life.
        </p>
        <p className="text-lg text-gray-700">
          Backed by extensive research and collaboration with top experts, we created Centrum, a brand trusted by millions worldwide.
        </p>
      </div>
    </div>

    {/* Item 2 - Image Right, Content Left */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
      <img 
        src={img1} 
        alt="Continuous Evolution" 
        className="w-full md:w-1/2 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
      />
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold" 
            style={{background: `linear-gradient(90deg, ${CRIMSON}, ${AMBER})`, WebkitBackgroundClip: "text", color: "transparent", textShadow: "0 2px 6px rgba(130,12,12,0.4)"}}>
          Continuous Evolution
        </h2>
        <p className="text-2xl font-semibold text-gray-800">ADVANCING SCIENCE FOR YOUR WELL-BEING</p>
        <p className="text-lg text-gray-700">
          Our journey has been one of continuous evolution and refinement. We strive to stay at the forefront of scientific advancements, incorporating the latest discoveries into our formulations.
        </p>
        <p className="text-lg text-gray-700">
          Each Centrum product is carefully crafted to deliver vital vitamins, minerals, and nutrients your body needs to thrive and fill nutritional gaps.
        </p>
      </div>
    </div>

    {/* Item 3 - Image Left, Content Right */}
    <div className="flex flex-col md:flex-row items-center gap-12">
      <img 
        src={img2} 
        alt="Empowering Wellness" 
        className="w-full md:w-1/2 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
      />
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold" 
            style={{background: `linear-gradient(90deg, ${CRIMSON}, ${AMBER})`, WebkitBackgroundClip: "text", color: "transparent", textShadow: "0 2px 6px rgba(130,12,12,0.4)"}}>
          Empowering Your Wellness
        </h2>
        <p className="text-2xl font-semibold text-gray-800">KNOWLEDGE & SUPPORT FOR YOUR JOURNEY</p>
        <p className="text-lg text-gray-700">
          Our mission goes beyond just providing high-quality supplements. We are here to empower you with knowledge and support, helping you make informed choices for your health.
        </p>
        <p className="text-lg text-gray-700">
          Through educational resources, expert advice, and a strong community, we aim to inspire and guide you on your wellness journey.
        </p>
      </div>
    </div>

    {/* Item 4 - Image Right, Content Left */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
      <img 
        src={img3} 
        alt="Commitment To Quality" 
        className="w-full md:w-1/2 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
      />
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold" 
            style={{background: `linear-gradient(90deg, ${CRIMSON}, ${AMBER})`, WebkitBackgroundClip: "text", color: "transparent", textShadow: "0 2px 6px rgba(130,12,12,0.4)"}}>
          Commitment To Quality
        </h2>
        <p className="text-2xl font-semibold text-gray-800">TRUSTWORTHY FORMULATIONS FOR YOU</p>
        <p className="text-lg text-gray-700">
          Centrum is more than just a brand – it's a trusted partner that you can rely on. We are committed to your well-being, ensuring that our products are safe, effective, and backed by rigorous quality standards.
        </p>
        <p className="text-lg text-gray-700">
          With Centrum, you can feel confident in nourishing your body and unlocking your full potential.
        </p>
      </div>
    </div>

  </div>
</section>




<div className="max-w-7xl mx-auto bg-[#f5ede0] mt-14 px-6 py-20 space-y-24">

  {/* ================= MISSION ================= */}
  <section className="grid md:grid-cols-2 gap-14 items-center">
    
    {/* LEFT IMAGE */}
    <div>
      <img
        src={mission}
        alt="Mission"
        className="w-full h-[350px] object-cover rounded-2xl shadow-xl"
      />
    </div>

    {/* RIGHT CONTENT */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-[#820c0c] mb-6">
        Our Mission
        <span className="block w-20 h-1 bg-[#c9643a] mt-3 rounded-full"></span>
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-gray-800">
        Aayubakawath was created to provide science-backed,
        herbal-based nutritional supplements that help individuals
        maintain a healthy and balanced lifestyle.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Manufactured by Sri Bhakawath Life Science, our products
        follow strict quality standards and safe ingredient sourcing
        to ensure reliability and trust.
      </p>
    </div>
  </section>


  {/* ================= VISION ================= */}
  <section className="grid md:grid-cols-2 gap-14 items-center">

    {/* LEFT CONTENT */}
    <div className="order-2 md:order-1">
      <h2 className="text-3xl md:text-4xl font-bold text-[#820c0c] mb-6">
        Our Vision
        <span className="block w-20 h-1 bg-[#c9643a] mt-3 rounded-full"></span>
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-gray-800">
        Our vision is to become a trusted leader in herbal wellness
        by delivering innovative, safe, and effective nutritional
        solutions for modern lifestyles.
      </p>

      <p className="text-gray-600 leading-relaxed">
        We aim to empower individuals to take control of their
        well-being through thoughtfully designed supplements
        rooted in tradition and backed by science.
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="order-1 md:order-2">
      <img
        src={vision}
        alt="Vision"
        className="w-full h-[350px] object-cover rounded-2xl shadow-xl"
      />
    </div>

  </section>

</div>
      

      {/* PRODUCT SECTION */}
      <section className="bg-gradient-to-br from-white to-[#f5ede0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#820c0c] mb-4">
              Our Product Range
                <span className="block w-20 h-1 bg-[#c9643a] mx-auto mt-2 rounded-full"></span>
            </h2>
            <p className="text-gray-600">
              Specialized formulations supporting key health areas
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
            {products.map((p, i) => <ProductCard key={i} {...p} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        
        <div>
          <h2 className="text-3xl font-bold text-[#820c0c] mb-6">
            Why Choose Aayubakawath?
          </h2>

          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-[#820c0c] font-bold">✔</span>
              Premium quality herbal ingredients
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#820c0c] font-bold">✔</span>
              Scientifically designed formulations
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#820c0c] font-bold">✔</span>
              Manufactured under quality-controlled environment
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#820c0c] font-bold">✔</span>
              Safe & convenient capsule format
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#820c0c] font-bold">✔</span>
              Made in India
            </li>
          </ul>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://media.istockphoto.com/id/858309414/photo/why-choose-us.jpg?s=612x612&w=0&k=20&c=eagefEzm_QPMo3WFaDwlxqSA3qnfDTxN2PFuKhxuSac="
            alt="Wellness"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

     {/* COMMITMENT SECTION */}
<section className="bg-[#f5ede0] py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-[#820c0c] mb-6">
        Our Commitment to Quality
        <span className="block w-20 h-1 bg-[#c9643a] mt-3 rounded-full"></span>
      </h2>

      <p className="text-gray-700 leading-relaxed text-lg">
        We follow strict quality guidelines during sourcing, formulation,
        and manufacturing. Every batch is produced with hygiene,
        consistency, and care to ensure premium standards.
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div>
      <h3 className="text-2xl font-semibold text-[#820c0c] mb-8">
        Our Products Are:
        <span className="block w-16 h-1 bg-[#c9643a] mt-3 rounded-full"></span>
      </h3>

      <div className="space-y-5">
        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#820c0c]">
          Not intended to replace a balanced diet
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#820c0c]">
          Not for medicinal use
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#820c0c]">
          Recommended to be taken as per suggested usage
        </div>
      </div>
    </div>

  </div>
</section>

    </div>
  );
}

function ProductCard({ icon, name, desc, tags }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-fiu
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 4,
        padding: "36px 32px",
        border: `1px solid rgba(130,12,12,0.08)`,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 56px rgba(130,12,12,0.1)" : "none",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: 3,
          height: hovered ? "100%" : "0%",
          background: `linear-gradient(to bottom, ${CRIMSON}, ${AMBER})`,
          transition: "height 0.4s ease",
        }}
      />
      <div
        style={{
          width: 48, height: 48,
          borderRadius: 12,
          background: `linear-gradient(135deg, rgba(130,12,12,0.06), rgba(201,100,58,0.1))`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: CRIMSON, marginBottom: 10, lineHeight: 1.3 }}>
        {name}
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 400, lineHeight: 1.75, color: MUTED }}>
        {desc}
      </p>
    </div>
  );
}