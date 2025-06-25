// src/data/projects.js
export default [
  {
    id: 1,
    title: "Booking System",
    description: "A modern, responsive booking system for Studio management built with React + Vite frontend and Express.js backend, integrated with Google Calendar API. Features real-time availability, automated scheduling, and calendar synchronization.",
    image: "/src/assets/projects/booking-system.webp",
    tech: ["React", "Node", "MongoDB", "JavaScript"],
    demo: "https://booking-frontend-system.vercel.app",
    repo: "https://github.com/AlxAleman/booking-system"
  },
  {
    id: 2,
    title: "Netflix Clone",
    description: "A Netflix-inspired movie streaming interface featuring TMDB API integration, movie listings with ratings, detailed descriptions, and trailer modals. Built with React and Astro for optimal performance.",
    image: "/src/assets/projects/netflix-clone.webp",
    tech: ["React", "JavaScript"],
    demo: null,
    repo: "https://github.com/AlxAleman/netflix-clone"
  },
  {
    id: 3,
    title: "Event Website",
    description: "A modern and responsive website template for promoting any type of events - meetings, concerts, conferences, and more. Features responsive design, smooth animations, and optimized performance.",
    image: "/src/assets/projects/event-website.webp",
    tech: ["React", "JavaScript"],
    demo: null,
    repo: null
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "My personal portfolio website showcasing projects, skills, and experience. Built with modern React, featuring dark/light mode, smooth animations, internationalization, and responsive design.",
    image: "/src/assets/projects/portfolio.webp",
    tech: ["React", "JavaScript"],
    demo: window.location?.origin || "#",
    repo: "https://github.com/AlxAleman/portfolio"
  },
  {
    id: 5,
    title: "Task Manager App",
    description: "A productivity app to manage daily tasks, deadlines, and priorities with an intuitive interface.",
    image: "/src/assets/projects/taskmanager.webp",
    tech: ["React", "Node"],
    demo: "#",
    repo: "#"
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    description: "An interactive dashboard for real-time data analytics and business intelligence with D3.js visualizations.",
    image: "/src/assets/projects/dashboard.webp",
    tech: ["React", "JavaScript", "D3.js"],
    demo: "#",
    repo: "#"
  }
];