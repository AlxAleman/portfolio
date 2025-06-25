// src/components/Skills.jsx - Versión Limpia y Funcional
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// IMPORTS DE ICONOS SVG - RUTAS CORREGIDAS
// Lenguajes
import javascriptIcon from "/src/assets/icons/javascript.svg";
import typescriptIcon from "/src/assets/icons/typescript.svg";
import pythonIcon from "/src/assets/icons/python.svg";
import csharpIcon from "/src/assets/icons/csharp.svg";
import phpIcon from "/src/assets/icons/php.svg";

// Frontend
import reactIcon from "/src/assets/icons/react.svg";
import nextjsIcon from "/src/assets/icons/nextjs.svg";
import vueIcon from "/src/assets/icons/vue.svg";
import astroIcon from "/src/assets/icons/astro.svg";
import html5Icon from "/src/assets/icons/html5.svg";
import css3Icon from "/src/assets/icons/css3.svg";
import tailwindIcon from "/src/assets/icons/Tailwind.svg";
import bootstrapIcon from "/src/assets/icons/bootstrap.svg";

// Backend & Infraestructura
import nodejsIcon from "/src/assets/icons/nodejs.svg";
import dockerIcon from "/src/assets/icons/docker.svg";
import awsIcon from "/src/assets/icons/aws.svg";

// Base de datos
import mongodbIcon from "/src/assets/icons/mongodb.svg";
import mysqlIcon from "/src/assets/icons/mysql.svg";
import sqliteIcon from "/src/assets/icons/sqlite.svg";

// Control de versiones
import gitIcon from "/src/assets/icons/git.svg";
import githubIcon from "/src/assets/icons/github.svg";
import gitlabIcon from "/src/assets/icons/gitlab.svg";

// Herramientas
import googleScriptIcon from "/src/assets/icons/googlescript.svg";
import googleSuiteIcon from "/src/assets/icons/googlesuite.svg";
import msofficeIcon from "/src/assets/icons/msoffice.svg";
import jiraIcon from "/src/assets/icons/jira.svg";
import postmanIcon from "/src/assets/icons/postman.svg";
import slackIcon from "/src/assets/icons/slack.svg";
import wordpressIcon from "/src/assets/icons/wordpress.svg";
import windowsIcon from "/src/assets/icons/windows.svg";
import macosIcon from "/src/assets/icons/macos.svg";
import vscodeIcon from "/src/assets/icons/vscode.svg";

const skillCategories = [
  {
    title: "Languages",
    icon: "{ }",
    skills: [
      { name: "JavaScript", icon: javascriptIcon },
      { name: "TypeScript", icon: typescriptIcon },
      { name: "Python", icon: pythonIcon },
      { name: "C#", icon: csharpIcon },
      { name: "PHP", icon: phpIcon },
    ]
  },
  {
    title: "Frontend",
    icon: "</>",
    skills: [
      { name: "React", icon: reactIcon },
      { name: "Next.js", icon: nextjsIcon },
      { name: "Vue.js", icon: vueIcon },
      { name: "Astro", icon: astroIcon },
      { name: "HTML5", icon: html5Icon },
      { name: "CSS3", icon: css3Icon },
      { name: "Tailwind", icon: tailwindIcon },
      { name: "Bootstrap", icon: bootstrapIcon },
    ]
  },
  {
    title: "Backend & Cloud",
    icon: "⚙",
    skills: [
      { name: "Node.js", icon: nodejsIcon },
      { name: "Docker", icon: dockerIcon },
      { name: "AWS", icon: awsIcon },
    ]
  },
  {
    title: "Database",
    icon: "◫",
    skills: [
      { name: "MongoDB", icon: mongodbIcon },
      { name: "MySQL", icon: mysqlIcon },
      { name: "SQLite", icon: sqliteIcon },
    ]
  },
  {
    title: "DevOps",
    icon: "⎔",
    skills: [
      { name: "Git", icon: gitIcon },
      { name: "Github", icon: githubIcon },
      { name: "Gitlab", icon: gitlabIcon },
    ]
  },
  {
    title: "Tools & Platforms",
    icon: "▣",
    skills: [
      { name: "VS Code", icon: vscodeIcon },
      { name: "Postman", icon: postmanIcon },
      { name: "Jira", icon: jiraIcon },
      { name: "Slack", icon: slackIcon },
      { name: "Google Apps Script", icon: googleScriptIcon },
      { name: "Google Suite", icon: googleSuiteIcon },
      { name: "MS Office", icon: msofficeIcon },
      { name: "WordPress", icon: wordpressIcon },
      { name: "Windows", icon: windowsIcon },
      { name: "macOS", icon: macosIcon },
    ]
  },
];

export default function Skills() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center py-16 md:py-8"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Título */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4">
            <span className="text-black/80 dark:text-white/80">My</span>{" "}
            <span className="text-vscodemagenta font-semibold">Technical Stack</span>
          </h2>
          <motion.div 
            className="w-24 h-1 bg-vscodemagenta mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Grid Principal Responsive */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Columna Izquierda */}
          <div className="space-y-6">
            
            {/* Languages */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-lg font-mono font-bold">{"{ }"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Languages</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                  {skillCategories[0].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                          <span className="text-sm font-semibold text-black dark:text-white text-center">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Database */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-xl font-mono font-bold">◫</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Database</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                  {skillCategories[3].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                          <span className="text-sm font-semibold text-black dark:text-white text-center">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* DevOps */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-xl font-mono font-bold">⎔</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">DevOps</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                  {skillCategories[4].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                          <span className="text-sm font-semibold text-black dark:text-white text-center">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            
            {/* Frontend */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-lg font-mono font-bold">{"</>"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Frontend</h3>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 relative z-10">
                  {skillCategories[1].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                          <span className="text-xs font-semibold text-black dark:text-white text-center leading-tight">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Backend & Cloud */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-xl font-mono font-bold">⚙</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Backend & Cloud</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                  {skillCategories[2].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                          <span className="text-sm font-semibold text-black dark:text-white text-center">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tools & Platforms */}
            <motion.div variants={categoryVariants} className="group relative">
              <div className="bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-vscodemagenta/20 flex items-center justify-center border border-vscodemagenta/30">
                    <span className="text-vscodemagenta text-xl font-mono font-bold">▣</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Tools & Platforms</h3>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 relative z-10">
                  {skillCategories[5].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-1">
                          <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                          <span className="text-[10px] font-medium text-black dark:text-white text-center leading-tight">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}