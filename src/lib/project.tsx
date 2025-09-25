export interface ProjectType {
  title: string;
  description: React.ReactNode;
  picture_url: string | null;
  tech_stack: string[];
  deployed_url?: string;
  download_url?: string;
  source_url: string;
}

export const projects: ProjectType[] = [
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
    picture_url: null,
    tech_stack: ["React Native", "Expo"],
    source_url: "https://github.com/kwanlokto/MusicPlayerApp",
  },
  {
    title: "Graphing Library",
    description: (
      <>
        This interactive web application visually demonstrates how various
        pathfinding algorithms operate on a grid. Users can place start and goal
        nodes, add obstacles, and observe how each algorithm explores the search
        space in real-time.
      </>
    ),
    picture_url: "/portfolio/graphing_library.png",
    tech_stack: ["Next.JS"],
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
    tech_stack: ["Next.JS"],
    deployed_url: "https://wordle-three-gules.vercel.app/",
    source_url: "https://github.com/kwanlokto/wordle",
  },
  {
    title: "Porfolio",
    description: (
      <>
        An interactive portfolio project created to get comfortable working with
        Next.js and TailwindCSS through real-world application.
      </>
    ),
    picture_url: null,
    tech_stack: ["Next.JS"],
    source_url: "https://github.com/kwanlokto/portfolio",
  },
  {
    title: "Docker Practice",
    description: (
      <>
        A banking project designed to track all transactions, built to help me
        get familiar with Docker, Alembic, and Axios
      </>
    ),
    picture_url: "/portfolio/docker_practice.png",
    tech_stack: ["Python", "React", "Docker"],
    source_url: "https://github.com/kwanlokto/docker_practice",
  },
  {
    title: "Algorithm Library",
    description: (
      <>
        Repository which is an collection of popular algorithms and data
        structures that may be useful for future projects. The goal is to create
        a GUI that visually demonstrates how the algorithm or data structure
        solves the desired problem
      </>
    ),
    picture_url: null,
    tech_stack: ["Python"],
    source_url: "https://github.com/kwanlokto/algorithms",
  },
];
