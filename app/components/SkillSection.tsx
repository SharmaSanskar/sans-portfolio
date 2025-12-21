"use client";

import React from "react";
import IconCloud from "./shared/IconCloud";

const SkillSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[60vh] p-4 md:p-8 bg-bgDark-light dark:bg-bgDark"
      id="skills"
    >
      {/* Desktop title */}
      <div className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 items-center">
        <div className="transform rotate-90 text-4xl tracking-widest font-bold flex items-center gap-3">
          <h1 className="text-fontPrimary-light dark:text-fontPrimary">SKILLS</h1>
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
        </div>
      </div>

      {/* Mobile title */}
      <div className="md:hidden text-center my-4">
        <h1 className="text-3xl font-bold tracking-widest text-fontPrimary-light dark:text-fontPrimary">SKILLS</h1>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-12 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
          <div className="w-1 h-1 bg-accentPurple4-light dark:bg-accentPurple4"></div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-6">
        <div className="w-full max-w-4xl p-0 m-0 flex justify-center">
          {/* Pass size prop to control overall cloud size (px) */}
          <IconCloud size={520} />
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
