// src/App.jsx
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import Navbar from "./components/Navbar.jsx";
import ProfilePulse from "./components/ProfilePulse.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import BusinessAnalyst from "./components/BusinessAnalyst.jsx";
import Projects from "./components/Projects.jsx";

function App() {
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

  // Función para hacer scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative bg-canvas">
      {/* Fondo base */}
      <div className="fixed inset-0 z-0 bg-canvas"></div>

      {/* Ambient glow blobs compartidos entre secciones */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px]"></div>
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]"></div>
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-violet-500/10 blur-[140px]"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-slate-50">
        {/* Navbar fija */}
        <Navbar showMenu={showMenuInNavbar} />
        
        {/* Hero/landing principal */}
        <div ref={heroRef}>
          <ProfilePulse showMenu={!showMenuInNavbar} />
        </div>
        
        {/* Secciones principales */}
        <main>
          <About />
          <Experience />
          <Skills />
          <BusinessAnalyst />
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
            className="fixed bottom-6 right-6 z-50 p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
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