"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  // Default to dark theme
  const [isDark, setIsDark] = useState(true);

  // On component mount, check if theme preference exists in local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark theme
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      // Switch to light theme
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark theme
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="absolute top-4 md:top-7 right-4 md:right-14 z-20 p-2 rounded-full bg-accentPurple4-light dark:bg-accentPurple2 dark:text-fontPrimary text-fontPrimary-light"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-fontPrimary" />
      ) : (
        <Moon size={20} className="text-fontPrimary" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
