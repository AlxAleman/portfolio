// src/App.jsx
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import Navbar from "./components/Navbar.jsx";
import ProfilePulse from "./components/ProfilePulse.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";

function App() {
  const [dark, setDark] = useState(() => {
    // Si no hay tema guardado, usa dark por defecto
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // ← true = dark por defecto
  });

  const heroRef = useRef(null);
  const [showMenuInNavbar, setShowMenuInNavbar] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      
      // Cuando el bottom del hero está por encima del navbar (por ejemplo, 80px)
      setShowMenuInNavbar(rect.bottom < 80);
      
      // Mostrar botón scroll to top después de 300px
      setShowScrollToTop(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // para actualizar al cargar
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Función para hacer scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

      {/* Botón flotante para scroll to top */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;