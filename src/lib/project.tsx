export interface ProjectType {
  title: string;
  description: React.ReactNode;
  picture_url: string;
  tech_stack: string[];
}

export const projects: ProjectType[] = [
  {
    title: "Porfolio",
    description: (
      <>
        A simple and interactive portfolio project to get comfortable with
        Next.JS and TailwindCSS
      </>
    ),
    picture_url: "/SS Logo.png",
    tech_stack: ["Next.JS"],
  },
  {
    title: "Docker Practice",
    description: (
      <>
        A banking project designed to track all transactions, built to help me
        get familiar with Docker, Alembic, and Axios
      </>
    ),
    picture_url: "/SS Logo.png",
    tech_stack: ["Python", "React", "Docker"],
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
    picture_url: "/SS Logo.png",
    tech_stack: ["Python"],
  },
];
