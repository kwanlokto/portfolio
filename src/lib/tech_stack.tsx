import {
  FaBitbucket,
  FaDocker,
  FaGit,
  FaGithub,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export interface TechStackType {
  name: string;
  icon: React.ReactNode;
}

// TODO: update this to have different sections.
// Languages – Python, Java, JavaScript, TypeScript
// Frameworks / Libraries – Node.js, React, Next.js, Tailwind CSS, Pandas, Numpy,
// Databases / Platforms – MongoDB, PostgreSQL
// Version Control / DevOps – Git, GitHub, Bitbucket, Docker
// Design / Creative Tools – Photoshop, Illustrator
export const tech_stack: TechStackType[] = [
  {
    name: "Python",
    icon: <FaPython size={22} />,
  },
  { name: "Java", icon: <FaJava size={22} /> },
  {
    name: "Javascript",
    icon: <SiJavascript size={22} />,
  },
  {
    name: "Typescript",
    icon: <SiTypescript size={22} />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs size={22} />,
  },
  { name: "React", icon: <FaReact size={22} /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={22} />,
  },
  {
    name: "Docker",
    icon: <FaDocker size={22} />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss size={22} />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={22} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={22} />,
  },
  {
    name: "Git",
    icon: <FaGit size={22} />,
  },
  {
    name: "Github",
    icon: <FaGithub size={22} />,
  },
  {
    name: "Bitbucket",
    icon: <FaBitbucket size={22} />,
  },
  {
    name: "Photoshop",
    icon: <SiAdobephotoshop size={22} />,
  },
  {
    name: "Illustrator",
    icon: <SiAdobeillustrator size={22} />,
  },
];
