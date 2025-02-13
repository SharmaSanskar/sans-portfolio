"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";

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
    }, 5000); // Change font every 3 seconds

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
      className="relative min-h-screen flex items-center p-8 overflow-hidden"
      id="home"
    >
      <motion.div
        className="absolute bottom-16 right-64 w-32 h-32 bg-accentPurple1 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob1Controls}
      />
      <motion.div
        className="absolute bottom-16 -left-16 w-48 h-48 bg-accentPurple2 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob2Controls}
      />
      <motion.div
        className="absolute bottom-80 -right-6 w-64 h-64 bg-accentPurple3 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob3Controls}
      />
      <motion.div
        className="absolute bottom-72 left-10 w-16 h-16 bg-accentPurple4 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={blob4Controls}
      />
      <div className="max-w-6xl mx-auto" ref={textRef}>
        <div className="relative h-24">
          {/* Fixed height container for smooth transitions */}
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={currentFontIndex}
              className={`text-7xl font-bold leading-tight relative z-10 ${fonts[currentFontIndex]}`}
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
          className="text-4xl w-1/2 font-light z-20-"
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
          className="flex items-center gap-6 mt-8"
        >
          <motion.a
            className="flex gap-1 bg-accentPurple3 hover:bg-accentPurple4 transition-colors items-center px-6 rounded-lg text-sm py-2"
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
            className="flex gap-1 bg-accentPurple2 hover:bg-accentPurple3 transition-colors items-center px-6 rounded-lg text-sm py-2"
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
