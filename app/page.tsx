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
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200]">
        <Navbar />
      </div>
      <main>
        <HeroSection />
        <ProjectSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <div className="bg-accentPurple1 flex items-center justify-center h-20">
        <Footer />
      </div>
    </div>
  );
}
