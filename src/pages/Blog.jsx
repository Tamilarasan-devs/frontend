import React, { useState } from "react";
import bnr from '../assets/images/bann2.jpg'
import { Helmet } from "react-helmet-async";
const blogPosts = [
  {
    id: 1,
    category: "Lifestyle",
    title: "The Future of Sustainable Living",
    excerpt: "Discover how sustainable practices are shaping the way we live, work, and consume in the modern world.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    date: "Mar 01, 2026",
    readTime: "5 min read",
    link: "#",
    featured: true,
  },
  {
    id: 2,
    category: "Health",
    title: "Top 10 Health Tips for 2026",
    excerpt: "Stay healthy and active with these practical tips recommended by leading health experts.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    date: "Feb 22, 2026",
    readTime: "4 min read",
    link: "#",
    featured: false,
  },
  {
    id: 3,
    category: "Technology",
    title: "Innovations in Eco-Friendly Technology",
    excerpt: "Explore the latest tech innovations that are helping reduce our collective carbon footprint.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    link: "#",
    featured: false,
  },
  {
    id: 4,
    category: "Wellness",
    title: "Mindfulness and Productivity",
    excerpt: "Learn how daily mindfulness practices can help you boost focus, reduce stress, and achieve more.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    date: "Feb 10, 2026",
    readTime: "3 min read",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    category: "Nutrition",
    title: "Eating Well on a Budget",
    excerpt: "Nutritious meals don't have to be expensive. Here's how to eat well without breaking the bank.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    date: "Feb 05, 2026",
    readTime: "4 min read",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    category: "Lifestyle",
    title: "Designing a Home You'll Love",
    excerpt: "Simple design principles that transform any space into a warm, welcoming sanctuary.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    date: "Jan 28, 2026",
    readTime: "5 min read",
    link: "#",
    featured: false,
  },
];

const categories = ["All", "Lifestyle", "Health", "Technology", "Wellness", "Nutrition"];

const BRAND = "#820c0c";
const ACCENT = "#c9643a";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <>
      <style>{`
  

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }

        .blog-card {
          transition: transform 0.3s cubic-bezier(0.22,0.68,0,1.15), box-shadow 0.3s ease, border-color 0.3s ease;
          border: 1.5px solid rgba(201,100,58,0.12);
        }
        .blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,100,58,0.35);
          box-shadow: 0 16px 48px rgba(130,12,12,0.12), 0 4px 12px rgba(0,0,0,0.06);
        }

        .blog-img { transition: transform 0.6s ease; }
        .blog-card:hover .blog-img { transform: scale(1.07); }

        .featured-img { transition: transform 0.7s ease; }
        .featured-card:hover .featured-img { transform: scale(1.04); }

        .cat-btn {
          transition: all 0.2s ease;
          border: 1.5px solid transparent;
        }
        .cat-btn-active {
          color: #fff;
          border-color: transparent;
        }
        .cat-btn-inactive {
          color: #5a4a42;
          background: #fff;
          border-color: rgba(201,100,58,0.25);
        }
        .cat-btn-inactive:hover {
          border-color: rgba(130,12,12,0.4);
          color: #820c0c;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #820c0c;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .read-more-link:hover {
          gap: 10px;
          color: #c9643a;
        }

        .load-btn {
          position: relative; overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .load-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .load-btn:hover { transform: translateY(-2px); }
        .load-btn:hover::after { transform: translateX(100%); }
      `}</style>

      <div className="blog-root min-h-screen" style={{ backgroundColor:'white' }}>
<Helmet>
  <title>Blog - Aayubakwath</title>
  <meta name="description" content="Read the latest articles on health, wellness, lifestyle, and more at Aayubakwath Blog. Stay informed with expert insights, tips, and trends to live your best life." />
</Helmet>
        {/* ── Hero Header ── */}
        {/* ══════════ HERO ══════════ */}
                <section className="relative w-full overflow-hidden">
                  {/* Background image */}
                  <div className="relative">
                    <img
                      src={bnr}
                      alt="About Banner"
                      loading="lazy"
                      className="w-full lg:h-full object-cover"
                    />
                
      
                
                    
                   
                  </div>
                </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* ── Category Filter ── */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cat-btn px-5 py-2 rounded-full text-sm font-semibold ${
                  activeCategory === cat ? "cat-btn-active" : "cat-btn-inactive"
                }`}
                style={activeCategory === cat ? {
                  background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})`,
                  boxShadow: `0 4px 14px rgba(130,12,12,0.3)`,
                } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {featured && (
            <>
              {/* ── Featured Post ── */}
              <a
                href={featured.link}
                className="featured-card fade-up block rounded-3xl overflow-hidden mb-12 cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(201,100,58,0.18)",
                  boxShadow: "0 8px 40px rgba(130,12,12,0.08)",
                }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative lg:w-1/2 overflow-hidden" style={{ minHeight: 280 }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="featured-img w-full h-full object-cover absolute inset-0"
                      style={{ minHeight: 280 }}
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.05))" }}
                    />
                    {/* Featured badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                      style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}
                    >
                      ✦ Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start"
                      style={{ background: "rgba(201,100,58,0.12)", color: ACCENT }}
                    >
                      {featured.category}
                    </span>
                    <h2
                      className="blog-serif font-bold text-gray-900 mb-4 leading-snug"
                      style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-gray-900 font-semibold leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-900 font-semibold">
                        <span>📅 {featured.date}</span>
                        <span>·</span>
                        <span>⏱ {featured.readTime}</span>
                      </div>
                      <span className="read-more-link">
                        Read Article <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* ── Grid Posts ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <a
                      key={post.id}
                      href={post.link}
                      className="blog-card fade-up bg-white rounded-2xl overflow-hidden block cursor-pointer"
                      style={{ animationDelay: `${i * 0.07}s` }}
                      onMouseEnter={() => setHoveredId(post.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image */}
                      <div className="overflow-hidden h-48 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="blog-img w-full h-full object-cover"
                        />
                        {/* Category chip on image */}
                        <span
                          className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ background: "rgba(255,255,255,0.92)", color: BRAND }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <h3
                          className="blog-serif font-bold text-gray-900   mb-2 leading-snug"
                          style={{ fontSize: 19 }}
                        >
                          {post.title}
                        </h3>
                        <p className="text-gray-900 text-md leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div
                          className="pt-3 flex items-center justify-between"
                          style={{ borderTop: "1px solid #f0ece8" }}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 font-medium">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>
                          <span className="read-more-link text-xs">
                            Read <span>→</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Load More ── */}
          <div className="mt-14 text-center">
            <button
              className="load-btn text-white text-sm font-semibold uppercase tracking-widest px-10 py-4 rounded-full border-none cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, ${ACCENT} 100%)`,
                boxShadow: "0 8px 24px rgba(130,12,12,0.3)",
              }}
            >
              Load More Posts
            </button>
            <p className="text-xs text-gray-400 mt-3">Showing {filtered.length} of 24 articles</p>
          </div>

        </div>
      </div>
    </>
  );
}