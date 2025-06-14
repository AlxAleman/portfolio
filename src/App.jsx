// src/App.jsx
import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ProfilePulse from "./components/ProfilePulse.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const heroRef = useRef(null);
  const [showMenuInNavbar, setShowMenuInNavbar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Cuando el bottom del hero está por encima del navbar (por ejemplo, 80px)
      setShowMenuInNavbar(rect.bottom < 80);
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // para actualizar al cargar
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen relative">
      {/* Fondo gradiente solo en light mode */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#f4f4f8] via-[#e7ebf2] to-[#f7fafd] dark:hidden"></div>
      {/* Fondo oscuro solo en dark mode */}
      <div className="fixed inset-0 z-0 bg-vsbg hidden dark:block"></div>

      {/* Contenido principal */}
      <div className="relative z-10 text-vstextlight dark:text-white transition-colors">
        {/* Navbar fija */}
        <Navbar dark={dark} setDark={setDark} showMenu={showMenuInNavbar} />
        {/* Hero/landing principal */}
        <div ref={heroRef}>
          <ProfilePulse showMenu={!showMenuInNavbar} />
        </div>
        {/* Secciones principales */}
        <main>
          <About />
          <Experience />
          <Skills />
          <Projects />
        </main>
      </div>
    </div>
  );
}

export default App;
