import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tendrLogo from "../assets/logos/tendr-logo-secondary.png";
import { FaWhatsapp } from "react-icons/fa";
import router from "../router";


const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleGiftHampersClick = (e) => {
    e.preventDefault();
    navigate("/gift-hampers-cakes");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-500 ease-in-out ${
        scrolled ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="nav">
        {/* Logo */}
        <a href="/" className="logo" onClick={handleLogoClick}>
          <img
            src={tendrLogo}
            alt="Tendr - We Curate You Celebrate"
            className="logo-img"
          />
        </a>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          {/* Our Products Dropdown */}
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

          {/* Vendors Dropdown */}
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

          {/* Booking Dropdown */}
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
                  } else {
                    navigate("/corporate/login");
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
            className="nav-link mx-4"
            onClick={handleGiftHampersClick}
          >
            Gift Hampers & Cakes
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/9211668427"
            className="contact-icon whatsapp-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>

          {/* Sign In */}
          <a
            href="/login"
            className="sign-in mx-4"
            onClick={handleSignInClick}
          >
            Sign in
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
