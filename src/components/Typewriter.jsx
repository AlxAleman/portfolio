import React, { useState, useEffect } from "react";

export default function Typewriter({ phrases = [], typingSpeed = 80, pause = 1500 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    if (!deleting && subIndex === phrases[index].length) {
      // Espera antes de borrar
      setTimeout(() => setDeleting(true), pause);
    } else if (deleting && subIndex === 0) {
      // Cambia a la siguiente frase
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }, deleting ? typingSpeed / 2 : typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [subIndex, index, deleting, phrases, typingSpeed, pause]);

  useEffect(() => {
    if (phrases.length > 0) setDisplayed(phrases[index].slice(0, subIndex));
  }, [phrases, index, subIndex]);

  return (
    <span className="typewriter border-r-2 border-green-400 pr-1">{displayed}</span>
  );
}
