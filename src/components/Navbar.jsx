// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAboutDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        const hamburgerButton = document.getElementById("hamburger-button");
        if (hamburgerButton && !hamburgerButton.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLinkClick = () => {
    setShowAboutDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowAboutDropdown(false);
  };

  // --- KUNCI PERUBAHAN WARNA ADA DI SINI ---
  // Tentukan warna stroke berdasarkan tema yang aktif
  const iconStrokeColor = theme === "dark" ? "#93c5fd" : "#2563eb"; // blue-300 untuk dark, blue-600 untuk light

  return (
    <nav
      className={`
        fixed top-5 left-0 w-full z-10 flex flex-col items-center
        transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "-translate-y-[150%]"}
      `}
    >
      <div
        className="
        flex items-center justify-between
        max-w-screen-lg
        w-full
        mx-auto
        py-3
        px-4 md:px-8 lg:px-20 xl:px-[120px]
        bg-white dark:bg-gray-900 shadow
        rounded-full
        border-2 border-blue-600 dark:border-blue-300
        min-h-[5rem]
      "
      >
        <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-300 font-tomorrow">
          Fayyad M Madani
        </div>

        <div className="hidden md:flex items-center gap-4 sm:gap-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors focus:outline-none text-base sm:text-lg"
            >
              About
            </button>
            {showAboutDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                <HashLink
                  smooth
                  to="#about-me"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  About Me
                </HashLink>
                <HashLink
                  smooth
                  to="#experiences"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Experiences
                </HashLink>
                <HashLink
                  smooth
                  to="#achievements"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Achievements
                </HashLink>
                <HashLink
                  smooth
                  to="#education"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Education
                </HashLink>
              </div>
            )}
          </div>

          <HashLink
            smooth
            to="#contact-me"
            onClick={handleLinkClick}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-base sm:text-lg"
          >
            Contact
          </HashLink>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm sm:text-base font-semibold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Terang" : "Gelap"}
          </button>
        </div>

        {/* --- Mobile Hamburger Icon (muncul di mobile) --- */}
        <div className="md:hidden flex items-center">
          <button
            id="hamburger-button"
            onClick={toggleMobileMenu}
            className="focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isMobileMenuOpen ? (
              // Ikon Tutup (X)
              <svg
                xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke={iconStrokeColor} // --- WARNA STROKE DIATUR DI SINI ---
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Ikon Hamburger
              <svg
                xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke={iconStrokeColor} // --- WARNA STROKE DIATUR DI SINI ---
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Content (muncul di bawah kapsul utama saat terbuka) --- */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="
            mt-4 w-full max-w-screen-lg mx-auto p-4
            bg-white dark:bg-gray-900 shadow
            rounded-lg
            border-2 border-blue-600 dark:border-blue-300
            flex flex-col items-center gap-4
            md:hidden
            transition-all duration-300 ease-in-out
          "
        >
          {/* About dropdown (mobile) */}
          <div className="relative w-full text-center" ref={dropdownRef}>
            <button
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors focus:outline-none text-lg w-full py-2"
            >
              About
            </button>
            {showAboutDropdown && (
              <div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-md shadow-inner py-1">
                <HashLink
                  smooth
                  to="#about-me"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  About Me
                </HashLink>
                <HashLink
                  smooth
                  to="#experiences"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Experiences
                </HashLink>
                <HashLink
                  smooth
                  to="#achievements"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Achievements
                </HashLink>
                <HashLink
                  smooth
                  to="#education"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Education
                </HashLink>
              </div>
            )}
          </div>

          {/* Contact Link (mobile) */}
          <HashLink
            smooth
            to="#contact-me"
            onClick={handleLinkClick}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-lg w-full py-2 text-center"
          >
            Contact
          </HashLink>

          {/* Theme Toggle (mobile) */}
          <button
            onClick={() => {
              toggleTheme();
              handleLinkClick();
            }}
            className="w-full px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-base font-semibold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Terang" : "Gelap"}
          </button>
        </div>
      )}
    </nav>
  );
}
