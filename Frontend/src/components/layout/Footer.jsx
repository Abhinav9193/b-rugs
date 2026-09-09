import React from "react";
import { NAV_ITEMS, CONTACT_INFO, SOCIAL_LINKS } from "../../lib/constants";
import { scrollToSection } from "../../lib/utils";
import "./Footer.css";

/* Page 05 — Exact recommended copy from brief */
const FOOTER_PAGE_COPY = {
  brandStatement: {
    line1: "Manufacturing excellence,",
    line2: "rooted in tradition.",
    line3: "Crafted for the world.",
  },
  navigationTitle: "NAVIGATION",
  wholesaleTitle: "WHOLESALE",
  wholesaleText:
    "We partner with retailers, designers and businesses for custom and bulk rug requirements.",
  wholesaleCta: "WHOLESALE ENQUIRY",
  contactTitle: "CONTACT",
  socialTitle: "FOLLOW US",
};

export default function Footer() {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer id="contact" className="footer">
      {/* Subtle Atmospheric Blurred Glows */}
      <div
        className="footer__glow-orb footer__glow-orb--left"
        aria-hidden="true"
      />
      <div
        className="footer__glow-orb footer__glow-orb--right"
        aria-hidden="true"
      />

      <div className="container">
        {/* Main 5-Column Grid */}
        <div className="footer__grid">
          {/* Column 1: Brand / Statement */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand-header">
              <a
                href="/"
                className="footer__logo"
                aria-label="Bunaai Rugs - Home"
              >
                <img
                  src="/images/branding/bunaai-official-logo.png"
                  alt="Bunaai Rugs"
                  className="footer__logo-img"
                />
              </a>
            </div>

            <p className="footer__brand-statement">
              {FOOTER_PAGE_COPY.brandStatement.line1}
              <br />
              {FOOTER_PAGE_COPY.brandStatement.line2}
              <br />
              {FOOTER_PAGE_COPY.brandStatement.line3}
            </p>

            <div className="footer__tagline-line" />

            {/* Expanded Glassmorphic Artisanal Craft Showcase */}
            <div className="footer__craft-card">
              <div className="footer__craft-img-frame">
                <img
                  src="/images/heritage/video-01.jpg"
                  alt="Authentic Bunaai master weaver crafting rug on loom"
                  className="footer__craft-img"
                  loading="lazy"
                />
                <div className="footer__craft-overlay" />
                <div className="footer__craft-badge">
                  <span className="footer__craft-dot" />
                  <span>MASTER WEAVERS</span>
                </div>
              </div>
              <div className="footer__craft-footer">
                <div className="footer__craft-info">
                  <span className="footer__craft-location">
                    HAND-KNOTTED ATELIER
                  </span>
                  <span className="footer__craft-sub">
                    Generations of craftsmanship
                  </span>
                </div>
                <div className="footer__craft-motif" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      transform="rotate(45 12 12)"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__v-divider" />

          {/* Column 2: Navigation */}
          <div className="footer__col footer__col--nav">
            <h4 className="footer__col-title">
              {FOOTER_PAGE_COPY.navigationTitle}
            </h4>
            <div className="footer__col-title-line" />
            <ul className="footer__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="footer__nav-item">
                  <a
                    href={item.href}
                    className="footer__nav-link"
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label === "OUR HERITAGE"
                      ? "Our Heritage"
                      : item.label === "MANUFACTURING PROCESS"
                        ? "Manufacturing Process"
                        : item.label === "SUSTAINABILITY"
                          ? "Sustainability"
                          : item.label === "WHOLESALE"
                            ? "Wholesale"
                            : "Contact"}
                  </a>
                </li>
              ))}
            </ul>

            {/* Diamond motif divider */}
            <div className="footer__motif-wrap">
              <div className="footer__motif-line" />
              <div className="footer__motif-diamond">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    transform="rotate(45 12 12)"
                    stroke="currentColor"
                    fill="none"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="10"
                    height="10"
                    transform="rotate(45 12 12)"
                    stroke="currentColor"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="footer__motif-line" />
            </div>
          </div>

          <div className="footer__v-divider" />

          {/* Column 3: Wholesale */}
          <div className="footer__col footer__col--wholesale">
            <h4 className="footer__col-title">
              {FOOTER_PAGE_COPY.wholesaleTitle}
            </h4>
            <div className="footer__col-title-line" />
            <p className="footer__wholesale-text">
              {FOOTER_PAGE_COPY.wholesaleText}
            </p>
            <a
              href="#wholesale"
              className="footer__wholesale-btn"
              onClick={(e) => handleNavClick(e, "wholesale")}
            >
              <span>{FOOTER_PAGE_COPY.wholesaleCta}</span>
              <span className="footer__btn-arrow">→</span>
            </a>
          </div>

          <div className="footer__v-divider" />

          {/* Column 4: Contact */}
          <div className="footer__col footer__col--contact">
            <h4 className="footer__col-title">
              {FOOTER_PAGE_COPY.contactTitle}
            </h4>
            <div className="footer__col-title-line" />
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="footer__contact-link"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>

              <li className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="footer__contact-phones">
                  <a
                    href={`tel:${CONTACT_INFO.phone1Raw}`}
                    className="footer__contact-link"
                  >
                    {CONTACT_INFO.phone1}
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.phone2Raw}`}
                    className="footer__contact-link"
                  >
                    {CONTACT_INFO.phone2}
                  </a>
                </div>
              </li>

              <li className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="footer__contact-text">
                  {CONTACT_INFO.address.line1}
                  <br />
                  {CONTACT_INFO.address.line2}
                </span>
              </li>
            </ul>
          </div>

          <div className="footer__v-divider" />

          {/* Column 5: Follow Us */}
          <div className="footer__col footer__col--social">
            <h4 className="footer__col-title">
              {FOOTER_PAGE_COPY.socialTitle}
            </h4>
            <div className="footer__col-title-line" />
            <div className="footer__social-links">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-circle"
                  aria-label={soc.name}
                >
                  {soc.icon === "instagram" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {soc.icon === "facebook" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )}
                  {soc.icon === "pinterest" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.9-1.3 3.5-3 3.9v-2.2c.4-.2.6-.6.6-1.1 0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .4.2.8.6 1v2.3C9.3 15.5 8 13.9 8 12z" />
                    </svg>
                  )}
                  {soc.icon === "twitter" && (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Gold Divider & Central Diamond Motif */}
        <div className="footer__bottom-section">
          <div className="footer__bottom-border" />

          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {new Date().getFullYear()} BUNAAI RUGS. ALL RIGHTS RESERVED.
            </p>

            <div className="footer__center-diamond" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  transform="rotate(45 12 12)"
                  stroke="currentColor"
                  fill="none"
                />
                <rect
                  x="7"
                  y="7"
                  width="10"
                  height="10"
                  transform="rotate(45 12 12)"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
            </div>

            <div className="footer__legal-links">
              <a href="/privacy" className="footer__legal-link">
                PRIVACY POLICY
              </a>
              <span className="footer__legal-sep">|</span>
              <a href="/terms" className="footer__legal-link">
                TERMS & CONDITIONS
              </a>
              <span className="footer__legal-sep">|</span>
              <a href="/sitemap" className="footer__legal-link">
                SITEMAP
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
