import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdMenu, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import ResumeDropdown from "./ResumeDropdown";
import LanguageSelector from "./LanguageSelector";
import ContactModal from "./ContactModal";
import useScrollSpy from "../hooks/useScrollSpy";

// Secciones de navegación (nav neutra, sin color-coding por sección)
const sectionMenu = [
  { id: "about", label: "navigation.about" },
  { id: "experience", label: "navigation.experience" },
  { id: "skills", label: "navigation.skills" },
  { id: "business-analyst", label: "navigation.businessAnalyst" },
  { id: "projects", label: "navigation.projects" },
  { id: "resume", label: "navigation.resume" },
];

export default function Navbar({ showMenu }) {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          ? "navbar-glass shadow-[0_1px_8px_rgba(0,0,0,0.25)]"
          : "bg-transparent border-b border-transparent"}
      `}
    >
      <div className="flex items-center px-4 sm:px-6 lg:px-12 py-3 gap-2">
        {/* Izquierda: Logo + Redes (Desktop) */}
        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:bg-slate-800/60 rounded-lg px-2 py-1 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-indigo-500/30">
              <img
                src="/alex-logo.png"
                alt="Alex Aleman Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="hidden sm:block text-lg lg:text-xl font-semibold text-slate-50">
              Alex Aleman
            </span>
          </motion.button>

          {/* Redes sociales - Solo desktop */}
          <div className="hidden lg:flex gap-3 items-center ml-2">
            <div className="w-px h-6 bg-slate-700"></div>
            <a href="https://github.com/AlxAleman" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={20} className="text-slate-400 hover:text-indigo-400 transition-colors duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/alex-aleman-80569190/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={20} className="text-slate-400 hover:text-indigo-400 transition-colors duration-200" />
            </a>
            {/* Email solo visible en pantallas muy anchas */}
            <a href="mailto:alxaleman@gmail.com" aria-label="Email" className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors duration-200 border border-slate-700 hover:border-indigo-500/50 rounded-full px-2.5 py-1">
              <MdEmail size={14} />
              <span>alxaleman@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Menú central - pill nav neutra */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 text-sm lg:text-base font-medium">
            {activeId && sectionMenu.map((item) =>
              item.label === "navigation.resume" ? (
                <ResumeDropdown key={item.id} active={activeId === item.id} />
              ) : (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`
                    uppercase px-3.5 py-1.5 rounded-lg
                    transition-all duration-200 whitespace-nowrap text-xs lg:text-sm
                    ${
                      activeId === item.id
                        ? "bg-slate-800 text-slate-50 font-semibold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }
                  `}
                >
                  {t(item.label)}
                </a>
              )
            )}
          </div>
        </div>

        {/* Derecha: contacto, idioma - Desktop */}
        <div className="hidden sm:flex gap-2 lg:gap-3 items-center flex-shrink-0">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-2 font-medium px-3 py-1.5 rounded-lg text-slate-300 hover:text-slate-50 hover:bg-slate-800/60 transition-all duration-200"
          >
            <MdEmail className="text-lg" />
            <span className="hidden lg:inline">{t('contactButton')}</span>
          </button>

          <LanguageSelector />
        </div>

        {/* Controles móviles - derecha */}
        <div className="flex sm:hidden gap-2 items-center ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-200 hover:bg-slate-800/60 transition-colors"
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
            className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-slate-800/80 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Header con logo en móvil */}
              <div className="flex items-center justify-center gap-3 pb-4 border-b border-slate-800/80">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md ring-1 ring-indigo-500/30">
                  <img
                    src="/png-mylogo.png"
                    alt="Alex Aleman Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-50">Alex Aleman</h3>
                  <p className="text-sm text-slate-400">Full Stack Developer</p>
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
                            ? "text-slate-50 bg-slate-800"
                            : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                        }
                      `}
                    >
                      {t(item.label)}
                    </a>
                  )
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-800/80 my-4"></div>

              {/* Acciones */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800/60 hover:text-slate-50 rounded-lg transition-colors"
                >
                  <MdEmail className="text-xl" />
                  <span className="font-medium">{t('contactButton')}</span>
                </button>

                <div className="px-4">
                  <LanguageSelector />
                </div>
              </div>

              {/* Redes sociales en móvil */}
              <div className="border-t border-slate-800/80 pt-4">
                <div className="flex justify-center gap-6 mb-3">
                  <a href="https://github.com/AlxAleman" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub size={24} className="text-slate-400 hover:text-indigo-400 transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/alex-aleman-80569190/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin size={24} className="text-slate-400 hover:text-indigo-400 transition-colors" />
                  </a>
                </div>
                <div className="flex justify-center">
                  <a href="mailto:alxaleman@gmail.com" className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    <MdEmail size={16} />
                    alxaleman@gmail.com
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