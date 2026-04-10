import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogPosts from "../data/blogData";

const BRAND = "#03349a";
const ACCENT = "#c9643a";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 28, color: "#333" }}>Blog post not found</h2>
        <button
          onClick={() => navigate("/blog")}
          style={{
            background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})`,
            color: "#fff",
            border: "none",
            padding: "12px 32px",
            borderRadius: 30,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14
          }}
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // If not enough related posts from same category, fill with other posts
  const morePosts = relatedPosts.length < 3
    ? [
        ...relatedPosts,
        ...blogPosts
          .filter((p) => p.id !== post.id && !relatedPosts.find((r) => r.id === p.id))
          .slice(0, 3 - relatedPosts.length),
      ]
    : relatedPosts;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');

        .blog-detail-root {
          font-family: 'Inter', sans-serif;
        }

        .blog-detail-hero {
          position: relative;
          width: 100%;
          height: 420px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .blog-detail-hero { height: 280px; }
        }
        .blog-detail-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.55);
        }
        .blog-detail-hero-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px 24px 48px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
        }
        .blog-detail-hero-inner {
          max-width: 840px;
          margin: 0 auto;
          width: 100%;
        }
        .blog-detail-category-badge {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #fff;
          background: linear-gradient(135deg, ${BRAND}, ${ACCENT});
          margin-bottom: 14px;
        }
        .blog-detail-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4.5vw, 42px);
          color: #fff;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 16px 0;
        }
        .blog-detail-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }
        .blog-detail-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .blog-detail-content {
          max-width: 840px;
          margin: 0 auto;
          padding: 48px 24px 64px;
        }

        .blog-detail-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: ${BRAND};
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          margin-bottom: 32px;
          transition: gap 0.2s ease, color 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
        }
        .blog-detail-back:hover {
          gap: 10px;
          color: ${ACCENT};
        }

        .blog-section {
          margin-bottom: 36px;
        }
        .blog-section-heading {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(201,100,58,0.15);
          position: relative;
        }
        .blog-section-heading::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(135deg, ${BRAND}, ${ACCENT});
        }
        .blog-section-content p {
          font-size: 15.5px;
          line-height: 1.8;
          color: #3a3a4a;
          margin: 0 0 12px 0;
        }
        .blog-section-list {
          list-style: none;
          padding: 0;
          margin: 8px 0 16px 0;
        }
        .blog-section-list li {
          position: relative;
          padding-left: 24px;
          font-size: 15px;
          line-height: 1.9;
          color: #3a3a4a;
        }
        .blog-section-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 11px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${BRAND}, ${ACCENT});
        }

        .blog-subsection {
          margin: 20px 0 20px 0;
          padding-left: 20px;
          border-left: 3px solid rgba(3,52,154,0.12);
        }
        .blog-subsection-heading {
          font-size: 18px;
          font-weight: 700;
          color: #2a2a3e;
          margin: 0 0 10px 0;
        }

        .blog-disclaimer {
          margin-top: 40px;
          padding: 20px 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(3,52,154,0.05), rgba(201,100,58,0.05));
          border: 1px solid rgba(3,52,154,0.1);
        }
        .blog-disclaimer-heading {
          font-size: 14px;
          font-weight: 700;
          color: ${BRAND};
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .blog-disclaimer p {
          font-size: 13px;
          line-height: 1.7;
          color: #6a6a7a;
          margin: 0;
        }

        .blog-related-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .blog-related-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          text-align: center;
          margin: 0 0 32px 0;
        }
        .blog-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .blog-related-card {
          display: block;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          border: 1.5px solid rgba(201,100,58,0.12);
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .blog-related-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,100,58,0.35);
          box-shadow: 0 14px 40px rgba(130,12,12,0.1);
        }
        .blog-related-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-related-card:hover .blog-related-card-img {
          transform: scale(1.05);
        }
        .blog-related-card-body {
          padding: 20px;
        }
        .blog-related-card-cat {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${ACCENT};
          margin-bottom: 8px;
        }
        .blog-related-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .blog-related-card-excerpt {
          font-size: 13.5px;
          color: #6a6a7a;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-divider {
          width: 100%;
          max-width: 840px;
          margin: 0 auto 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,100,58,0.2), transparent);
        }

        .blog-share-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .blog-share-label {
          font-size: 13px;
          font-weight: 600;
          color: #8a8a9a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .blog-share-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(3,52,154,0.15);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 16px;
          color: ${BRAND};
        }
        .blog-share-btn:hover {
          background: ${BRAND};
          color: #fff;
          border-color: ${BRAND};
          transform: translateY(-2px);
        }
      `}</style>

      <div className="blog-detail-root" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <Helmet>
          <title>{post.title} - Aayubakwath Blog</title>
          <meta name="description" content={post.excerpt} />
        </Helmet>

        {/* Hero */}
        <div className="blog-detail-hero">
          <img src={post.image} alt={post.title} />
          <div className="blog-detail-hero-overlay">
            <div className="blog-detail-hero-inner">
              <span className="blog-detail-category-badge">{post.category}</span>
              <h1 className="blog-detail-title">{post.title}</h1>
              <div className="blog-detail-meta">
                <span>📅 {post.date}</span>
                <span>·</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="blog-detail-content">
          <Link to="/blog" className="blog-detail-back">
            <span>←</span> Back to All Articles
          </Link>

          {/* Intro / Excerpt */}
          <p style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: "#3a3a4a",
            marginBottom: 40,
            fontWeight: 400,
            borderLeft: `4px solid ${ACCENT}`,
            paddingLeft: 20,
            fontStyle: "italic",
          }}>
            {post.excerpt}
          </p>

          {/* Sections */}
          {post.sections.map((section, sIdx) => (
            <div key={sIdx} className={section.isDisclaimer ? "blog-disclaimer" : "blog-section"}>
              {section.isDisclaimer ? (
                <>
                  <h4 className="blog-disclaimer-heading">{section.heading}</h4>
                  {section.content.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="blog-section-heading">{section.heading}</h2>
                  <div className="blog-section-content">
                    {section.content.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                    {section.list && section.list.length > 0 && (
                      <ul className="blog-section-list">
                        {section.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {/* Subsections */}
                    {section.subsections && section.subsections.map((sub, subIdx) => (
                      <div key={subIdx} className="blog-subsection">
                        <h3 className="blog-subsection-heading">{sub.heading}</h3>
                        {sub.content && sub.content.map((text, i) => (
                          <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: "#3a3a4a", margin: "0 0 10px 0" }}>{text}</p>
                        ))}
                        {sub.list && sub.list.length > 0 && (
                          <ul className="blog-section-list">
                            {sub.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Share Bar */}
          <div className="blog-share-bar">
            <span className="blog-share-label">Share:</span>
            <button className="blog-share-btn" title="Share on WhatsApp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " - " + window.location.href)}`, '_blank')}>
              💬
            </button>
            <button className="blog-share-btn" title="Share on Facebook" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
              📘
            </button>
            <button className="blog-share-btn" title="Copy Link" onClick={() => {navigator.clipboard.writeText(window.location.href); alert("Link copied!")}}>
              🔗
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {morePosts.length > 0 && (
          <>
            <div className="blog-divider" />
            <div className="blog-related-section">
              <h2 className="blog-related-title">You May Also Like</h2>
              <div className="blog-related-grid">
                {morePosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="blog-related-card"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={related.image}
                        alt={related.title}
                        className="blog-related-card-img"
                      />
                    </div>
                    <div className="blog-related-card-body">
                      <div className="blog-related-card-cat">{related.category}</div>
                      <h3 className="blog-related-card-title">{related.title}</h3>
                      <p className="blog-related-card-excerpt">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
