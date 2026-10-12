// src/components/ResumeDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function ResumeDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  // Cierra el dropdown si haces click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 uppercase px-3.5 py-1.5 rounded-lg text-xs sm:text-sm
          text-slate-400 hover:text-slate-100 hover:bg-slate-800/60
          transition-all duration-200"
        title={t("resume.download_cv") || "Download Resume"}
      >
        <FiDownload className="w-4 h-4" />
        {t("navigation.resume") || "Resume"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-48
              bg-gray-900 shadow-xl rounded-lg z-50 border border-slate-800/80 origin-top overflow-hidden"
          >
            <a
              href="/Alex Arnoldo Segura Aleman - ENG.pdf"
              download
              className="block px-4 py-2 text-sm
                text-slate-300
                hover:bg-indigo-500 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              🇺🇸 {t("resume.resume_en") || "Resume (EN)"}
            </a>
            <a
              href="/Alex Arnoldo Segura Aleman - ESP.pdf"
              download
              className="block px-4 py-2 text-sm
                text-slate-300
                hover:bg-violet-500 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              🇪🇸 {t("resume.resume_es") || "CV (ES)"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}