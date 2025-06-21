import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { useTranslation } from "react-i18next";
import Typewriter from "./Typewriter";
import SectionMenu from "./SectionMenu";

export default function ProfilePulse({ showMenu = true }) {
  const { t } = useTranslation();
  const phrases = t("typewriter", { returnObjects: true });

  // Diferentes tonos de verde para los aros
  const greenRings = [
    "#5ecb5e",   // Verde principal
    "#33d17a",   // Verde claro
    "#21a366",   // Verde más oscuro
    "#00ffb3",   // Verde acento
  ];

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen px-4 py-20">
      {/* Contenedor de la imagen con anillos */}
      <div className="relative flex justify-center items-center mb-8 sm:mb-10">
        {/* Círculos animados: responsivos */}
        {[1, 2, 3, 4].map((i, idx) => {
          // Tamaños responsivos para los anillos
          const baseSize = 180; // Tamaño base más pequeño para móvil
          const increment = 24; // Incremento más pequeño
          const size = baseSize + i * increment;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                border: "2px solid",
                borderColor: greenRings[idx],
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(50% - ${size / 2}px)`,
                top: `calc(50% - ${size / 2}px)`,
              }}
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}

        {/* Foto central - responsiva */}
        <motion.div
          className="rounded-full overflow-hidden border-4 border-white w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-10"
          animate={{
            boxShadow: [
              "0 0 0px #5ecb5e66",
              "0 0 25px #5ecb5eaa",
              "0 0 0px #5ecb5e66",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Texto central */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="uppercase tracking-widest text-green-400 mb-2 text-xs sm:text-sm md:text-base">
          {t("role")}
        </div>
        
        {/* Título con altura fija responsiva */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold h-12 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center">
            <Typewriter phrases={phrases} />
          </h1>
        </div>

        {/* Menú con fade-out */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="menu"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 sm:mt-6"
            >
              <SectionMenu className="text-sm sm:text-base md:text-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}