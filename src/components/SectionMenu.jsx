// src/components/SectionMenu.jsx
import { useTranslation } from "react-i18next";
import ResumeDropdown from "./ResumeDropdown";

export default function SectionMenu({ className = "" }) {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-6 justify-center text-lg flex-wrap ${className}`}>
      <a href="#about" className="uppercase px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-vscodeblue dark:hover:text-vscodeblue
        hover:border-vscodeblue dark:hover:border-vscodeblue
        transition-all duration-200 relative"
      >
        {t("about")}
      </a>
      <a href="#experience" className="uppercase px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-vscodegreen dark:hover:text-vscodegreen
        hover:border-vscodegreen dark:hover:border-vscodegreen
        transition-all duration-200 relative"
      >
        {t("experience")}
      </a>
      <a href="#skills" className="uppercase px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-vscodemagenta dark:hover:text-vscodemagenta
        hover:border-vscodemagenta dark:hover:border-vscodemagenta
        transition-all duration-200 relative"
      >
        {t("skills")}
      </a>
      <a href="#projects" className="uppercase px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-vscodeyellow dark:hover:text-vscodeyellow
        hover:border-vscodeyellow dark:hover:border-vscodeyellow
        transition-all duration-200 relative"
      >
        {t("projects")}
      </a>
      <ResumeDropdown />
    </div>
  );
}
