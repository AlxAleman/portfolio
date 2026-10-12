import { motion, AnimatePresence } from "framer-motion";
import profileImg from "/src/assets/profile-avatar.webp";
import { useTranslation } from "react-i18next";
import Typewriter from "./Typewriter";
import SectionMenu from "./SectionMenu";
import { FiClock, FiPackage, FiAward, FiGlobe } from "react-icons/fi";

const stats = [
  { key: "experience", icon: FiClock, accent: "text-indigo-400" },
  { key: "projects", icon: FiPackage, accent: "text-cyan-400" },
  { key: "certifications", icon: FiAward, accent: "text-violet-400" },
  { key: "countries", icon: FiGlobe, accent: "text-indigo-400" },
];

export default function ProfilePulse({ showMenu = true }) {
  const { t } = useTranslation();
  const phrases = t("typewriter", { returnObjects: true });

  return (
    <section className="pt-28 sm:pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Avatar + status row */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative shrink-0 group">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
            <motion.div
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gray-950"
              animate={{
                boxShadow: [
                  "0 0 0px #6366f166",
                  "0 0 20px #6366f1aa",
                  "0 0 0px #6366f166",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={profileImg}
                alt="Alex Aleman"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
            <span className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-400 border-2 border-gray-950"></span>
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800/60 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="label-badge text-cyan-400">{t("about.location.remote")}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs sm:text-sm">
              <span className="text-indigo-400 font-medium">Alex Aleman</span>
              <span className="text-slate-600">•</span>
              <Typewriter phrases={phrases} />
            </div>
          </div>
        </div>

        {/* Headline principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
          <span className="text-slate-50">CRM Admin, Business Analyst &</span>{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
          {t("hero.subtitle")}
        </p>

        {/* Acciones / navegación (misma posición de siempre) */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="menu"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-10"
            >
              <SectionMenu />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bento row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ key, icon: Icon, accent }) => (
            <div
              key={key}
              className="bento-card hover:border-indigo-500/40 p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="label-badge text-slate-500">{t(`about.stats.${key}`)}</span>
                <Icon className={accent} size={18} />
              </div>
              <div className="stat-metric text-2xl">
                {key === "experience" && <>10<span className="text-indigo-400">+</span></>}
                {key === "projects" && <>50<span className="text-cyan-400">+</span></>}
                {key === "certifications" && <>05</>}
                {key === "countries" && <>03</>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
