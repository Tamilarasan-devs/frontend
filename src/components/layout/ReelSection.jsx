import React, { useState, useRef, useEffect } from "react";

const videos = [
  { id: 1, src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, src: "https://www.w3schools.com/html/movie.mp4" },
  { id: 3, src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, src: "https://www.w3schools.com/html/movie.mp4" },
  { id: 5, src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 6, src: "https://www.w3schools.com/html/movie.mp4" },
  { id: 7, src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 8, src: "https://www.w3schools.com/html/movie.mp4" },
  { id: 9, src: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === 2) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const nextVideo = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setActiveIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  // Get only 5 videos around active index
  const visibleVideos = [];
  for (let i = -2; i <= 2; i++) {
    const index = (activeIndex + i + videos.length) % videos.length;
    visibleVideos.push(videos[index]);
  }

  return (
    <div>
<div className="mt-4">
    <h2 className="text-2xl font-bold text-[#820c0c] flex justify-center">Real People Real Stories
</h2>
    <h2 className="text-lg mt-2 font-bold flex justify-center">
      Loved By All Age Groups & Indian Skin Types Worldwide
</h2>
</div>
    <div className="w-full py-16 flex justify-center items-center">

      {/* Left Button */}
      <button
        onClick={prevVideo}
        className="mr-6 bg-white p-3 rounded-full shadow hover:scale-110 transition"
      >
        ◀
      </button>

      <div className="flex items-center gap-6">

        {visibleVideos.map((video, index) => (
          <div
            key={video.id}
            className={`rounded-xl overflow-hidden transition-all duration-500
              ${
                index === 2
                  ? "w-[320px] h-[520px] scale-110 shadow-2xl"
                  : "w-[180px] h-[320px] opacity-60"
              }`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      </div>

      {/* Right Button */}
      <button
        onClick={nextVideo}
        className="ml-6 bg-white p-3 rounded-full shadow hover:scale-110 transition"
      >
        ▶
      </button>

    </div>
    </div>
   
  );
}