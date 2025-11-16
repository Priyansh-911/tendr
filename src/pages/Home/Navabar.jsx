import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logos/tendr-logo-secondary.png";

export default function Navabar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TENDR Logo" className="logo-img h-12 md:h-14" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-800 hover:text-orange-500">
            Home
          </Link>
          <Link to="/services" className="text-gray-800 hover:text-orange-500">
            Services
          </Link>
          <Link
            to="/event-planning"
            className="text-gray-800 hover:text-orange-500"
          >
            Event Planning
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-800 hover:text-orange-500"
          >
            Contact
          </Link>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-all">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl text-gray-900 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-lg flex flex-col items-center gap-4 transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link
          to="/"
          className="text-gray-800 hover:text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/services"
          className="text-gray-800 hover:text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/event-planning"
          className="text-gray-800 hover:text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          Event Planning
        </Link>
        <Link
          to="/contact-us"
          className="text-gray-800 hover:text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-all"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}
