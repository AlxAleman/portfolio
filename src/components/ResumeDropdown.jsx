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
        className="flex items-center gap-2 uppercase px-3 pb-1 border-b-2 border-transparent
          text-vstextsoft dark:text-gray-300
          hover:text-gray-400 hover:border-gray-400
          transition-all duration-200"
        title={t("resume.download_cv") || "Download Resume"}
      >
        <FiDownload className="w-5 h-5" />
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
              bg-white dark:bg-neutral-900 shadow-xl rounded-lg z-50 border border-neutral-200 dark:border-neutral-700 origin-top"
          >
            <a
              href="/Alex-Aleman-Resume_en.pdf"
              download
              className="block px-4 py-2 text-sm
                text-vstextsoft dark:text-gray-200
                hover:bg-vscodeblue hover:text-white transition-colors rounded-t-lg"
              onClick={() => setOpen(false)}
            >
              🇺🇸 {t("resume.resume_en") || "Resume (EN)"}
            </a>
            <a
              href="/Alex-Aleman-Resume_es.pdf"
              download
              className="block px-4 py-2 text-sm
                text-vstextsoft dark:text-gray-200
                hover:bg-vscodemagenta hover:text-white transition-colors rounded-b-lg"
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