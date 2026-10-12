// src/components/Projects.jsx - Con modal de contacto integrado
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiWordpress, SiMongodb, SiD3Dotjs } from "react-icons/si";
import { FiEye, FiGithub } from "react-icons/fi";
import ContactModal from "./ContactModal";

const TECH_ICONS = {
  React: <FaReact className="text-vscodeblue" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  JavaScript: <SiJavascript className="text-vscodeyellow" />,
  Node: <FaNodeJs className="text-vscodegreen" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  D3: <SiD3Dotjs className="text-vscodemagenta" />,
  "D3.js": <SiD3Dotjs className="text-vscodemagenta" />,
  WordPress: <SiWordpress className="text-vscodemagenta" />,
};

const FILTERS = [
  { label: "All", value: "All" },
  { label: "React", value: "React" },
  { label: "WordPress", value: "WordPress" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Node", value: "Node" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "D3.js", value: "D3.js" },
];

const PROJECTS_PER_PAGE = 8;

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Filtrar proyectos
  const filtered = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.tech.includes(filter));

  // Paginación
  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const paginated = filtered.slice(
    page * PROJECTS_PER_PAGE,
    (page + 1) * PROJECTS_PER_PAGE
  );

  // Al cambiar filtro, regresa a la primera página
  function handleFilterChange(val) {
    setFilter(val);
    setPage(0);
  }

  // Funciones para el modal
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

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

  const itemVariants = {
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
    <>
      <section
        id="projects"
        className="py-16"
      >
        <div className="w-full max-w-7xl mx-auto px-6">

          {/* Header estilo Stitch: eyebrow + título a la izquierda, meta a la derecha */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="label-badge text-indigo-400">{t('projects.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mt-1">
                {t('projects.title')}
              </h2>
            </div>
          </motion.div>

          {/* Filtros con estilo coherente */}
          <div className="flex flex-wrap gap-3 mb-10">
            {FILTERS.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => handleFilterChange(f.value)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  border backdrop-blur-sm
                  ${filter === f.value
                    ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>

          {/* Grid de Proyectos - mosaico bento: el primero de cada página es el "featured" */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            key={`${filter}-${page}`} // Re-animar cuando cambie filtro o página
          >
            {paginated.map((project, i) => {
              const isHero = i === 0;
              const tag = project.tech.slice(0, 2).join(" • ").toUpperCase();
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`group relative ${isHero ? "sm:col-span-2 lg:col-span-8" : "lg:col-span-4"}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card del Proyecto */}
                  <div className="bento-card rounded-2xl hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden h-full flex flex-col">

                    {/* Imagen del Proyecto */}
                    <div className={`relative overflow-hidden ${isHero ? "h-56 sm:h-64 lg:h-72" : "h-40 lg:h-44"}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {tag && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md label-badge text-cyan-400">
                          {tag}
                        </span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Título + botones de acción (icon-only, como Stitch) */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className={`font-bold text-slate-50 ${isHero ? "text-xl" : "text-base"}`}>
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={project.type === "live" ? "Live Site" : "Demo"}
                              className="p-1.5 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 transition-colors"
                            >
                              <FiEye size={14} />
                            </a>
                          )}
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Repository"
                              className="p-1.5 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 transition-colors"
                            >
                              <FiGithub size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className={`text-slate-400 leading-relaxed flex-1 ${isHero ? "text-sm line-clamp-3 mb-4" : "text-xs line-clamp-2 mb-3"}`}>
                        {project.description}
                      </p>

                      {/* Tecnologías con iconos */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="flex items-center gap-1 px-2 py-1 bg-slate-800/60 text-slate-300 rounded text-[10px] font-medium border border-slate-700"
                          >
                            {TECH_ICONS[tech]}
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mensaje cuando no hay proyectos */}
          {filtered.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-50 mb-2">
                {t('projects.no_results')}
              </h3>
              <p className="text-slate-500">
                {t('projects.no_results_hint')}
              </p>
            </motion.div>
          )}

          {/* Paginación mejorada */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Botón anterior */}
              <motion.button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className={`
                  p-2 rounded-xl transition-all duration-200
                  ${page === 0
                    ? 'text-slate-700 cursor-not-allowed'
                    : 'text-indigo-400 hover:bg-indigo-500/10 border border-indigo-500/30'
                  }
                `}
                whileHover={page > 0 ? { scale: 1.1 } : {}}
                whileTap={page > 0 ? { scale: 0.9 } : {}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Dots de páginas */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`
                      w-3 h-3 rounded-full border-2 transition-all duration-200
                      ${page === i
                        ? "bg-indigo-500 border-indigo-500 scale-125"
                        : "bg-transparent border-indigo-500/50 hover:bg-indigo-500/30"
                      }
                    `}
                    whileHover={{ scale: page === i ? 1.25 : 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Botón siguiente */}
              <motion.button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page === totalPages - 1}
                className={`
                  p-2 rounded-xl transition-all duration-200
                  ${page === totalPages - 1
                    ? 'text-slate-700 cursor-not-allowed'
                    : 'text-indigo-400 hover:bg-indigo-500/10 border border-indigo-500/30'
                  }
                `}
                whileHover={page < totalPages - 1 ? { scale: 1.1 } : {}}
                whileTap={page < totalPages - 1 ? { scale: 0.9 } : {}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* Call to Action - CON FUNCIÓN PARA ABRIR MODAL */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-slate-400 mb-6">
              {t('projects.cta_description')}
            </p>
            <motion.button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-600 transition-colors duration-200 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('projects.cta_button')}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* Modal de contacto integrado */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />
    </>
  );
}