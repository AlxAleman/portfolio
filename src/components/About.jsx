import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-cyan-600 dark:text-cyan-400">{t('about.title')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Descripción principal */}
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {t('about.description2')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {t('about.description3')}
            </p>
          </div>

          {/* Columna derecha - Stats y datos */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">10+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.stats.experience')}</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.stats.projects')}</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">5</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.stats.certifications')}</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">3</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.stats.countries')}</div>
              </div>
            </div>

            {/* Especialidades */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('about.specialties.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('about.specialties.fullstack')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('about.specialties.qa')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('about.specialties.bi')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t('about.specialties.automation')}</span>
                </div>
              </div>
            </div>

            {/* Ubicación y disponibilidad */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-cyan-400 font-medium">{t('about.location.title')}</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{t('about.location.current')}</p>
              <p className="text-gray-400 text-xs">{t('about.location.remote')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;