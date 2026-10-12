// src/components/Skills.jsx
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

// Los 3 acentos del sistema de diseño (índigo / cian / violeta) ciclando por capa
const accentStyles = {
  indigo: {
    hoverBorder: "hover:border-indigo-500/50",
    text: "text-indigo-400",
    chipHover: "hover:border-indigo-500/50 hover:bg-indigo-500/10",
  },
  cyan: {
    hoverBorder: "hover:border-cyan-500/50",
    text: "text-cyan-400",
    chipHover: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
  },
  violet: {
    hoverBorder: "hover:border-violet-500/50",
    text: "text-violet-400",
    chipHover: "hover:border-violet-500/50 hover:bg-violet-500/10",
  },
};

// Una sola lista uniforme de "capas" (Layer 01-06), igual que el arsenal técnico de Stitch
const categories = [
  {
    title: "Languages",
    icon: "{ }",
    accent: "indigo",
    skills: [
      { name: "JavaScript", icon: javascriptIcon },
      { name: "TypeScript", icon: typescriptIcon },
      { name: "Python", icon: pythonIcon },
      { name: "C#", icon: csharpIcon },
      { name: "PHP", icon: phpIcon },
    ],
  },
  {
    title: "Frontend",
    icon: "</>",
    accent: "cyan",
    skills: [
      { name: "React", icon: reactIcon },
      { name: "Next.js", icon: nextjsIcon },
      { name: "Vue.js", icon: vueIcon },
      { name: "Astro", icon: astroIcon },
      { name: "HTML5", icon: html5Icon },
      { name: "CSS3", icon: css3Icon },
      { name: "Tailwind", icon: tailwindIcon },
      { name: "Bootstrap", icon: bootstrapIcon },
    ],
  },
  {
    title: "Backend & Cloud",
    icon: "⚙",
    accent: "violet",
    skills: [
      { name: "Node.js", icon: nodejsIcon },
      { name: "Docker", icon: dockerIcon },
      { name: "AWS", icon: awsIcon },
    ],
  },
  {
    title: "Database",
    icon: "◫",
    accent: "indigo",
    skills: [
      { name: "MongoDB", icon: mongodbIcon },
      { name: "MySQL", icon: mysqlIcon },
      { name: "SQLite", icon: sqliteIcon },
    ],
  },
  {
    title: "DevOps",
    icon: "⎔",
    accent: "cyan",
    skills: [
      { name: "Git", icon: gitIcon },
      { name: "Github", icon: githubIcon },
      { name: "Gitlab", icon: gitlabIcon },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "▣",
    accent: "violet",
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
    ],
  },
];

function SkillLayerCard({ category, layer, variants }) {
  const a = accentStyles[category.accent];
  return (
    <motion.div
      variants={variants}
      className={`bento-card ${a.hoverBorder} p-5 flex flex-col`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`label-badge ${a.text} font-bold`}>Layer {layer}</span>
          <span className={`${a.text} text-lg font-mono font-bold`}>{category.icon}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-50 mb-4">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={`flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/60 border border-slate-700 rounded text-xs text-slate-300 transition-colors duration-200 ${a.chipHover}`}
          >
            <img src={skill.icon} alt="" className="w-3.5 h-3.5 object-contain" />
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="skills" className="py-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header estilo Stitch: eyebrow + título a la izquierda */}
        <div className="mb-8">
          <span className="label-badge text-violet-400">{t('skills.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mt-1">
            My Technical Stack
          </h2>
        </div>

        {/* Grid uniforme de capas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, idx) => (
            <SkillLayerCard
              key={category.title}
              category={category}
              layer={String(idx + 1).padStart(2, "0")}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
