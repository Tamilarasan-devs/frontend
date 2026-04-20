import React from "react";

const ratingData = [
  { stars: 5, count: 1632 },
  { stars: 4, count: 103 },
  { stars: 3, count: 28 },
  { stars: 2, count: 0 },
  { stars: 1, count: 1 },
];

const totalReviews = 1764;
const avgRating = 4.91;

export default function ReviewSection() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 space-y-8 mb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
          Real People Real Stories
        </h2>
      </div>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        
        {/* Left - Average */}
        <div className="space-y-2">
          <div className="text-4xl font-bold text-stone-900">
            {avgRating}
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            {"★★★★★"}
          </div>
          <p className="text-sm text-stone-500">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Middle - Bars */}
        <div className="md:col-span-2 space-y-3">
          {ratingData.map((item) => {
            const percent = (item.count / totalReviews) * 100;
            return (
              <div key={item.stars} className="flex items-center gap-3">
                
                {/* Stars label */}
                <span className="w-10 text-sm text-stone-600">
                  {item.stars}★
                </span>

                {/* Bar */}
                <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Count */}
                <span className="w-12 text-sm text-stone-500 text-right">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">
          Write a review
        </button>
        <button className="px-5 py-2 border border-stone-300 rounded-full text-sm font-semibold hover:bg-stone-100 transition">
          Ask a question
        </button>
      </div>

      {/* Customer Photos */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
          Customer photos & videos
        </h3>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-lg bg-stone-200 flex-shrink-0 overflow-hidden"
            >
              <img
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-8 text-sm text-stone-600">
        <span>👍 1632</span>
        <span>🙂 103</span>
        <span>😐 28</span>
        <span>🙁 0</span>
        <span>👎 1</span>
      </div>
    </div>
  );
}