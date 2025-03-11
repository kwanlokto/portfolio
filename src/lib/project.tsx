export interface Project {
  title: string;
  description: React.ReactNode;
  picture: React.ReactNode;
  tech_stack: React.ReactNode[];
}

export const projects: Project[] = [
  {
    title: "Porfolio",
    description: (
      <>
        A simple and interactive portfolio project to get comfortable with
        Next.JS and TailwindCSS
      </>
    ),
    picture: <></>,
    tech_stack: [<></>],
  },
  {
    title: "Docker Practice",
    description: (
      <>
        A banking project designed to track all transactions, built to help me
        get familiar with Docker, Alembic, and Axios
      </>
    ),
    picture: <></>,
    tech_stack: [<></>],
  },
  {
    title: "Algorithm Library",
    description: (
      <>
        Repository which is an collection of popular algorithms and data
        structures that may be useful for future projects. The goal is to create
        a GUI that visually demonstrates how the algorithm or data
        structure solves the desired problem
      </>
    ),
    picture: <></>,
    tech_stack: [<>Python</>],
  },
];
