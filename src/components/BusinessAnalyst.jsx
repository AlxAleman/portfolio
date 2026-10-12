// src/components/BusinessAnalyst.jsx
import { useTranslation } from "react-i18next";
import QaPortalCaseStudy from "./QaPortalCaseStudy";
import { motion } from "framer-motion";
import {
  FiCompass,
  FiClipboard,
  FiCalendar,
  FiPlay,
  FiCheckCircle,
  FiFlag,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiVideo,
  FiMessageSquare,
  FiAward,
} from "react-icons/fi";

const stageIcons = {
  discovery: FiCompass,
  requirements: FiClipboard,
  planning: FiCalendar,
  execution: FiPlay,
  validation: FiCheckCircle,
  closure: FiFlag,
};

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span className="inline-block uppercase tracking-widest text-xs font-semibold text-violet-400 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4">
        <span className="text-slate-300">{title.split(" & ")[0]}</span>
        {title.includes(" & ") && (
          <>
            {" & "}
            <span className="text-violet-400 font-semibold">
              {title.split(" & ")[1]}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base max-w-2xl mx-auto">{subtitle}</p>
      )}
      <motion.div
        className="w-24 h-1 bg-violet-500 mx-auto mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}

function ProcessDiagram({ t }) {
  const stages = t("businessAnalyst.process.stages", { returnObjects: true });

  return (
    <div className="space-y-4 mb-8">
      {stages.map((stage, sIdx) => {
        const Icon = stageIcons[stage.key] || FiCompass;
        return (
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: sIdx * 0.08 }}
            className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-5 border border-violet-500/20 hover:border-violet-500/40 transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center border border-violet-500/30">
                  <Icon className="text-violet-400" size={18} />
                </div>
                <h3 className="font-bold text-slate-50">{stage.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {stage.phases.map((phase) => (
                  <span
                    key={phase.name}
                    title={phase.entry ? t("businessAnalyst.process.entryLabel") : undefined}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      phase.entry
                        ? "bg-slate-800/60 text-slate-400 border-slate-700"
                        : "bg-violet-500/10 text-violet-300 border-violet-500/30"
                    }`}
                  >
                    {phase.name}
                    {phase.note === "prioritization" && (
                      <sup className="ml-0.5 text-violet-500">*</sup>
                    )}
                    {phase.entry && (
                      <sup className="ml-0.5 text-gray-400">†</sup>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="text-xs text-slate-500 space-y-1 pt-2 px-1">
        <p>
          <span className="text-gray-400">†</span> {t("businessAnalyst.process.entryNote")}
        </p>
        <p>
          <span className="text-violet-500">*</span> {t("businessAnalyst.process.prioritizationNote")}
        </p>
      </div>
    </div>
  );
}

function CaseStudyCard({ t }) {
  const requirements = t("businessAnalyst.caseStudy.requirements", { returnObjects: true });
  const openQuestion = t("businessAnalyst.caseStudy.openQuestion", { returnObjects: true });

  const priorityStyles = {
    high: "bg-red-500/15 text-red-400 border-red-500/30",
    medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-violet-500/10">
        <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-violet-400 mb-2">
          {t("businessAnalyst.caseStudy.tag")} — {t("businessAnalyst.caseStudy.productLabel")}
        </span>
        <h3 className="text-xl font-bold text-slate-50 mb-2">
          {t("businessAnalyst.caseStudy.title")}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {t("businessAnalyst.caseStudy.intro")}
        </p>
      </div>

      {/* Requirements */}
      <div className="p-6 space-y-4">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="rounded-xl border border-slate-800/80 p-4 bg-white/5"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-violet-400">
                {req.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${priorityStyles[req.priority]}`}
              >
                {req.priorityLabel}
              </span>
            </div>
            <h4 className="font-semibold text-slate-50 mb-1">{req.title}</h4>
            <p className="text-slate-400 text-sm mb-3">{req.description}</p>
            <div className="font-mono text-xs bg-black/60 text-slate-300 rounded-lg p-3 space-y-1.5">
              <p className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">●</span>{req.given}</p>
              <p className="flex gap-2"><span className="text-purple-400 flex-shrink-0">●</span>{req.when}</p>
              <p className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span>{req.then}</p>
            </div>
          </div>
        ))}

        {/* Open question */}
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
          <h4 className="font-semibold text-violet-400 mb-2">
            {openQuestion.title}
          </h4>
          <p className="text-slate-400 text-sm mb-4">{openQuestion.description}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {openQuestion.stakeholders.map((s) => (
              <div
                key={s.role}
                className="rounded-lg bg-black/30 border border-slate-800/80 p-3"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {s.role}
                </span>
                <p className="text-sm text-slate-300 mt-1">{s.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BeforeAfterCard({ t }) {
  const before = t("businessAnalyst.beforeAfter.before", { returnObjects: true });
  const after = t("businessAnalyst.beforeAfter.after", { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 p-6"
    >
      <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-violet-400 mb-2">
        {t("businessAnalyst.beforeAfter.tag")}
      </span>
      <h3 className="text-xl font-bold text-slate-50 mb-4">
        {t("businessAnalyst.beforeAfter.title")}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Before panel */}
        <div className="rounded-xl border border-slate-700 p-4 bg-black/30">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {before.label}
          </span>
          <p className="text-sm text-slate-400 mt-1 mb-3">{before.description}</p>
          {/* Generic video grid mock — no avatars, single language */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-md bg-slate-700 flex items-center justify-center"
              >
                <FiVideo className="text-slate-500" size={16} />
              </div>
            ))}
          </div>
          <ul className="space-y-1.5">
            {before.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* After panel */}
        <div className="rounded-xl border border-violet-500/40 p-4 bg-violet-500/5">
          <span className="text-xs font-bold uppercase tracking-wide text-violet-400">
            {after.label}
          </span>
          <p className="text-sm text-slate-400 mt-1 mb-3">{after.description}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {["EN", "ES", "FR", "PT"].map((lang) => (
              <div
                key={lang}
                className="aspect-video rounded-md bg-violet-500/15 border border-violet-500/30 flex flex-col items-center justify-center gap-0.5"
              >
                <div className="w-4 h-4 rounded-full bg-violet-400/60" />
                <span className="text-[9px] font-bold text-violet-400">{lang}</span>
              </div>
            ))}
          </div>
          <ul className="space-y-1.5">
            {after.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                <FiMessageSquare className="mt-0.5 text-violet-500 flex-shrink-0" size={11} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-slate-400 italic border-t border-violet-500/10 pt-4">
        {t("businessAnalyst.beforeAfter.context")}
      </p>
    </motion.div>
  );
}

function KpiDashboardCard({ t }) {
  const metrics = t("businessAnalyst.kpiDashboard.metrics", { returnObjects: true });
  const channels = t("businessAnalyst.kpiDashboard.channels", { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 p-6"
    >
      <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-violet-400 mb-2">
        {t("businessAnalyst.kpiDashboard.tag")}
      </span>
      <h3 className="text-xl font-bold text-slate-50 mb-1">
        {t("businessAnalyst.kpiDashboard.title")}
      </h3>
      <p className="text-slate-500 text-xs italic mb-5">
        {t("businessAnalyst.kpiDashboard.note")}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-slate-800/80 bg-white/5 p-4 text-center"
          >
            <div className="text-2xl font-bold text-violet-400">{m.value}</div>
            <div className="text-xs text-slate-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
        <FiTrendingUp className="text-violet-500" size={14} />
        {t("businessAnalyst.kpiDashboard.channelsTitle")}
      </h4>
      <div className="space-y-3">
        {channels.map((c) => (
          <div key={c.label}>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{c.label}</span>
              <span>{c.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${c.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function StakeholderMapCard({ t }) {
  const stakeholders = t("businessAnalyst.stakeholderMap.stakeholders", { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 p-6"
    >
      <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-violet-400 mb-2">
        {t("businessAnalyst.stakeholderMap.tag")}
      </span>
      <h3 className="text-xl font-bold text-slate-50 mb-1">
        {t("businessAnalyst.stakeholderMap.title")}
      </h3>
      <p className="text-slate-400 text-sm mb-5">
        {t("businessAnalyst.stakeholderMap.context")}
      </p>

      <div className="rounded-xl border border-dashed border-violet-500/30 bg-violet-500/5 p-4 mb-4">
        <span className="text-xs font-bold uppercase tracking-wide text-violet-400">
          {t("businessAnalyst.stakeholderMap.quadrantLabel")}
        </span>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          {stakeholders.map((s) => (
            <div
              key={s.role}
              className="rounded-lg bg-black/30 border border-slate-800/80 p-3 flex flex-col items-center text-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                <FiUsers className="text-violet-400" size={16} />
              </div>
              <span className="text-sm font-semibold text-slate-50">{s.role}</span>
              <p className="text-xs text-slate-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillsCertsCards({ t }) {
  const skills = t("businessAnalyst.skillsCerts.skills", { returnObjects: true });
  const certs = t("businessAnalyst.skillsCerts.certs", { returnObjects: true });

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <FiTarget className="text-violet-400" size={18} />
          <h3 className="font-bold text-slate-50">
            {t("businessAnalyst.skillsCerts.skillsTitle")}
          </h3>
        </div>
        <ul className="space-y-2">
          {skills.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-violet-500/20 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <FiAward className="text-violet-400" size={18} />
          <h3 className="font-bold text-slate-50">
            {t("businessAnalyst.skillsCerts.certsTitle")}
          </h3>
        </div>
        <ul className="space-y-2">
          {certs.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-sm text-slate-300 px-3 py-2 rounded-lg bg-violet-500/5 border border-violet-500/20"
            >
              <FiCheckCircle className="text-violet-500 flex-shrink-0" size={14} />
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function BusinessAnalyst() {
  const { t } = useTranslation();

  return (
    <section id="business-analyst" className="py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* 1. Intro / positioning */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block uppercase tracking-widest text-xs font-semibold text-violet-400 mb-3">
            {t("businessAnalyst.intro.eyebrow")}
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-wide mb-5">
            <span className="text-slate-300">Full Stack Developer &</span>{" "}
            <span className="text-violet-400 font-semibold">Business Analyst</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {t("businessAnalyst.intro.body")}
          </p>
        </motion.div>

        {/* 2. Process diagram */}
        <SectionHeading
          title={t("businessAnalyst.process.title")}
          subtitle={t("businessAnalyst.process.subtitle")}
        />
        <ProcessDiagram t={t} />

        {/* 3-5. Case study / Before-After / KPI dashboard */}
        <div className="grid gap-6 mt-14">
          <QaPortalCaseStudy t={t} />
          <CaseStudyCard t={t} />
          <BeforeAfterCard t={t} />
          <KpiDashboardCard t={t} />

          {/* 6. Stakeholder map */}
          <StakeholderMapCard t={t} />
        </div>

        {/* 7. Skills + certifications */}
        <div className="mt-14">
          <SkillsCertsCards t={t} />
        </div>

        {/* 8. CTA final */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-16 pt-10 border-t border-violet-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-50 mb-3">
            {t("businessAnalyst.cta.title")}
          </h3>
          <p className="text-slate-400 leading-relaxed">
            {t("businessAnalyst.cta.body")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
