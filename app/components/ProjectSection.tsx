"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { useRef } from "react";

const ProjectCard = ({ project, index }) => {
  const projectRef = useRef(null);
  const isInView = useInView(projectRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={projectRef}
      className={`flex flex-col md:flex-row items-center bg-accentPurple1-light dark:bg-accentPurple1 shadow-lg shadow-black/20 text-fontPrimary-light dark:text-fontPrimary rounded-2xl px-4 sm:px-12 py-4 ${
        index % 2 === 0 ? "" : "md:flex-row-reverse"
      }`}
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div className="relative w-full md:w-1/2 h-40 sm:h-52 mb-4 md:mb-0">
        <motion.div
          className="absolute top-0 left-0 w-5/6 h-full rounded-xl shadow-2xl shadow-bgDark-light dark:shadow-bgDark"
          initial={{
            rotateY: -30,
            rotateZ: -3,
            translateX: index % 2 === 0 ? -20 : 40,
            translateY: index % 2 === 0 ? 20 : 20,
          }}
          whileHover={{
            rotateY: 0,
            rotateZ: 0,
            translateX: index % 2 === 0 ? -20 : 40,
            translateY: index % 2 === 0 ? 20 : 20,
          }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 1 }}
        >
          <Image
            src={project.images[0]}
            alt={`${project.title} Screenshot 1`}
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </motion.div>
        <motion.div
          className="absolute top-0 left-4 sm:left-8 w-5/6 h-full rounded-xl shadow-2xl shadow-bgDark-light dark:shadow-bgDark"
          initial={{
            rotateY: 30,
            rotateZ: 3,
            translateX: index % 2 === 0 ? 10 : 50,
            translateY: index % 2 === 0 ? -30 : -30,
          }}
          whileHover={{
            rotateY: 0,
            rotateZ: 0,
            translateX: index % 2 === 0 ? 10 : 50,
            translateY: index % 2 === 0 ? -30 : -30,
          }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 0 }}
        >
          <Image
            src={project.images[1]}
            alt={`${project.title} Screenshot 2`}
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </motion.div>
      </motion.div>
      <div className="w-full mt-10 md:mt-0 md:w-1/2 px-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="mb-4 opacity-60 text-sm sm:text-base">
          {project.description}
        </p>
        <div className="mt-auto flex items-center space-x-4">
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1 bg-accentPurple2-light dark:bg-accentPurple2 hover:bg-accentPurple3-light dark:hover:bg-accentPurple3 transition-colors items-center px-4 sm:px-6 rounded-lg text-sm py-2 text-fontPrimary-light dark:text-fontPrimary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>
              <Github size={15} />
            </span>
            <span>View Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const projects = [
  {
    title: "Cryptoplace",
    description:
      "Next.js, TailwindCSS, and Redis crypto info app with a Flask backend for sentiment analysis and price prediction.",
    githubLink: "https://github.com/SharmaSanskar/nextjs-cryptoplace",
    showcaseLink: "#",
    images: ["/images/cryptoplace-1.png", "/images/cryptoplace-2.png"],
  },
  {
    title: "Concord Video Chat",
    description:
      "React, Firebase, and WebRTC video chat app for finding, adding, and chatting with friends based on common topics, with group chat support.",
    githubLink: "https://github.com/SharmaSanskar/react-concord-videochat",
    showcaseLink: "#",
    images: ["/images/concord-1.png", "/images/concord-2.png"],
  },
  {
    title: "GradHelp",
    description:
      "React, FastAPI, and MongoDB app using ML/DL models for US university admission prediction and recommendations.",
    githubLink: "https://github.com/SharmaSanskar/ml-gradhelp",
    showcaseLink: "#",
    images: ["/images/gradhelp-1.png", "/images/gradhelp-2.png"],
  },
];

const ProjectSection = () => {
  return (
    <section
      className="relative min-h-screen p-4 sm:p-8 bg-bgDark-light dark:bg-bgDark"
      id="projects"
    >
      <div className="hidden md:flex absolute -left-12 items-center top-1/2 -translate-y-1/2">
        <div className="transform -rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <h1 className="font text-fontPrimary-light dark:text-fontPrimary">
            PROJECTS
          </h1>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center mb-14">
        <h1 className="text-3xl font-bold tracking-widest text-fontPrimary-light dark:text-fontPrimary">
          PROJECTS
        </h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-16 sm:gap-28">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
