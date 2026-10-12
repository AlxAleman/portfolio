import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiCode,
  FiCheckCircle,
  FiBarChart2,
  FiZap,
  FiMapPin,
  FiMail,
} from 'react-icons/fi';

const pillars = [
  { key: 'fullstack', icon: FiCode, accent: 'indigo' },
  { key: 'qa', icon: FiCheckCircle, accent: 'cyan' },
  { key: 'bi', icon: FiBarChart2, accent: 'violet' },
  { key: 'automation', icon: FiZap, accent: 'indigo' },
];

const accentClasses = {
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', hoverBorder: 'hover:border-indigo-500/40' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', hoverBorder: 'hover:border-cyan-500/40' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', hoverBorder: 'hover:border-violet-500/40' },
};

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="label-badge text-indigo-400">{t('about.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mt-1">
            {t('about.title')}
          </h2>
        </div>

        {/* Bento asimétrico 7/5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Narrativa (7 cols) */}
          <div className="lg:col-span-7 bento-card hover:border-indigo-500/40 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative space-y-4">
              <p className="text-slate-200 text-lg leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {t('about.description2')}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {t('about.description3')}
              </p>
            </div>

            {/* Ubicación y disponibilidad */}
            <div className="relative mt-6 p-4 rounded-lg bg-black/30 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin className="text-cyan-400" size={16} />
                <span className="text-cyan-400 font-medium text-sm">{t('about.location.title')}</span>
              </div>
              <p className="text-slate-300 text-sm mb-1">{t('about.location.current')}</p>
              <p className="text-slate-500 text-xs mb-3">{t('about.location.remote')}</p>
              <a
                href="mailto:alxaleman@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                <FiMail size={13} />
                alxaleman@gmail.com
              </a>
            </div>
          </div>

          {/* Especialidades (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="label-badge text-slate-500 px-1">{t('about.specialties.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {pillars.map(({ key, icon: Icon, accent }) => (
              <div
                key={key}
                className={`bento-card ${accentClasses[accent].hoverBorder} p-4 flex flex-col justify-center gap-3`}
              >
                <div className={`w-10 h-10 rounded-lg ${accentClasses[accent].bg} flex items-center justify-center`}>
                  <Icon className={accentClasses[accent].text} size={20} />
                </div>
                <span className="text-slate-200 font-medium text-sm leading-snug">
                  {t(`about.specialties.${key}`)}
                </span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
