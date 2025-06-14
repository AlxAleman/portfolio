import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  // Puedes agregar más aquí
  // { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Switch language"
        title="Switch language"
      >
        <FaGlobe size={18} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-neutral-900 shadow-lg rounded-lg border border-neutral-200 dark:border-neutral-700 min-w-[60px] z-40 animate-fade-in">
          {LANGUAGES.map((lng) => (
            <button
              key={lng.code}
              onClick={() => changeLanguage(lng.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800
                ${i18n.language === lng.code ? "font-bold text-vscodeblue dark:text-vscodegreen" : ""}`}
            >
              {lng.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
