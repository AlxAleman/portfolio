// src/components/Icon.jsx
import { useEffect, useState } from 'react';

export default function Icon({ name, width = 40, height = 40, className = "" }) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/src/assets/icons/${name}.svg`);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error(`Error loading SVG ${name}:`, error);
      }
    };

    loadSvg();
  }, [name]);

  return (
    <div 
      className={className}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}