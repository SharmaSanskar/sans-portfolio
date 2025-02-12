"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroSection: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const blob4Controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const getRelativeCoordinates = (x: number, y: number) => {
    const rect = textRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: x - rect.left,
      y: y - rect.top,
    };
  };

  return (
    <div
      className="relative min-h-screen flex items-center p-8 overflow-hidden"
      style={{
        cursor: isHovering ? "none" : "default",
      }}
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
      <div
        className="max-w-6xl mx-auto"
        ref={textRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Text Container with Reveal Effect */}
        <div className="relative">
          <motion.h1
            className="text-7xl font-bold leading-tight relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            I&apos;m Sanskar Sharma
          </motion.h1>

          {/* Hidden Text that's revealed */}
          <motion.h1
            className="text-7xl font-bold leading-tight absolute top-0 left-0 text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              clipPath: isHovering
                ? `circle(75px at ${
                    getRelativeCoordinates(cursorPosition.x, cursorPosition.y).x
                  }px ${
                    getRelativeCoordinates(cursorPosition.x, cursorPosition.y).y
                  }px)`
                : "circle(0px at 0 0)",
              WebkitClipPath: isHovering
                ? `circle(75px at ${
                    getRelativeCoordinates(cursorPosition.x, cursorPosition.y).x
                  }px ${
                    getRelativeCoordinates(cursorPosition.x, cursorPosition.y).y
                  }px)`
                : "circle(0px at 0 0)",
            }}
          >
            Full-stack Developer
          </motion.h1>
        </div>

        <motion.p
          className="text-4xl w-1/2 font-light z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          A software engineer blending creativity and code to build impactful
          user experiences.
        </motion.p>
      </div>
      {/* Custom Cursor */}
      {isHovering && (
        <div
          className={`fixed z-50 pointer-events-none rounded-full bg-[#d9d9d9] opacity-40`}
          style={{
            width: 150,
            height: 150,
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: "translate(-50%, -50%)",
            mixBlendMode: "normal",
          }}
        />
      )}
    </div>
  );
};

export default HeroSection;
