// src/components/Projects.jsx - Con modal de contacto integrado
import { useState } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiWordpress, SiMongodb, SiD3Dotjs } from "react-icons/si";
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
        className="min-h-screen flex items-center py-20"
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4">
              <span className="text-black/80 dark:text-white/80">My</span>{" "}
              <span className="text-vscodeyellow font-semibold">Projects</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-vscodeyellow mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            {/* Filtros con estilo coherente */}
            <div className="flex flex-wrap justify-center gap-3">
              {FILTERS.map((f) => (
                <motion.button
                  key={f.value}
                  onClick={() => handleFilterChange(f.value)}
                  className={`
                    px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                    border backdrop-blur-sm
                    ${filter === f.value
                      ? 'bg-vscodemagenta text-white border-vscodemagenta shadow-lg'
                      : 'bg-white/10 dark:bg-black/20 text-black/70 dark:text-white/70 border-white/20 dark:border-black/20 hover:border-vscodemagenta/50 hover:bg-vscodemagenta/10'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {f.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid de Proyectos */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            key={`${filter}-${page}`} // Re-animar cuando cambie filtro o página
          >
            {paginated.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card del Proyecto - Mejorada para light mode */}
                <div className="bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/20 hover:border-vscodeblue/50 hover:shadow-xl hover:shadow-vscodeblue/10 dark:hover:shadow-vscodeblue/20 transition-all duration-500 overflow-hidden h-full flex flex-col">
                  
                  {/* Imagen del Proyecto */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay con efectos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Título con color consistente para ambos modos */}
                    <h3 className="text-base font-bold text-vscodeblue mb-3 group-hover:text-vscodeblue/80 transition-colors duration-300 uppercase tracking-wide">
                      {project.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-xs text-gray-600 dark:text-white/70 mb-4 leading-relaxed line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Tecnologías con iconos */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1 px-2 py-1 bg-vscodeblue/15 text-vscodeblue rounded-full text-[10px] font-medium border border-vscodeblue/25"
                        >
                          {TECH_ICONS[tech]} 
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-2 mt-auto">
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-vscodeblue text-white py-2 px-3 rounded-xl text-xs font-medium text-center hover:bg-vscodeblue/90 transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Demo
                        </motion.a>
                      )}
                      
                      {project.repo && (
                        <motion.a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-100 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-white py-2 px-3 rounded-xl text-xs font-medium text-center border border-gray-200 dark:border-black/20 hover:border-vscodeblue/50 hover:bg-vscodeblue/10 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Repo
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vscodeblue/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
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
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-black/60 dark:text-white/60">
                Try selecting a different filter
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
                    ? 'text-black/30 dark:text-white/30 cursor-not-allowed' 
                    : 'text-vscodeblue hover:bg-vscodeblue/10 border border-vscodeblue/30'
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
                        ? "bg-vscodeblue border-vscodeblue scale-125"
                        : "bg-transparent border-vscodeblue/50 hover:bg-vscodeblue/30"
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
                    ? 'text-black/30 dark:text-white/30 cursor-not-allowed' 
                    : 'text-vscodeblue hover:bg-vscodeblue/10 border border-vscodeblue/30'
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
            <p className="text-black/70 dark:text-white/70 mb-6">
              Want to see more projects or collaborate on something new?
            </p>
            <motion.button 
              onClick={openContactModal}
              className="inline-flex items-center gap-2 bg-vscodeblue text-white px-8 py-4 rounded-xl font-medium hover:bg-vscodeblue/90 transition-colors duration-200 shadow-lg hover:shadow-xl hover:shadow-vscodeblue/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
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