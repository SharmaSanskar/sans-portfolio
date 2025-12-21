"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import ThemeToggle from "../components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

// Custom hook to track mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

// Eye component with pupil tracking
interface EyeProps {
  mouseX: number;
  mouseY: number;
  eyeRef: React.RefObject<HTMLDivElement>;
  isBlinking: boolean;
}

function Eye({ mouseX, mouseY, eyeRef, isBlinking }: EyeProps) {
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });

  // Spring physics for smooth pupil movement
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const springX = useSpring(pupilX, { stiffness: 150, damping: 20 });
  const springY = useSpring(pupilY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (eyeRef.current) {
      const rect = eyeRef.current.getBoundingClientRect();
      setEyeCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [eyeRef]);

  useEffect(() => {
    // Calculate angle between eye center and cursor
    const dx = mouseX - eyeCenter.x;
    const dy = mouseY - eyeCenter.y;
    const angle = Math.atan2(dy, dx);

    // Limit pupil movement to stay within eye bounds
    const maxDistance = 6;
    const newX = Math.cos(angle) * maxDistance;
    const newY = Math.sin(angle) * maxDistance;

    pupilX.set(newX);
    pupilY.set(newY);
  }, [mouseX, mouseY, eyeCenter, pupilX, pupilY]);

  return (
    <motion.div
      ref={eyeRef}
      className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center"
      animate={{ scaleY: isBlinking ? 0.1 : 1 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="w-6 h-6 bg-black rounded-full"
        style={{
          x: springX,
          y: springY,
        }}
      />
    </motion.div>
  );
}

// Character component
interface CharacterProps {
  color: string;
  width: string;
  height: string;
  mouseX: number;
  mouseY: number;
  isNameHovered: boolean;
}

function Character({ color, width, height, mouseX, mouseY, isNameHovered }: CharacterProps) {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  // Track window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  // Parallax tilt effect
  const mouseYMotion = useMotionValue(mouseY);
  const mouseXMotion = useMotionValue(mouseX);
  const rotateX = useTransform(mouseYMotion, [0, windowSize.height], [5, -5]);
  const rotateY = useTransform(mouseXMotion, [0, windowSize.width], [-5, 5]);

  // Update motion values when mouse position changes
  useEffect(() => {
    mouseXMotion.set(mouseX);
    mouseYMotion.set(mouseY);
  }, [mouseX, mouseY, mouseXMotion, mouseYMotion]);

  // Synchronized blinking for both eyes
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };

    const interval = setInterval(blink, Math.random() * 3000 + 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={characterRef}
      className={`${color} ${width} ${height} rounded-2xl flex flex-col items-center justify-start pt-8 gap-4`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -10, rotate: 2 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex gap-4">
        <Eye mouseX={mouseX} mouseY={mouseY} eyeRef={leftEyeRef} isBlinking={isBlinking} />
        <Eye mouseX={mouseX} mouseY={mouseY} eyeRef={rightEyeRef} isBlinking={isBlinking} />
      </div>
      
      {/* Mouth - animates when name is hovered */}
      <motion.div
        className="bg-white mt-2"
        animate={{
          width: isNameHovered ? "24px" : "32px",
          height: isNameHovered ? "24px" : "16px",
          borderRadius: isNameHovered ? "50%" : "0 0 50% 50%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

// Magnetic Text component
interface MagneticTextProps {
  text: string;
  hoverText?: string;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void;
}

function MagneticText({ text = "CREATIVE", hoverText = "EXPLORE", className, onHoverChange }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-flex items-center justify-center cursor-none select-none", className)}
    >
      <span className="text-4xl sm:text-7xl font-bold tracking-tighter text-fontPrimary-light dark:text-fontPrimary tracking-wide">
        {text}
      </span>

      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full bg-fontPrimary-light dark:bg-fontPrimary overflow-hidden"
        style={{
          width: isHovered ? 200 : 0,
          height: isHovered ? 200 : 0,
          transition: "width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height",
        }}
      >
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          <span className="text-4xl sm:text-7xl font-bold tracking-tighter text-bgDark-light dark:text-bgDark whitespace-nowrap tracking-wide">
            {hoverText}
          </span>
        </div>
      </div>
    </div>
  );
}

// Main Hero Section
const HeroSection: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const { x: mouseX, y: mouseY } = useMousePosition();

  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center p-4 sm:p-8 overflow-hidden bg-bgDark-light dark:bg-bgDark"
      id="home"
      style={{ perspective: "1000px" }}
    >
      <ThemeToggle />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Half - Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <MagneticText 
              text="Sanskar Sharma" 
              hoverText="Hello There :))" 
              className="font-sora" 
              onHoverChange={setIsNameHovered}
            />
          </motion.div>

          <motion.p
            className="text-xl sm:text-3xl w-full font-light text-fontPrimary-light dark:text-fontPrimary mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            A software engineer blending creativity and code to build impactful user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8"
          >
            <motion.a
              className="flex gap-1 bg-accentPurple3-light dark:bg-accentPurple3 hover:bg-accentPurple4-light dark:hover:bg-accentPurple4 transition-colors items-center justify-center px-6 rounded-lg text-sm py-3 sm:py-2 text-fontPrimary-light dark:text-fontPrimary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>
                <Download size={15} />
              </span>
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right Half - Characters */}
        <motion.div
          className="w-full lg:w-1/2 flex items-end justify-center -space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={animationComplete ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Character color="bg-purple-600" width="w-32" height="h-64" mouseX={mouseX} mouseY={mouseY} isNameHovered={isNameHovered} />
          <Character color="bg-purple-500" width="w-40" height="h-48" mouseX={mouseX} mouseY={mouseY} isNameHovered={isNameHovered} />
          <Character color="bg-purple-400" width="w-36" height="h-56" mouseX={mouseX} mouseY={mouseY} isNameHovered={isNameHovered} />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;