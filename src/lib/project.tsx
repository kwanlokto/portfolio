export interface ProjectType {
  title: string;
  description: React.ReactNode;
  picture_url: string | null;
  TECH_STACK: string[];
  deployed_url?: string;
  download_url?: string;
  source_url: string;
  featured?: boolean;
}

export const PROJECTS: ProjectType[] = [
  {
    title: "Focus Guard",
    description: (
      <>
        A Chrome extension that protects your attention by blocking distracting
        sites and taming YouTube&apos;s doom-scroll machinery with toggles to
        hide Shorts, the home feed, recommendations, and more.
      </>
    ),
    picture_url: "/portfolio/focus_guard.jpg",
    TECH_STACK: ["JavaScript", "Chrome Extension", "HTML", "CSS"],
    deployed_url:
      "https://chromewebstore.google.com/detail/focus-guard-%E2%80%94-productivit/oammbghjoieihnjfmedbnafbjfigjdlb",
    source_url: "https://github.com/kwanlokto/productivity-chrome-extension",
    featured: true,
  },
  {
    title: "PDF Chatbot",
    description: (
      <>
        An AI document assistant running entirely offline, supporting PDF
        upload, semantic search, and multi-turn chat via a bundled LLM.
        Distributed as a one-click installer for Windows and Linux.
      </>
    ),
    picture_url: "/portfolio/pdf_chatbot.png",
    TECH_STACK: [
      "Electron",
      "Next.JS",
      "FastAPI",
      "Ollama",
      "ChromaDB",
      "PyInstaller",
    ],
    download_url:
      "https://github.com/kwanlokto/chatbot/releases/download/v0.1.0/PDF.Chatbot-Setup-0.1.0.exe",
    source_url: "https://github.com/kwanlokto/chatbot",
    featured: true,
  },
  {
    title: "Music Player",
    description: (
      <>
        This mobile app (currently a work in progress) was born out of my
        frustration with existing music players that are cluttered with ads,
        unnecessary features, and bloat. The goal is to build a simple,
        intuitive, and ad-free music player that focuses purely on a smooth
        listening experience.
      </>
    ),
    picture_url: "/portfolio/music_player.jpg",
    TECH_STACK: ["React Native", "Expo"],
    download_url: "/portfolio/Music Player.apk",
    source_url: "https://github.com/kwanlokto/music-player",
  },
  {
    title: "Visual Pathfinding",
    description: (
      <>
        This interactive web application visually demonstrates how various
        pathfinding algorithms operate on a grid. Users can place start and goal
        nodes, add obstacles, and observe how each algorithm explores the search
        space in real-time.
      </>
    ),
    picture_url: "/portfolio/graphing_library.png",
    TECH_STACK: ["Next.JS", "MUI"],
    deployed_url: "https://graphing-library.vercel.app/",
    source_url: "https://github.com/kwanlokto/graphing_library",
  },
  {
    title: "Wordle",
    description: (
      <>
        A Wordle-inspired game built as a passion project, born out of my
        obsession with the NYT Wordle and the frustration of being limited to
        just one puzzle a day.
      </>
    ),
    picture_url: "/portfolio/wordle.png",
    TECH_STACK: ["Next.JS", "Tailwind CSS"],
    deployed_url: "https://wordle-three-gules.vercel.app/",
    source_url: "https://github.com/kwanlokto/wordle",
  },
  {
    title: "Portfolio",
    description: (
      <>
        An interactive portfolio built with Next.js and TailwindCSS to showcase
        my projects and skills. It features responsive design and modern
        frontend best practices.
      </>
    ),
    picture_url: null,
    TECH_STACK: ["Next.JS", "MUI", "Tailwind CSS"],
    source_url: "https://github.com/kwanlokto/portfolio",
  },
  {
    title: "ATM",
    description: (
      <>
        A banking project designed to manage and track all transactions, created
        to explore Docker containerization, Alembic database migrations, and
        Axios for API requests.
      </>
    ),
    picture_url: "/portfolio/atm.png",
    TECH_STACK: ["Python", "React", "Docker", "Alembic", "Flask"],
    source_url: "https://github.com/kwanlokto/atm",
  },
];
