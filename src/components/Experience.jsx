import React from 'react';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 1,
      title: t('experience.jobs.crm.title'),
      company: 'AlliedGlobal',
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
      current: true
    },
    {
      id: 2,
      title: t('experience.jobs.webdev.title'),
      company: 'Pointerpro',
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
      title: t('experience.jobs.qa.title'),
      company: 'Telus International (Verint)',
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
      title: t('experience.jobs.scheduler.title'),
      company: 'Telus International',
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
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-green-400">{t('experience.title')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-purple-400"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 z-10">
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                        <div className="flex items-center space-x-2 text-cyan-400 font-medium mb-2">
                          <span>{exp.company}</span>
                          {exp.current && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                              {t('experience.current')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Period and location */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{exp.location}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        exp.type === 'Remote' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">{t('experience.keyResponsibilities')}:</h4>
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-medium mb-2">{t('experience.technologies')}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-cyan-400/50 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20 pt-12 border-t border-gray-700/50">
          <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">{t('experience.education.title')}</h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{t('experience.education.degree')}</h4>
                  <p className="text-cyan-400 font-medium">{t('experience.education.institution')}</p>
                </div>
                <div className="text-gray-400 text-sm mt-2 md:mt-0">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{t('experience.education.period')}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{t('experience.education.description')}</p>
              
              {/* Certifications */}
              <div>
                <h5 className="text-white font-medium mb-3">{t('experience.education.certifications')}:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    'Yellow Belt Six Sigma',
                    'Excel for Business',
                    'BI Data Designer - SISENSE',
                    'SCRUM - Fundamentals',
                    'ISTQB - Foundations',
                    'Cypress Testing'
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;