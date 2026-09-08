import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { NAV_ITEMS } from "../../lib/constants";
import { scrollToSection } from "../../lib/utils";
import "./Header.css";

export default function Header() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically on window resize (e.g. devtools device toolbar change)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 868) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  }, []);

  const handleWholesaleClick = useCallback((e) => {
    e.preventDefault();
    scrollToSection("wholesale");
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        {/* Official Brand Logo */}
        <a href="/" className="header__logo" aria-label="Bunaai Rugs - Home">
          <img
            src="/images/branding/bunaai-official-logo.png"
            alt="Bunaai Rugs"
            className="header__logo-img"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="header__nav-item">
                <a
                  href={item.href}
                  className="header__nav-link"
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Wholesale CTA */}
        <a
          href="#wholesale"
          className="header__cta"
          onClick={handleWholesaleClick}
        >
          <span>WHOLESALE ENQUIRY</span>
          <span className="header__cta-arrow" aria-hidden="true">
            →
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className={`header__menu-btn ${isMobileMenuOpen ? "header__menu-btn--open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="header__mobile-list">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      className="header__mobile-link"
                      onClick={(e) => handleNavClick(e, item.id)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                >
                  <a
                    href="#wholesale"
                    className="header__mobile-cta"
                    onClick={handleWholesaleClick}
                  >
                    WHOLESALE ENQUIRY →
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
