import React, { useState } from "react";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

const Navbar = ({
  handleLogoClick,
  tendrLogo,
  handleGiftHampersClick,
  handleSignInClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="flex items-center justify-between p-4 max-md:h-12">
        {/* Logo */}
        <a href="/" className="logo" onClick={handleLogoClick}>
          <img src={tendrLogo} alt="Tendr Logo" className="logo-img max-md:h-7" />
        </a>

        {/* Burger Icon */}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes  /> : <FaBars />}
        </button>

        {/* Desktop Navbar Items */}
        <div className="nav-desktop">
          {/* Our Products */}
          <div className="dropdown">
            <button className="dropdown-btn">
              Our Products <span>▾</span>
            </button>
            <div className="dropdown-content">
              <div className="dropdown-header">Smart Planning Tools</div>
              <div className="dropdown-subtext">
                Professional planning made easy
              </div>

              <a href="/checklist">
                <i className="fa-regular fa-square-check"></i> Checklist
              </a>
              <a href="/timeline-picker">
                <i className="fa-regular fa-clock"></i> Timeline
              </a>
              <a href="/budget-allocator">
                <i className="fa-solid fa-wallet"></i> Budget Allocator
              </a>
              <a href="/aftermovie">
                <i className="fa-solid fa-video"></i> Aftermovie
              </a>
              <a href="/invitation">
                <i className="fa-regular fa-envelope"></i> Invitation Flyers
              </a>
            </div>
          </div>

          {/* Vendors */}
          <div className="dropdown">
            <button className="dropdown-btn">
              About Vendors <span>▾</span>
            </button>
            <div className="dropdown-content">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/vendor/register";
                }}
              >
                <i className="fa-solid fa-user-plus"></i> Register as Vendor
              </a>

              <button
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("events");
                  if (section) {
                    const yOffset = -80;
                    const y =
                      section.getBoundingClientRect().top +
                      window.scrollY +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                <i className="fa-solid fa-briefcase"></i> Vendor Portfolio
              </button>
            </div>
          </div>

          {/* Booking */}
          <div className="dropdown">
            <button className="dropdown-btn">
              Booking <span>▾</span>
            </button>
            <div className="dropdown-content">
              <button
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("corporate-section");
                  if (section) {
                    const yOffset = -80;
                    const y =
                      section.getBoundingClientRect().top +
                      window.scrollY +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                <i className="fa-solid fa-building"></i> Corporate Booking
              </button>

              <a href="/booking">
                <i className="fa-solid fa-champagne-glasses"></i> Other
                Celebrations
              </a>
            </div>
          </div>

          {/* Gift Hampers */}
          <a
            href="/gift-hampers-cakes"
            className="nav-link hamper"
            onClick={handleGiftHampersClick}
          >
            Gift Hampers & Cakes
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/9211668427"
            className="contact-icon whatsapp-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={22} />
          </a>

          {/* Sign In */}
          <a href="/login" className="sign-in" onClick={handleSignInClick}>
            Sign in
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/checklist" className="mobile-link">
          Checklist
        </a>
        <a href="/timeline-picker" className="mobile-link">
          Timeline
        </a>
        <a href="/budget-allocator" className="mobile-link">
          Budget Allocator
        </a>
        <a href="/aftermovie" className="mobile-link">
          Aftermovie
        </a>
        <a href="/invitation" className="mobile-link">
          Invitation Flyers
        </a>
        <a href="/vendor/register" className="mobile-link">
          Register as Vendor
        </a>
        <a href="/booking" className="mobile-link">
          Book Event
        </a>
        <a href="/gift-hampers-cakes" className="mobile-link ">
          Gift Hampers & Cakes
        </a>
        <a href="/login" className="mobile-link">
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
