// My Navbar
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // --- New state to manage Navbar visibility when scrolling ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Effect to close the dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAboutDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Effects for managing Navbar visibility when scrolling ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
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

  const handleDropdownItemClick = () => {
    setShowAboutDropdown(false);
  };

  return (
    <nav
      className={`
        fixed top-5 left-0 w-full z-10 flex items-center justify-center
        transition-transform duration-300 ease-out
        ${
          isVisible ? "translate-y-0" : "-translate-y-[150%]"
        } {/* Menggeser Navbar ke atas saat tidak terlihat */}
      `}
    >
      <div
        className="
        flex items-center justify-between
        max-w-screen-lg
        w-full
        mx-auto
        py-3
        px-6
        bg-white dark:bg-gray-900 shadow
        rounded-full
        border-2 border-blue-600 dark:border-blue-300
        min-h-[5rem]
      "
      >
        <div className="text-2xl font-black text-blue-600 dark:text-blue-300 font-tomorrow">
          Fayyad M Madani
        </div>

        <div className="flex items-center gap-6">
          {/* --- “About” button with Dropdown --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors focus:outline-none text-lg"
            >
              About
            </button>
            {showAboutDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                <HashLink
                  smooth
                  to="#about-me"
                  onClick={handleDropdownItemClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  About Me
                </HashLink>
                <HashLink
                  smooth
                  to="#experiences"
                  onClick={handleDropdownItemClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Experiences
                </HashLink>
                <HashLink
                  smooth
                  to="#achievements"
                  onClick={handleDropdownItemClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Achievements
                </HashLink>
                <HashLink
                  smooth
                  to="#education"
                  onClick={handleDropdownItemClick}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Education
                </HashLink>
              </div>
            )}
          </div>

          {/* --- "Contact" Button --- */}
          <HashLink
            smooth
            to="#contact-me"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-lg"
          >
            Contact
          </HashLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-base font-semibold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Terang" : "Gelap"}
          </button>
        </div>
      </div>
    </nav>
  );
}
