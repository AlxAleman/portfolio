import { useState, useEffect } from "react";

export default function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    function onScroll() {
      let currentId = null; // Por defecto, ninguno activo
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top - offset;
          if (top <= 0) currentId = id;
        }
      }
      setActiveId(currentId);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return activeId;
}
