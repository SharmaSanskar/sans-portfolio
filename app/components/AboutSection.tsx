"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const AboutSection = () => {
  const interests = [
    "ANIME",
    "COOKING",
    "CINEMA",
    "ART",
    "DESIGN",
    "COFFEE",
    "FOOTBALL",
    "GAMING",
  ];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mobileLeftX = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const mobileRightX = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const leftX = useTransform(scrollYProgress, [0, 1], [-150, -450]);
  const rightX = useTransform(scrollYProgress, [0, 1], [150, 450]);

  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.matchMedia("(min-width: 768px)").matches);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section
      className="relative min-h-screen p-4 sm:p-8"
      ref={sectionRef}
      id="about"
    >
      <div className="hidden md:flex absolute -left-12 items-center top-1/2 -translate-y-1/2">
        <div className="transform -rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <div className="w-1 h-1 bg-accentPurple4"></div>
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <h1 className="font">ABOUT</h1>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center my-4">
        <h1 className="text-3xl font-bold tracking-widest">ABOUT</h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto">
        {/* Name and image section */}
        <div className="relative h-[200px] sm:h-[300px] flex items-center justify-center">
          {/* Background "Sanskar" */}
          <motion.div
            style={{ x: isMdScreen ? leftX : mobileLeftX }}
            className="absolute text-3xl md:text-8xl sm:text-5xl font-bold text-fontSecondary z-0"
          >
            <h1>Sanskar</h1>
          </motion.div>

          {/* Circle with image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-28 h-28 sm:w-48 sm:h-48 rounded-full bg-gray-200 overflow-hidden"
          >
            <Image
              src={`/images/me.jpg`}
              alt={`Me`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </motion.div>

          {/* Foreground "Sharma" */}
          <motion.div
            style={{ x: isMdScreen ? rightX : mobileRightX }}
            className="absolute text-3xl md:text-8xl sm:text-5xl font-bold text-fontPrimary z-20"
          >
            <h1>Sharma</h1>
          </motion.div>
        </div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 text-base sm:text-xl font-normal mb-12 w-full sm:w-3/4 mx-auto px-4 sm:px-0"
        >
          <p>
            Hey there, my name is Sanskar Sharma. I am a Software Developer
            based out of Boston, currently pursuing my Masters degree in
            Computer Science.
          </p>
          <p>
            I have developed a number of full stack applications over the past
            few years using modern web technologies for both my undergraduate
            work and personal projects. I enjoy technology because it gives me
            the opportunity to continually learn and explore new areas such as
            UI/UX design, web development, and machine learning.
          </p>
        </motion.div>

        {/* Infinitely scrolling interests */}
        <div className="overflow-hidden relative">
          <div className="flex">
            {[1, 2].map((group) => (
              <motion.div
                key={group}
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex shrink-0"
              >
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-block font-bold text-accentPurple4 text-lg sm:text-2xl px-3 sm:px-4 whitespace-nowrap"
                  >
                    {interest}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
