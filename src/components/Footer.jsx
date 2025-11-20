import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#fae6cc] to-[#FAEBD7] text-[#8B4513] py-14 px-6">
      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* BRAND SECTION */}
        <div>
          <h1 className="text-4xl font-bold text-[#4b2e0f] drop-shadow-md mb-4">
            TENDR
          </h1>

          <p className="text-lg text-[#a26320] mb-3">
            Empowering your celebrations with curated planning and unforgettable
            experiences.
          </p>

          <p className="text-[#a26320] text-lg">
            <strong className="text-[#4b2e0f]">Email:</strong>{" "}
            <a href="mailto:contacttendr@gmail.com" className="hover:underline">
              contacttendr@gmail.com
            </a>
          </p>

          <p className="text-[#a26320] text-lg">
            <strong className="text-[#4b2e0f]">Phone:</strong> +91-9211668427
          </p>

          <p className="text-[#a26320] text-lg mb-3">
            <strong className="text-[#4b2e0f]">Address:</strong> DELHI NCR
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-3 px-5 py-2 bg-[#6b3d1c] text-white rounded-full hover:bg-[#f0c674] hover:text-[#4b2e0f] transition"
          >
            ↑ Back to Top
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1">
          <FooterColumn
            title="Services"
            links={[
              "Corporate Events",
              "Photography",
              "Private Parties",
              "Decoration",
              "Catering",
              "DJ",
            ]}
          />

          <FooterColumn
            title="Platform"
            links={[{ label: "Event Planning", href: "/event-planning" }]}
          />

          <FooterColumn title="Company" links={["About Us", "Careers"]} />

          <FooterColumn
            title="Support"
            links={[
              { label: "Contact Us", href: "/contact-us" },
              { label: "Refund Policy", href: "/refund-policy" },
              { label: "Cancellation Policy", href: "/cancellation-policy" },
            ]}
          />
        </div>
      </div>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-6 my-8">
        <SocialIcon Icon={FaFacebookF} href="https://facebook.com" />
        <SocialIcon Icon={FaInstagram} href="https://instagram.com" />
        <SocialIcon Icon={FaXTwitter} href="https://twitter.com" />
        <SocialIcon Icon={FaLinkedinIn} href="https://linkedin.com" />
      </div>

      {/* FOOTER BOTTOM */}
      <div className="text-center border-t border-black/10 pt-4">
        <p className="text-[#a26320]">
          © 2025 tendr. All rights reserved. |{" "}
          <a className="hover:underline" href="#">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a className="hover:underline" href="#">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ------------ COMPONENTS ------------ */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-[#4b2e0f] drop-shadow mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => {
          const label = typeof link === "string" ? link : link.label;
          const href = typeof link === "string" ? "#" : link.href;

          return (
            <li key={i}>
              <a
                href={href}
                className="block text-lg text-[#a26320] hover:text-[#4b2e0f] hover:translate-x-2 transition"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SocialIcon({ Icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-[#8B4513]
      bg-white/30 backdrop-blur-md border border-[#8B4513]/20
      transition-transform duration-300 hover:-translate-y-2 hover:scale-110
      hover:bg-gradient-to-br hover:from-[#CD853F] hover:to-[#DEB887] hover:text-white shadow-xl"
    >
      <Icon />
    </a>
  );
}
