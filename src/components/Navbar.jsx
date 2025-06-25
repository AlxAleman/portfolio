import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaShareAlt } from "react-icons/fa";
import { MdEmail, MdMenu, MdClose } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import ResumeDropdown from "./ResumeDropdown";
import LanguageSelector from "./LanguageSelector";
import ContactModal from "./ContactModal";
import useScrollSpy from "../hooks/useScrollSpy";

// Define las secciones y su color (coinciden con los títulos de las secciones)
const sectionMenu = [
  { id: "about", label: "navigation.about", color: "text-cyan-600 dark:text-cyan-400 border-cyan-600 dark:border-cyan-400" },
  { id: "experience", label: "navigation.experience", color: "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400" },
  { id: "skills", label: "navigation.skills", color: "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400" },
  { id: "projects", label: "navigation.projects", color: "text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400" },
  { id: "resume", label: "navigation.resume", color: "text-gray-600 dark:text-gray-400 border-gray-600 dark:border-gray-400" },
];

export default function Navbar({ dark, setDark, showMenu }) {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para obtener las clases de hover específicas (colores más oscuros en light mode)
  const getHoverClasses = (id) => {
    switch(id) {
      case 'about':
        return 'hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-600 dark:hover:border-cyan-400';
      case 'experience':
        return 'hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-400';
      case 'skills':
        return 'hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-600 dark:hover:border-purple-400';
      case 'projects':
        return 'hover:text-yellow-600 dark:hover:text-yellow-400 hover:border-yellow-600 dark:hover:border-yellow-400';
      case 'resume':
        return 'hover:text-gray-600 dark:hover:text-gray-400 hover:border-gray-600 dark:hover:border-gray-400';
      default:
        return 'hover:text-gray-600 dark:hover:text-gray-400 hover:border-gray-600 dark:hover:border-gray-400';
    }
  };

  // Scrollspy: cuál sección está activa
  const sectionIds = sectionMenu.map((item) => item.id);
  const activeId = useScrollSpy(sectionIds, 120);

  // Blur al hacer scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú móvil cuando se hace click en un enlace
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Cerrar menú móvil cuando cambia el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para hacer scroll al top cuando se hace click en el logo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "navbar-glass shadow-light-lg"
          : "bg-transparent border-b border-transparent"}
      `}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-3 relative">
        {/* Izquierda: Logo + Redes (Desktop) */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover-soft rounded-lg px-2 py-1 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src="/png-mylogo.png" 
                alt="Alex Aleman Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="hidden sm:block text-lg lg:text-xl font-bold text-gray-800 dark:text-white">
              Alex Aleman
            </span>
          </motion.button>

          {/* Redes sociales - Solo desktop */}
          <div className="hidden lg:flex gap-3 items-center ml-4">
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <a href="https://github.com/AlxAleman" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} className="text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/alex-aleman-80569190/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} className="text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200" />
            </a>
          </div>
        </div>

        {/* Menú central - Desktop */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-base lg:text-lg font-medium absolute left-1/2 -translate-x-1/2">
          {activeId && sectionMenu.map((item) =>
            item.label === "navigation.resume" ? (
              <ResumeDropdown key={item.id} active={activeId === item.id} />
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  uppercase px-2 pb-1 border-b-2 border-transparent
                  transition-all duration-200
                  ${
                    activeId === item.id
                      ? `${item.color} border-current font-bold`
                      : `text-gray-600 dark:text-gray-400 ${getHoverClasses(item.id)}`
                  }
                `}
              >
                {t(item.label)}
              </a>
            )
          )}
        </div>

        {/* Derecha: contacto, idioma, dark/light - Desktop */}
        <div className="hidden sm:flex gap-2 lg:gap-3 items-center">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="btn-ghost flex items-center gap-2 font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <MdEmail className="text-lg" />
            <span className="hidden lg:inline">{t('contactButton')}</span>
          </button>
          
          <LanguageSelector />
          
          <button
            onClick={() => setDark(!dark)}
            className="p-2.5 rounded-lg border border-light hover:border-light-medium hover-soft transition-all duration-200"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <FiSun size={20} className="text-yellow-400" />
            ) : (
              <FiMoon size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Controles móviles - derecha */}
        <div className="flex sm:hidden gap-2 items-center">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg border border-light hover-soft transition-colors"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <FiSun size={18} className="text-yellow-400" />
            ) : (
              <FiMoon size={18} className="text-gray-600" />
            )}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-white hover-soft transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <MdClose size={24} />
            ) : (
              <MdMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-neutral-900 backdrop-blur-md border-t border-light shadow-light-lg overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Header con logo en móvil */}
              <div className="flex items-center justify-center gap-3 pb-4 border-b border-light">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
                  <img 
                    src="/png-mylogo.png" 
                    alt="Alex Aleman Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Alex Aleman</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
                </div>
              </div>

              {/* Enlaces de navegación */}
              <div className="space-y-3">
                {sectionMenu.map((item) =>
                  item.label === "navigation.resume" ? (
                    <div key={item.id} className="px-4">
                      <ResumeDropdown mobile />
                    </div>
                  ) : (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={handleLinkClick}
                      className={`
                        block px-4 py-2 text-lg font-medium uppercase rounded-lg transition-all duration-200
                        ${
                          activeId === item.id
                            ? `${item.color} bg-gray-100 dark:bg-gray-800`
                            : "text-gray-600 dark:text-gray-300 hover-soft"
                        }
                      `}
                    >
                      {t(item.label)}
                    </a>
                  )
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-light my-4"></div>

              {/* Acciones */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover-soft rounded-lg transition-colors"
                >
                  <MdEmail className="text-xl" />
                  <span className="font-medium">{t('contactButton')}</span>
                </button>

                <div className="px-4">
                  <LanguageSelector />
                </div>
              </div>

              {/* Redes sociales en móvil */}
              <div className="border-t border-light pt-4">
                <div className="flex justify-center gap-6">
                  <a href="https://github.com/AlxAleman" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/alex-aleman-80569190/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de contacto */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </nav>
  );
}