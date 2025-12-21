"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WorkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: "Web Application Software Intern",
      company: "Lightmatter",
      location: "Boston, MA",
      period: "May 2025 - Present",
      description:
        "Building web applications in Next.js and TypeScript to display real-time hardware data, developing backend features with Node.js and MongoDB, and integrating REST, GraphQL and gRPC APIs.",
    },
    {
      role: "Software Development Engineer - I",
      company: "Fourie.ai (by SyncSense)",
      location: "Bangalore, India",
      period: "October 2022 - July 2024",
      description:
        "Led frontend development for Fourie's audio-video editing platform, integrated LLMs for real-time speech processing across 600+ languages, and optimized NLP models reducing inference latency by 40%.",
    },
    {
      role: "Frontend Developer - Intern",
      company: "Fourie.ai (by SyncSense)",
      location: "Bangalore, India",
      period: "August 2022 - September 2022",
      description:
        "Implemented key frontend features with Angular and TypeScript, reduced load times by over 80%, and created interactive data visualizations for model performance monitoring.",
    }
  ];

  return (
    <section
      className="relative min-h-[60vh] p-4 md:p-8 bg-bgDark-light dark:bg-bgDark"
      ref={sectionRef}
      id="work"
    >
      {/* Desktop title */}
      <div className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 items-center">
        <div className="transform rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <h1 className="text-fontPrimary-light dark:text-fontPrimary">WORK</h1>
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center my-4">
        <h1 className="text-3xl font-bold tracking-widest text-fontPrimary-light dark:text-fontPrimary">
          WORK
        </h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
        </div>
      </div>

      <div className="relative pt-8 md:pt-16 w-full mx-auto mt-4 md:mt-12 flex justify-center">
        {/* Experience items - Single column vertical layout with reduced width */}
        <div className="relative flex flex-col gap-8 text-fontPrimary-light dark:text-fontPrimary w-full max-w-2xl">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  exp: {
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
  };
  index: number;
  isInView: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index, isInView }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-accentPurple1-light dark:bg-accentPurple1 px-6 md:px-12 py-6 md:py-8 rounded-xl cursor-pointer"
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2 + 0.4,
        ease: "easeOut",
      }}
    >
      <div className="text-sm text-fontSecondary-light dark:text-fontSecondary mb-3">
        {exp.period}
      </div>
      <h3 className="font-semibold text-lg">{exp.role}</h3>
      <div className="mb-1 opacity-60">{exp.company}</div>
      <div className="text-sm opacity-60 mb-3">{exp.location}</div>
      <p className="text-sm">{exp.description}</p>
    </motion.div>
  );
};

export default WorkSection;