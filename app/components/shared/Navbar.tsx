"use client";

import React, { useState, useEffect } from "react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "work", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navigation - Fixed at top */}
      <nav className="hidden md:block bg-accentPurple1 px-10 py-3 rounded-xl shadow-xl shadow-black/20">
        <ul className="flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all ${
                activeSection === item.id
                  ? "text-fontSecondary font-medium"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation - Fixed at bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-accentPurple1 shadow-xl shadow-black/20 z-[200]">
        <ul className="flex items-center justify-between px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center gap-1 text-sm ${
                activeSection === item.id
                  ? "text-fontSecondary scale-110 font-medium"
                  : ""
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </a>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
