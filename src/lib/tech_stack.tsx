import {
  FaAngular,
  FaBitbucket,
  FaDocker,
  FaGithub,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiC,
  SiFlask,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiScipy,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export interface TechStackType {
  category: string;
  items: TechStackItemType[];
}
export interface TechStackItemType {
  name: string;
  icon: React.ReactNode;
}

export const tech_stack: TechStackType[] = [
  {
    category: "Languages / Databases",
    items: [
      { name: "Python", icon: <FaPython size={22} /> },
      { name: "Java", icon: <FaJava size={22} /> },
      { name: "JavaScript", icon: <SiJavascript size={22} /> },
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
      { name: "C", icon: <SiC size={22} /> },
      { name: "MongoDB", icon: <SiMongodb size={22} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={22} /> },
    ],
  },
  {
    category: "Frameworks / Libraries",
    items: [
      { name: "React", icon: <FaReact size={22} /> },
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "Angular", icon: <FaAngular size={22} /> },
      { name: "Node.js", icon: <FaNodeJs size={22} /> },
      { name: "MUI", icon: <SiMui size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
      { name: "Flask", icon: <SiFlask size={22} /> },
      { name: "Pandas", icon: <SiPandas size={22} /> },
      { name: "NumPy", icon: <SiNumpy size={22} /> },
      { name: "SciPy", icon: <SiScipy size={22} /> },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "GitHub", icon: <FaGithub size={22} /> },
      { name: "Bitbucket", icon: <FaBitbucket size={22} /> },
      { name: "Docker", icon: <FaDocker size={22} /> },
      { name: "GitHub Actions", icon: <SiGithubactions size={22} /> },
    ],
  },
];
