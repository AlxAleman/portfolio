// src/components/Skills.jsx
import { useTranslation } from "react-i18next";

// IMPORTS DE ICONOS SVG
// Lenguajes
import javascriptIcon from "../assets/icons/javascript.svg";
import typescriptIcon from "../assets/icons/typescript.svg";
import pythonIcon from "../assets/icons/python.svg";
import csharpIcon from "../assets/icons/csharp.svg";
import phpIcon from "../assets/icons/php.svg";

// Frontend
import reactIcon from "../assets/icons/react.svg";
import nextjsIcon from "../assets/icons/nextjs.svg";
import vueIcon from "../assets/icons/vue.svg";
import astroIcon from "../assets/icons/astro.svg";
import html5Icon from "../assets/icons/html5.svg";
import css3Icon from "../assets/icons/css3.svg";
import tailwindIcon from "../assets/icons/tailwind.svg";
import bootstrapIcon from "../assets/icons/bootstrap.svg";

// Backend & Infraestructura
import nodejsIcon from "../assets/icons/nodejs.svg";
import dockerIcon from "../assets/icons/docker.svg";
import awsIcon from "../assets/icons/aws.svg";

// Base de datos
import mongodbIcon from "../assets/icons/mongodb.svg";
import mysqlIcon from "../assets/icons/mysql.svg";
import sqliteIcon from "../assets/icons/sqlite.svg";

// Control de versiones
import gitIcon from "../assets/icons/git.svg";
import githubIcon from "../assets/icons/github.svg";
import gitlabIcon from "../assets/icons/gitlab.svg";

// Herramientas
import googleScriptIcon from "../assets/icons/googlescript.svg";
import googleSuiteIcon from "../assets/icons/googlesuite.svg";
import msofficeIcon from "../assets/icons/msoffice.svg";
import jiraIcon from "../assets/icons/jira.svg";
import postmanIcon from "../assets/icons/postman.svg";
import slackIcon from "../assets/icons/slack.svg";
import wordpressIcon from "../assets/icons/wordpress.svg";
import windowsIcon from "../assets/icons/windows.svg";
import macosIcon from "../assets/icons/macos.svg";
import vscodeIcon from "../assets/icons/vscode.svg";

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
    icon: "< />",
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

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center py-16 md:py-8"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Título compacto */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-light tracking-wider">
            <span className="text-black/80 dark:text-white/80">My</span>{" "}
            <span className="text-vscodemagenta font-semibold">Technical Stack</span>
          </h2>
          <div className="w-24 h-1 bg-vscodemagenta mx-auto mt-2"></div>
        </div>

        {/* Grid principal 2x3 para desktop, 3x2 para móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`group relative ${
                category.skills.length > 8 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Contenedor de categoría compacto */}
              <div className="bg-black/20 dark:bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-vscodemagenta/30 hover:border-vscodemagenta/60 transition-all duration-300 h-full relative overflow-hidden">
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodemagenta/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Header de categoría */}
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="text-vscodemagenta text-xl font-mono">{category.icon}</span>
                  <h3 className="text-base font-semibold text-black dark:text-white">
                    {category.title}
                  </h3>
                </div>
                
                {/* Grid de skills compacto */}
                <div className={`grid gap-2 relative z-10 ${
                  category.skills.length > 8 
                    ? 'grid-cols-5' 
                    : category.skills.length > 6 
                    ? 'grid-cols-4' 
                    : 'grid-cols-3'
                }`}>
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item relative"
                    >
                      <div className="bg-black/30 dark:bg-white/20 backdrop-blur rounded-lg p-2 border border-transparent hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10 hover:shadow-lg hover:shadow-vscodemagenta/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center gap-1">
                          <img 
                            src={skill.icon} 
                            alt={skill.name} 
                            className="w-6 h-6 md:w-8 md:h-8 object-contain filter hover:brightness-110"
                          />
                          <span className="text-[10px] md:text-xs font-medium text-black dark:text-white text-center leading-tight">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}