import React, { useState, useRef, useEffect } from "react";

import beforeImg1 from "../../assets/images/pro1.webp";
import afterImg1 from "../../assets/images/pro.webp";

import beforeImg2 from "../../assets/images/pro2.webp";
import afterImg2 from "../../assets/images/img1.jpg";

import beforeImg3 from "../../assets/images/pro3.webp";
import afterImg3 from "../../assets/images/img2.jpg";

export default function BeforeAfterGrid() {

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const [position1, setPosition1] = useState(50);
  const [position2, setPosition2] = useState(50);
  const [position3, setPosition3] = useState(50);

  const [dragging1, setDragging1] = useState(false);
  const [dragging2, setDragging2] = useState(false);
  const [dragging3, setDragging3] = useState(false);

  // --- Animation state ---
  const sectionRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card3Visible, setCard3Visible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          setTimeout(() => setCard1Visible(true), 200);
          setTimeout(() => setCard2Visible(true), 380);
          setTimeout(() => setCard3Visible(true), 560);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);
  // --- End animation state ---

  const startDrag1 = () => setDragging1(true);
  const startDrag2 = () => setDragging2(true);
  const startDrag3 = () => setDragging3(true);

  const stopDrag1 = () => setDragging1(false);
  const stopDrag2 = () => setDragging2(false);
  const stopDrag3 = () => setDragging3(false);

  // ---------- MOUSE MOVE ----------
  const handleMove1 = (e) => {
    if (!dragging1) return;
    const rect = containerRef1.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition1(Math.max(0, Math.min(100, percent)));
  };

  const handleMove2 = (e) => {
    if (!dragging2) return;
    const rect = containerRef2.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition2(Math.max(0, Math.min(100, percent)));
  };

  const handleMove3 = (e) => {
    if (!dragging3) return;
    const rect = containerRef3.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition3(Math.max(0, Math.min(100, percent)));
  };

  // ---------- TOUCH MOVE ----------
  const handleTouchMove1 = (e) => {
    if (!dragging1) return;
    const rect = containerRef1.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition1(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove2 = (e) => {
    if (!dragging2) return;
    const rect = containerRef2.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition2(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove3 = (e) => {
    if (!dragging3) return;
    const rect = containerRef3.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition3(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div ref={sectionRef} className="max-w-full-lg mx-auto space-y-12 p-10">

      {/* Heading */}
      <div
        style={{
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? "translateY(0)" : "translateY(-28px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}
      >
        <h1 className="text-3xl font-bold flex justify-center text-[#820c0c] text-center">
          Over 1 Million People Trust Aayubakawath
        </h1>

        <div
          className="h-1 bg-[#c9643a] mx-auto rounded-full mb-4 mt-4"
          style={{
            width: headingVisible ? 96 : 0,
            transition: "width 0.7s ease 0.3s",
          }}
        ></div>

        <h1 className="text-xl font-semibold flex justify-center text-[#820c0c] text-center">
          Explore Clinically Proven Formulations For South Indian Skin & Hair
        </h1>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div
          className="bg-white rounded-2xl shadow-lg p-4"
          style={{
            opacity: card1Visible ? 1 : 0,
            transform: card1Visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
          }}
        >
          <div
            ref={containerRef1}
            className="relative h-[320px] rounded-xl overflow-hidden touch-none"
            onMouseMove={handleMove1}
            onMouseUp={stopDrag1}
            onMouseLeave={stopDrag1}
            onTouchMove={handleTouchMove1}
            onTouchEnd={stopDrag1}
          >
            <img src={beforeImg1} className="absolute inset-0 w-full h-full object-cover" />

            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position1}%` }}
            >
              <img src={afterImg1} className="w-full h-full object-cover" />
            </div>

            <div style={{ left: `${position1}%` }} className="absolute top-0 h-full w-[2px] bg-white">
              <div
                onMouseDown={startDrag1}
                onTouchStart={startDrag1}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              BEFORE
            </span>

            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              AFTER
            </span>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className="bg-white rounded-2xl shadow-lg p-4"
          style={{
            opacity: card2Visible ? 1 : 0,
            transform: card2Visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
          }}
        >
          <div
            ref={containerRef2}
            className="relative h-[320px] rounded-xl overflow-hidden touch-none"
            onMouseMove={handleMove2}
            onMouseUp={stopDrag2}
            onMouseLeave={stopDrag2}
            onTouchMove={handleTouchMove2}
            onTouchEnd={stopDrag2}
          >
            <img src={beforeImg2} className="absolute inset-0 w-full h-full object-cover" />

            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position2}%` }}
            >
              <img src={afterImg2} className="w-full h-full object-cover" />
            </div>

            <div style={{ left: `${position2}%` }} className="absolute top-0 h-full w-[2px] bg-white">
              <div
                onMouseDown={startDrag2}
                onTouchStart={startDrag2}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              BEFORE
            </span>

            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              AFTER
            </span>
          </div>
        </div>

        {/* CARD 3 */}
        <div
          className="bg-white rounded-2xl shadow-lg p-4"
          style={{
            opacity: card3Visible ? 1 : 0,
            transform: card3Visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
          }}
        >
          <div
            ref={containerRef3}
            className="relative h-[320px] rounded-xl overflow-hidden touch-none"
            onMouseMove={handleMove3}
            onMouseUp={stopDrag3}
            onMouseLeave={stopDrag3}
            onTouchMove={handleTouchMove3}
            onTouchEnd={stopDrag3}
          >
            <img src={beforeImg3} className="absolute inset-0 w-full h-full object-cover" />

            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position3}%` }}
            >
              <img src={afterImg3} className="w-full h-full object-cover" />
            </div>

            <div style={{ left: `${position3}%` }} className="absolute top-0 h-full w-[2px] bg-white">
              <div
                onMouseDown={startDrag3}
                onTouchStart={startDrag3}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              BEFORE
            </span>

            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              AFTER
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}