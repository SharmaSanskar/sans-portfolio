import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import WorkSection from "./components/WorkSection";

export default function Home() {
  return (
    <div className="bg-bgDark text-fontPrimary relative">
      {/* Desktop navbar positioning */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] hidden md:block">
        <Navbar />
      </div>

      {/* Mobile: Remove top margin to account for bottom navbar */}
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <ProjectSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Show Navbar for mobile at bottom */}
      <div className="md:hidden">
        <Navbar />
      </div>

      {/* Footer */}
      <div className="bg-accentPurple1 flex items-center justify-center h-20">
        <Footer />
      </div>
    </div>
  );
}
