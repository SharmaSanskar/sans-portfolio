"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import ThemeToggle from "../components/shared/ThemeToggle";

const HeroSection: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const blob4Controls = useAnimation();

  const fonts = [
    "font-sora",
    "font-alegreya",
    "font-cairo",
    "font-fauna",
    "font-karma",
    "font-merriweather",
    "font-montserrat",
    "font-playfair",
    "font-lora",
  ];

  useEffect(() => {
    const animateLines = async () => {
      await Promise.all([
        blob1Controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }),
        blob2Controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.6 },
        }),
        blob3Controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.7 },
        }),
        blob4Controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, delay: 1.2 },
        }),
      ]);

      setAnimationComplete(true);
    };

    animateLines();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFontIndex((prev) => (prev + 1) % fonts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  return (
    <div
      className="relative min-h-screen flex items-center p-4 sm:p-8 overflow-hidden bg-bgDark-light dark:bg-bgDark"
      id="home"
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Blobs with lower z-index */}
      <motion.div
        className="absolute bottom-16 right-8 sm:right-64 w-24 sm:w-32 h-24 sm:h-32 bg-accentPurple1-light dark:bg-accentPurple1 rounded-full z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob1Controls}
      />
      <motion.div
        className="absolute -right-8 bottom-80 sm:bottom-16 sm:-left-16 w-32 sm:w-48 h-32 sm:h-48 bg-accentPurple2-light dark:bg-accentPurple2 rounded-full z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob2Controls}
      />
      <motion.div
        className="hidden md:block absolute bottom-48 sm:bottom-80 -right-4 sm:-right-6 w-48 sm:w-64 h-48 sm:h-64 bg-accentPurple3-light dark:bg-accentPurple3 rounded-full z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob3Controls}
      />
      <motion.div
        className="absolute bottom-20 left-4 sm:bottom-72 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 bg-accentPurple4-light dark:bg-accentPurple4 rounded-full z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob4Controls}
      />

      {/* Content with higher z-index */}
      <div className="max-w-4xl mx-auto w-full relative z-10" ref={textRef}>
        <div className="relative h-16 sm:h-24">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={currentFontIndex}
              className={`text-4xl sm:text-7xl font-bold leading-tight ${fonts[currentFontIndex]} text-fontPrimary-light dark:text-fontPrimary`}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{
                y: { type: "spring", stiffness: 200, damping: 40 },
                opacity: { duration: 0.4 },
              }}
            >
              I&apos;m Sanskar Sharma
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          className="text-xl sm:text-4xl w-full sm:w-3/4 font-light text-fontPrimary-light dark:text-fontPrimary"
          initial={{ opacity: 0, y: 50 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A software engineer blending creativity and code to build impactful
          user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-8"
        >
          <motion.a
            className="flex gap-1 bg-accentPurple3-light dark:bg-accentPurple3 hover:bg-accentPurple4-light dark:hover:bg-accentPurple4 transition-colors items-center justify-center px-6 rounded-lg text-sm py-3 sm:py-2 text-fontPrimary-light dark:text-fontPrimary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
          >
            <span>
              <ChevronRight size={15} />
            </span>
            <span>Contact Me</span>
          </motion.a>
          <motion.a
            href="/sanskar-resume.pdf"
            download={"Sanskar_Sharma_Resume.pdf"}
            className="flex gap-1 bg-accentPurple2-light dark:bg-accentPurple2 hover:bg-accentPurple3-light dark:hover:bg-accentPurple3 transition-colors items-center justify-center px-6 rounded-lg text-sm py-3 sm:py-2 text-fontPrimary-light dark:text-fontPrimary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>
              <Download size={15} />
            </span>
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
