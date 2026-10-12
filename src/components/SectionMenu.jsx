import { useTranslation } from "react-i18next";
import ResumeDropdown from "./ResumeDropdown";

const links = [
  { id: "about", label: "navigation.about" },
  { id: "experience", label: "navigation.experience" },
  { id: "skills", label: "navigation.skills" },
  { id: "business-analyst", label: "navigation.businessAnalyst" },
  { id: "projects", label: "navigation.projects" },
];

export default function SectionMenu({ className = "" }) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 w-fit ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="uppercase px-3 sm:px-4 py-1.5 rounded-lg
            text-slate-400 hover:text-slate-100 hover:bg-slate-800/60
            transition-all duration-200 text-xs sm:text-sm"
        >
          {t(link.label)}
        </a>
      ))}
      <ResumeDropdown />
    </div>
  );
}
