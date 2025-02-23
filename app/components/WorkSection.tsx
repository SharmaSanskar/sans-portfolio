"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WorkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: "Frontend Developer - Intern",
      company: "Fourie.ai",
      period: "October 2022 - July 2024",
      description:
        "Built the public beta using Angular and TypeScript, integrated backend APIs and machine learning models, and worked with audio-video elements for content localization.",
    },
    {
      role: "Software Development Engineer - I",
      company: "Fourie.ai",
      period: "August 2022 - October 2022",
      description:
        "Led frontend development using Next.js and TypeScript, integrating authentication, payments, and AI-powered audio-video editing while collaborating with cross-functional teams and mentoring interns.",
    },
  ];

  return (
    <section
      className="relative min-h-[60vh] p-4 md:p-8"
      ref={sectionRef}
      id="work"
    >
      {/* Desktop title */}
      <div className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 items-center">
        <div className="transform rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <h1 className="font">WORK</h1>
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4"></div>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center my-4">
        <h1 className="text-3xl font-bold tracking-widest">WORK</h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4"></div>
        </div>
      </div>

      <div className="relative pt-8 md:pt-16 w-full md:w-3/4 mx-auto mt-4 md:mt-12">
        {/* Timeline line */}
        <motion.div
          className="absolute top-24 left-0 right-0 h-1 rounded-full bg-accentPurple2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Experience items */}
        <div className="relative flex flex-col md:flex-row md:justify-around gap-8 md:gap-4 text-fontPrimary">
          {experiences.map((exp, index) => (
            <div key={index} className="w-full md:w-[40%] relative">
              {/* Date label */}
              <motion.div
                className="text-sm text-fontSecondary mb-2 text-center md:absolute md:-top-1 md:left-[50%] md:transform md:-translate-x-1/2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.4,
                  ease: "easeOut",
                }}
              >
                {exp.period}
              </motion.div>

              {/* Experience box */}
              <motion.div
                className="bg-accentPurple1 px-6 md:px-12 py-6 md:py-8 rounded-xl mt-2 md:mt-12"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -40 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.6,
                  ease: "easeOut",
                }}
              >
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <div className="mb-2 opacity-60">{exp.company}</div>
                <p className="text-sm">{exp.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
