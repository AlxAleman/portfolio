import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiCode,
  FiMonitor,
  FiClipboard,
  FiCalendar as FiCalendarIcon,
  FiClock,
  FiMapPin,
  FiBarChart2,
} from 'react-icons/fi';

const iconMap = {
  ba: FiBarChart2,
  crm: FiCode,
  webdev: FiMonitor,
  qa: FiClipboard,
  scheduler: FiCalendarIcon,
};

const accentCycle = ['indigo', 'cyan', 'violet', 'indigo'];
const accentClasses = {
  indigo: { bg: 'bg-indigo-500/15', border: 'border-indigo-500/30', text: 'text-indigo-400', dot: 'bg-indigo-400' },
  cyan: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  violet: { bg: 'bg-violet-500/15', border: 'border-violet-500/30', text: 'text-violet-400', dot: 'bg-violet-400' },
};

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 5,
      job: 'ba',
      title: t('experience.jobs.ba.title'),
      company: 'Telus Digital',
      logo: '/assets/companies/telus.webp',
      period: t('experience.jobs.ba.period'),
      location: 'El Salvador',
      type: 'Remote',
      description: t('experience.jobs.ba.description'),
      responsibilities: [
        t('experience.jobs.ba.responsibilities.0'),
        t('experience.jobs.ba.responsibilities.1'),
        t('experience.jobs.ba.responsibilities.2'),
        t('experience.jobs.ba.responsibilities.3'),
        t('experience.jobs.ba.responsibilities.4')
      ],
      technologies: ['Business Analysis', 'Google Apps Script', 'Google Sheets', 'BigQuery', 'Looker Studio', 'SQL'],
      current: true
    },
    {
      id: 1,
      job: 'crm',
      title: t('experience.jobs.crm.title'),
      company: 'AlliedGlobal',
      logo: '/assets/companies/allied-global.webp',
      period: t('experience.jobs.crm.period'),
      location: 'El Salvador',
      type: 'Remote',
      description: t('experience.jobs.crm.description'),
      responsibilities: [
        t('experience.jobs.crm.responsibilities.0'),
        t('experience.jobs.crm.responsibilities.1'),
        t('experience.jobs.crm.responsibilities.2'),
        t('experience.jobs.crm.responsibilities.3'),
        t('experience.jobs.crm.responsibilities.4')
      ],
      technologies: ['MSQL', 'ClientSpace', 'API Integration', 'Business Intelligence', 'CRM'],
      current: false
    },
    {
      id: 2,
      job: 'webdev',
      title: t('experience.jobs.webdev.title'),
      company: 'Pointerpro',
      logo: '/assets/companies/pointerpro.webp',
      period: t('experience.jobs.webdev.period'),
      location: 'Belgium',
      type: 'Remote',
      description: t('experience.jobs.webdev.description'),
      responsibilities: [
        t('experience.jobs.webdev.responsibilities.0'),
        t('experience.jobs.webdev.responsibilities.1'),
        t('experience.jobs.webdev.responsibilities.2'),
        t('experience.jobs.webdev.responsibilities.3'),
        t('experience.jobs.webdev.responsibilities.4')
      ],
      technologies: ['React', 'Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Cypress', 'Postman'],
      current: false
    },
    {
      id: 3,
      job: 'qa',
      title: t('experience.jobs.qa.title'),
      company: 'Telus International (Verint)',
      logo: '/assets/companies/telus.webp',
      period: t('experience.jobs.qa.period'),
      location: 'El Salvador',
      type: 'On-site',
      description: t('experience.jobs.qa.description'),
      responsibilities: [
        t('experience.jobs.qa.responsibilities.0'),
        t('experience.jobs.qa.responsibilities.1'),
        t('experience.jobs.qa.responsibilities.2'),
        t('experience.jobs.qa.responsibilities.3'),
        t('experience.jobs.qa.responsibilities.4')
      ],
      technologies: ['Verint', 'SSRS', 'SQL', 'Quality Assurance', 'Test Automation', 'Data Analysis'],
      current: false
    },
    {
      id: 4,
      job: 'scheduler',
      title: t('experience.jobs.scheduler.title'),
      company: 'Telus International',
      logo: '/assets/companies/telus.webp',
      period: t('experience.jobs.scheduler.period'),
      location: 'El Salvador',
      type: 'On-site',
      description: t('experience.jobs.scheduler.description'),
      responsibilities: [
        t('experience.jobs.scheduler.responsibilities.0'),
        t('experience.jobs.scheduler.responsibilities.1'),
        t('experience.jobs.scheduler.responsibilities.2'),
        t('experience.jobs.scheduler.responsibilities.3')
      ],
      technologies: ['Excel', 'Data Analysis', 'Forecasting', 'Service Level Management', 'Strategic Planning'],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header estilo Stitch: eyebrow + título a la izquierda, meta a la derecha */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
          <div>
            <span className="label-badge text-cyan-400">{t('experience.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mt-1">{t('experience.title')}</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md md:text-right">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Lista plana de tarjetas (sin timeline) */}
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const Icon = iconMap[exp.job];
            const accent = accentClasses[accentCycle[index % accentCycle.length]];
            return (
              <div
                key={exp.id}
                className="bento-card hover:border-indigo-500/40 p-5 md:p-6"
              >
                {/* Header: icono + título/empresa a la izquierda, fecha/tipo a la derecha */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {exp.logo ? (
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-700 p-2 flex items-center justify-center flex-shrink-0">
                        <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={accent.text} size={20} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-50">{exp.title}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 text-[11px] rounded-full border border-emerald-800/60 label-badge">
                            {t('experience.current')}
                          </span>
                        )}
                      </div>
                      <span className={`${accent.text} font-medium text-sm`}>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <span className="px-2.5 py-1 rounded-full bg-slate-800/60 label-badge text-slate-300 flex items-center gap-1.5">
                      <FiClock size={11} />
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800/60 label-badge text-slate-300 flex items-center gap-1.5">
                      <FiMapPin size={11} />
                      {exp.location}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full label-badge border ${
                      exp.type === 'Remote'
                        ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/60'
                        : 'bg-violet-950/40 text-violet-400 border-violet-800/60'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">{exp.description}</p>

                {/* Responsabilidades */}
                <div className="mb-4">
                  <span className="label-badge text-slate-500 block mb-2">{t('experience.keyResponsibilities')}</span>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className={`mt-1.5 w-1 h-1 rounded-full ${accent.dot} flex-shrink-0`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-800/60 text-slate-300 label-badge rounded border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Section */}
        <div className="mt-12 pt-10 border-t border-slate-800/80">
          <div className="mb-6">
            <span className="label-badge text-violet-400">{t('experience.education.title')}</span>
          </div>
          <div className="bento-card hover:border-violet-500/40 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <div>
                <h4 className="text-xl font-bold text-slate-50 mb-1">{t('experience.education.degree')}</h4>
                <p className="text-violet-400 font-medium">{t('experience.education.institution')}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/60 label-badge text-slate-300 flex items-center gap-1.5 w-fit">
                <FiClock size={11} />
                {t('experience.education.period')}
              </span>
            </div>
            <p className="text-slate-300 mb-4 text-sm">{t('experience.education.description')}</p>

            {/* Certifications */}
            <div>
              <span className="label-badge text-slate-500 block mb-3">{t('experience.education.certifications')}</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Yellow Belt Six Sigma',
                  'Excel for Business',
                  'BI Data Designer - SISENSE',
                  'SCRUM - Fundamentals',
                  'ISTQB - Foundations',
                  'Cypress Testing'
                ].map((cert, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-800/60 text-slate-300 label-badge rounded border border-slate-700">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
