import { useState } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiWordpress, SiMongodb, SiD3Dotjs } from "react-icons/si";

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

// Si quieres ver más proyectos, pon 8 o 12 por página
const PROJECTS_PER_PAGE = 8;

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);

  // Cambiar página cuando cambias filtro
  const filtered =
    filter === "All"
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

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-2"
      style={{ minHeight: "100vh" }}
    >
      <div className="
        w-full max-w-7xl mx-auto
        rounded-3xl
        bg-white/5 dark:bg-neutral-900/80
        border border-vscodeyellow/50
        backdrop-blur-lg
        shadow-xl
        p-6 md:p-10
        flex flex-col justify-center
      ">
        {/* Header */}
        <h2 className="text-vscodeyellow font-bold text-3xl md:text-4xl mb-8 tracking-widest font-mono uppercase text-center">
          Projects
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`px-5 py-2 rounded-full border-2 font-semibold tracking-wide shadow-sm transition font-mono
                ${
                  filter === f.value
                    ? "bg-vscodegreen border-vscodegreen text-white"
                    : "bg-transparent border-vscodegreen text-vscodegreen hover:bg-vscodegreen/10"
                }
              `}
              onClick={() => handleFilterChange(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid de Projects: compacto y flexible */}
        <motion.div
          layout
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
            min-h-[320px]
          "
          transition={{ layout: { duration: 0.45, type: "spring" } }}
        >
          {paginated.map((p) => (
            <motion.div
              key={p.id}
              layout
              transition={{ layout: { duration: 0.45, type: "spring" } }}
              className="
                rounded-xl border border-vscodeyellow/30 bg-white/10 dark:bg-neutral-900/60
                p-3 flex flex-col gap-2 mb-2 h-full
                hover:bg-white/20 dark:hover:bg-neutral-800/70 transition-all duration-200
                shadow-lg
              "
            >
              {/* Imagen */}
              <div className="w-full rounded-lg overflow-hidden mb-2 bg-black/10 flex items-center justify-center min-h-[80px] h-24">
                <img src={p.image} alt={p.title} className="object-cover w-full h-full opacity-80" />
              </div>
              {/* Título en azul */}
              <h3 className="text-vscodeblue text-base font-bold font-mono tracking-wide mb-0 uppercase">
                {p.title}
              </h3>
              {/* Descripción */}
              <p className="text-xs text-vstextsoft dark:text-gray-300 font-mono line-clamp-3">
                {p.description}
              </p>
              {/* Tech con iconos */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.tech.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 border border-vscodegreen/40 bg-transparent text-vscodegreen text-[10px] font-mono px-2 py-[2px] rounded-full"
                  >
                    {TECH_ICONS[tech]} {tech}
                  </span>
                ))}
              </div>
              {/* Botones */}
              <div className="flex gap-1 mt-2">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-0.5 font-mono text-xs rounded-full border border-vscodeblue text-vscodeblue hover:bg-vscodeblue hover:text-white transition"
                  >
                    Demo
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-0.5 font-mono text-xs rounded-full border border-vscodeblue text-vscodeblue hover:bg-vscodeblue hover:text-white transition"
                  >
                    Repo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Paginación tipo “dots” */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                className={`w-3 h-3 rounded-full border-2 
                  transition-all
                  ${page === i
                    ? "bg-vscodegreen border-vscodegreen scale-125"
                    : "bg-transparent border-vscodegreen hover:bg-vscodegreen/30"
                  }`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
