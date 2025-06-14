import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaShareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ResumeDropdown from "./ResumeDropdown";
import useScrollSpy from "../hooks/useScrollSpy";

// Define las secciones y su color (usa los nombres de tailwind.config.js)
const sectionMenu = [
  { id: "about", label: "about", color: "text-vscodeblue border-vscodeblue" },
  { id: "experience", label: "experience", color: "text-vscodegreen border-vscodegreen" },
  { id: "skills", label: "skills", color: "text-vscodemagenta border-vscodemagenta" },
  { id: "projects", label: "projects", color: "text-vscodeyellow border-vscodeyellow" },
  { id: "resume", label: "resume", color: "text-vscodeyellow border-vscodeyellow" }, // Resume igual que projects, puedes cambiar
];

export default function Navbar({ dark, setDark }) {
  const { t } = useTranslation();

  // Scrollspy: cuál sección está activa
  const sectionIds = sectionMenu.map((item) => item.id);
  const activeId = useScrollSpy(sectionIds, 120); // Ajusta offset si tu hero es alto

  // Blur al hacer scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 shadow-lg"
          : "bg-transparent border-b border-transparent"}
      `}
    >
      <div className="flex justify-between items-center px-6 sm:px-12 py-3 relative">
        {/* Izquierda: iconos redes */}
        <div className="flex gap-5 items-center">
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">
            <FaGithub size={26} className="text-neutral-900 dark:text-white" />
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={26} className="text-neutral-900 dark:text-white" />
          </a>
          <FaShareAlt size={26} className="text-neutral-900 dark:text-white" />
        </div>

        {/* Menú central */}
        <div className="hidden md:flex gap-8 text-lg font-medium absolute left-1/2 -translate-x-1/2">
          {activeId && sectionMenu.map((item) =>
            item.label === "resume" ? (
              // ResumeDropdown solo en navbar
              <ResumeDropdown key={item.id}
                active={activeId === item.id}
              />
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
                      : "text-vstextsoft dark:text-gray-400 hover:" +
                        item.color.split(" ")[0] + " hover:border-current"
                  }
                `}
              >
                {t(item.label)}
              </a>
            )
          )}
        </div>

        {/* Derecha: contacto, idioma, dark/light */}
        <div className="flex gap-3 items-center">
          <a
            href="mailto:tu@email.com"
            className="flex items-center gap-2 font-medium text-neutral-900 dark:text-white hover:underline"
          >
            <MdEmail />{t("contact")}
          </a>
          {/* Cambia esto por tu selector de idioma si lo tienes */}
          <span className="text-neutral-900 dark:text-white">
            🌐
          </span>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full border border-current transition-colors"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <FiSun size={22} className="text-white" />
            ) : (
              <FiMoon size={22} className="text-black" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
