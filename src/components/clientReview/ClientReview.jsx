import React, { useState, useRef } from "react";
import beforeImg1 from "../../assets/images/pro1.webp";
import afterImg1 from "../../assets/images/pro.webp";
import beforeImg2 from "../../assets/images/pro2.webp"; // Add image path
import afterImg2 from "../../assets/images/img1.jpg"; // Add image path
import beforeImg3 from "../../assets/images/pro3.webp"; // Add image path
import afterImg3 from "../../assets/images/img2.jpg"; // Add image path

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

  const startDrag1 = () => setDragging1(true);
  const startDrag2 = () => setDragging2(true);
  const startDrag3 = () => setDragging3(true);

  const stopDrag1 = () => setDragging1(false);
  const stopDrag2 = () => setDragging2(false);
  const stopDrag3 = () => setDragging3(false);

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

  return (
    <div className="max-w-full-lg mx-auto space-y-12  p-10">
      {/* Before-After Grid Section */}
      <div>

        <h1 className="text-3xl font-bold flex justify-center text-[#820c0c]" >Over 1 Million People Trust Aayubakawath</h1>
        <div className="w-24 h-1 bg-[#c9643a] mx-auto rounded-full mb-4  mt-4"></div>

        <h1 className="text-xl font-semibold flex justify-center text-[#820c0c]">Explore Clinically Proven Formulations For South Indian Skin & Hair</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Before-After Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div
            ref={containerRef1}
            className="relative h-[320px] rounded-xl overflow-hidden"
            onMouseMove={handleMove1}
            onMouseUp={stopDrag1}
            onMouseLeave={stopDrag1}
          >
            {/* BEFORE IMAGE */}
            <img
              src={beforeImg1}
              alt="before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* AFTER IMAGE */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position1}%` }}
            >
              <img
                src={afterImg1}
                alt="after"
                className="w-full h-full object-cover"
              />
            </div>
            {/* SLIDER LINE */}
            <div
              style={{ left: `${position1}%` }}
              className="absolute top-0 h-full w-[2px] bg-white"
            >
              {/* DRAG HANDLE */}
              <div
                onMouseDown={startDrag1}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>
            <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded">
              Before
            </span>
            <span className="absolute top-3 right-3 bg-white text-xs px-2 py-1 rounded">
              After
            </span>
          </div>
        </div>

        {/* Before-After Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div
            ref={containerRef2}
            className="relative h-[320px] rounded-xl overflow-hidden"
            onMouseMove={handleMove2}
            onMouseUp={stopDrag2}
            onMouseLeave={stopDrag2}
          >
            {/* BEFORE IMAGE */}
            <img
              src={beforeImg2}
              alt="before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* AFTER IMAGE */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position2}%` }}
            >
              <img
                src={afterImg2}
                alt="after"
                className="w-full h-full object-cover"
              />
            </div>
            {/* SLIDER LINE */}
            <div
              style={{ left: `${position2}%` }}
              className="absolute top-0 h-full w-[2px] bg-white"
            >
              {/* DRAG HANDLE */}
              <div
                onMouseDown={startDrag2}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>
            <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded">
              Before
            </span>
            <span className="absolute top-3 right-3 bg-white text-xs px-2 py-1 rounded">
              After
            </span>
          </div>
        </div>

        {/* Before-After Card 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div
            ref={containerRef3}
            className="relative h-[320px] rounded-xl overflow-hidden"
            onMouseMove={handleMove3}
            onMouseUp={stopDrag3}
            onMouseLeave={stopDrag3}
          >
            {/* BEFORE IMAGE */}
            <img
              src={beforeImg3}
              alt="before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* AFTER IMAGE */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position3}%` }}
            >
              <img
                src={afterImg3}
                alt="after"
                className="w-full h-full object-cover"
              />
            </div>
            {/* SLIDER LINE */}
            <div
              style={{ left: `${position3}%` }}
              className="absolute top-0 h-full w-[2px] bg-white"
            >
              {/* DRAG HANDLE */}
              <div
                onMouseDown={startDrag3}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-[2px]">
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                  <span className="w-[2px] h-4 bg-gray-400"></span>
                </div>
              </div>
            </div>
            <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded">
              Before
            </span>
            <span className="absolute top-3 right-3 bg-white text-xs px-2 py-1 rounded">
              After
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}