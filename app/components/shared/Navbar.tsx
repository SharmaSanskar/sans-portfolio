function Navbar() {
  return (
    <nav className="bg-accentPurple1 px-10 py-3 rounded-xl shadow-xl shadow-black/20">
      <ul className="flex items-center gap-10">
        <a
          href="#home"
          className="hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all"
        >
          Home
        </a>
        <a
          href="#projects"
          className="hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all"
        >
          Projects
        </a>
        <a
          href="#work"
          className="hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all"
        >
          Work
        </a>
        <a
          href="#about"
          className="hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:scale-105 hover:text-fontSecondary cursor-pointer transition-all"
        >
          Contact
        </a>
      </ul>
    </nav>
  );
}

export default Navbar;
