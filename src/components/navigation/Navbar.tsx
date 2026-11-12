"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useViewingModal } from "@/context/ViewingModalContext";

export default function Navbar() {
  const { openViewingModal } = useViewingModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "The house", href: "#perspectives" },
    { label: "3D & configurator", href: "#configurator" },
    { label: "Surroundings", href: "#perspectives" },
    { label: "Floor plan", href: "#floorplan" },
    { label: "Price", href: "#specifications" },
  ];

  return (
    <>
      {/* Floating Pill Navbar Container */}
      <nav className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[1440px] z-50">
        <div className="w-full bg-gradient-to-r from-[#ece7de]/95 via-[#e2ddd4]/90 to-[#d8d2c8]/95 backdrop-blur-xl border border-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.35)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between transition-all">
          
          {/* Left: Brand Identity */}
          <a
            href="#hero"
            className="flex items-center gap-1.5 focus:outline-none shrink-0 group"
          >
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 uppercase">
              LAKE HOUSE
            </span>
            <span className="text-neutral-600 font-normal text-xs sm:text-sm tracking-tight">
              · AIST Village
            </span>
          </a>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs sm:text-[13px] font-medium text-neutral-700 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section: CTA button */}
          <div className="flex items-center gap-3">
            {/* Dark Pill "Book a viewing" Button inside navbar */}
            <button
              onClick={() => openViewingModal()}
              className="bg-[#191817] hover:bg-black text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all shadow-sm active:scale-95 shrink-0"
            >
              Book a viewing
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-neutral-900 hover:bg-black/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-28 px-6 lg:hidden flex flex-col justify-between pb-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-bold text-lg text-white">LAKE HOUSE</span>
              <span className="text-xs font-mono text-neutral-400">AIST Village</span>
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light text-white hover:text-neutral-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openViewingModal();
              }}
              className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wider"
            >
              Book a viewing
            </button>
          </div>
        </div>
      )}
    </>
  );
}
