import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { useTranslation } from "react-i18next";
import Typewriter from "./Typewriter";
import ResumeDropdown from "./ResumeDropdown";
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
    <div className="flex flex-col items-center justify-center relative min-h-screen">
      <div className="relative flex justify-center items-center w-72 h-72 mx-auto my-10">
        {/* Círculos animados: todos verdes */}
        {[1, 2, 3, 4].map((i, idx) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              border: "2px solid",
              borderColor: greenRings[idx],
              width: `${240 + i * 32}px`,
              height: `${240 + i * 32}px`,
              left: `calc(50% - ${(240 + i * 32) / 2}px)`,
              top: `calc(50% - ${(240 + i * 32) / 2}px)`,
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
        ))}
        {/* Foto central */}
        <motion.div
          className="rounded-full overflow-hidden border-4 border-white w-48 h-48 z-10"
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
      <div className="text-center">
        <div className="uppercase tracking-widest text-green-400 mb-2 text-sm sm:text-base">
          {t("role")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 h-16">
          <Typewriter phrases={phrases} />
        </h1>
        {/* Menú con fade-out */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="menu"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SectionMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
