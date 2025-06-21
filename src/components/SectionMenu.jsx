import { useTranslation } from "react-i18next";
import ResumeDropdown from "./ResumeDropdown";

export default function SectionMenu({ className = "" }) {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-3 sm:gap-4 md:gap-6 justify-center flex-wrap ${className}`}>
      <a href="#about" className="uppercase px-2 sm:px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-cyan-400 dark:hover:text-cyan-400
        hover:border-cyan-400 dark:hover:border-cyan-400
        transition-all duration-200 relative text-sm sm:text-base md:text-lg"
      >
        {t("navigation.about")}
      </a>
      <a href="#experience" className="uppercase px-2 sm:px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-green-400 dark:hover:text-green-400
        hover:border-green-400 dark:hover:border-green-400
        transition-all duration-200 relative text-sm sm:text-base md:text-lg"
      >
        {t("navigation.experience")}
      </a>
      <a href="#skills" className="uppercase px-2 sm:px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-purple-400 dark:hover:text-purple-400
        hover:border-purple-400 dark:hover:border-purple-400
        transition-all duration-200 relative text-sm sm:text-base md:text-lg"
      >
        {t("navigation.skills")}
      </a>
      <a href="#projects" className="uppercase px-2 sm:px-3 pb-1 border-b-2 border-transparent
        text-vstextsoft dark:text-gray-300
        hover:text-yellow-400 dark:hover:text-yellow-400
        hover:border-yellow-400 dark:hover:border-yellow-400
        transition-all duration-200 relative text-sm sm:text-base md:text-lg"
      >
        {t("navigation.projects")}
      </a>
      <div className="text-sm sm:text-base md:text-lg">
        <ResumeDropdown />
      </div>
    </div>
  );
}