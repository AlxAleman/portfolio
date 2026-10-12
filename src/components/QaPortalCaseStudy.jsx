// src/components/QaPortalCaseStudy.jsx
// Case study: contact-center QA data portal (anonymized; the linked demo uses fictional data only)
import { motion } from "framer-motion";
import { FiExternalLink, FiAlertCircle, FiSearch, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const DEMO_URL = "/demos/qa-portal/index.html";

const priorityStyles = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

function BulletList({ items, icon: Icon, iconClass }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
          <Icon className={`mt-0.5 flex-shrink-0 ${iconClass}`} size={14} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function QaPortalCaseStudy({ t }) {
  const k = (key) => `businessAnalyst.qaPortal.${key}`;
  const list = (key) => t(k(key), { returnObjects: true });
  const requirements = list("requirements");
  const decision = list("decision");

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
          {t(k("tag"))} — {t(k("productLabel"))}
        </span>
        <h3 className="text-xl font-bold text-slate-50 mb-2">{t(k("title"))}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-2">{t(k("intro"))}</p>
        <p className="text-slate-300 text-sm leading-relaxed">{t(k("role"))}</p>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors"
          >
            <FiExternalLink size={14} />
            {t(k("demoCta"))}
          </a>
          <span className="text-xs text-slate-500">{t(k("demoNote"))}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Problem + discovery */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800/80 p-4 bg-white/5">
            <h4 className="font-semibold text-slate-50 mb-3">{t(k("problemTitle"))}</h4>
            <BulletList items={list("problem")} icon={FiAlertCircle} iconClass="text-red-400" />
          </div>
          <div className="rounded-xl border border-slate-800/80 p-4 bg-white/5">
            <h4 className="font-semibold text-slate-50 mb-3">{t(k("discoveryTitle"))}</h4>
            <BulletList items={list("discovery")} icon={FiSearch} iconClass="text-cyan-400" />
          </div>
        </div>

        {/* Requirements (Given / When / Then) */}
        <div>
          <h4 className="font-semibold text-slate-50 mb-3">{t(k("requirementsTitle"))}</h4>
          <div className="grid lg:grid-cols-3 gap-4">
            {requirements.map((req) => (
              <div key={req.id} className="rounded-xl border border-slate-800/80 p-4 bg-white/5 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-violet-400">{req.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${priorityStyles[req.priority]}`}>
                    {req.priorityLabel}
                  </span>
                </div>
                <h5 className="font-semibold text-slate-50 mb-1 text-sm">{req.title}</h5>
                <p className="text-slate-400 text-xs mb-3">{req.description}</p>
                <div className="font-mono text-xs bg-black/60 text-slate-300 rounded-lg p-3 space-y-1.5 mt-auto">
                  <p className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">●</span>{req.given}</p>
                  <p className="flex gap-2"><span className="text-purple-400 flex-shrink-0">●</span>{req.when}</p>
                  <p className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span>{req.then}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder decision */}
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
          <h4 className="font-semibold text-violet-400 mb-2">{decision.title}</h4>
          <p className="text-slate-400 text-sm mb-4">{decision.description}</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {decision.stakeholders.map((s) => (
              <div key={s.role} className="rounded-lg bg-black/30 border border-slate-800/80 p-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{s.role}</span>
                <p className="text-sm text-slate-300 mt-1">{s.position}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-300 flex gap-2">
            <FiCheckCircle className="mt-0.5 text-green-400 flex-shrink-0" size={14} />
            {decision.resolution}
          </p>
        </div>

        {/* Solution: flow + features */}
        <div>
          <h4 className="font-semibold text-slate-50 mb-3">{t(k("solutionTitle"))}</h4>
          <div className="flex flex-col md:flex-row md:items-stretch gap-2 mb-4">
            {list("flow").map((step, i, all) => (
              <div key={step} className="flex md:flex-1 items-center gap-2">
                <div className="flex-1 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs text-violet-200 text-center h-full flex items-center justify-center">
                  <span className="font-mono text-violet-400 mr-1.5">{i + 1}</span>{step}
                </div>
                {i < all.length - 1 && <FiArrowRight className="hidden md:block text-violet-500 flex-shrink-0" size={14} />}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {list("features").map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-violet-500/10 text-violet-300 border-violet-500/30">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome + tools */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800/80 p-4 bg-white/5">
            <h4 className="font-semibold text-slate-50 mb-3">{t(k("outcomeTitle"))}</h4>
            <BulletList items={list("outcomes")} icon={FiCheckCircle} iconClass="text-green-400" />
          </div>
          <div className="rounded-xl border border-slate-800/80 p-4 bg-white/5">
            <h4 className="font-semibold text-slate-50 mb-3">{t(k("toolsTitle"))}</h4>
            <div className="flex flex-wrap gap-2">
              {list("tools").map((tool) => (
                <span key={tool} className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 text-slate-300 border border-slate-800">
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic mt-4">{t(k("confidentiality"))}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
