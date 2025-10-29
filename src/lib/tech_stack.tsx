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
  SiNumpy,
  SiPandas,
  SiPostgresql,
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
    category: "Languages",
    items: [
      { name: "Python", icon: <FaPython size={22} /> },
      { name: "Java", icon: <FaJava size={22} /> },
      { name: "JavaScript", icon: <SiJavascript size={22} /> },
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
    ],
  },
  {
    category: "Frameworks / Libraries",
    items: [
      { name: "Node.js", icon: <FaNodeJs size={22} /> },
      { name: "React", icon: <FaReact size={22} /> },
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
      { name: "Pandas", icon: <SiPandas size={22} /> },
      { name: "NumPy", icon: <SiNumpy size={22} /> },
    ],
  },
  {
    category: "Databases / Platforms",
    items: [
      { name: "MongoDB", icon: <SiMongodb size={22} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={22} /> },
    ],
  },
  {
    category: "Version Control / DevOps",
    items: [
      { name: "Git", icon: <FaGit size={22} /> },
      { name: "GitHub", icon: <FaGithub size={22} /> },
      { name: "Bitbucket", icon: <FaBitbucket size={22} /> },
      { name: "Docker", icon: <FaDocker size={22} /> },
    ],
  },
  {
    category: "Design / Creative Tools",
    items: [
      { name: "Photoshop", icon: <SiAdobephotoshop size={22} /> },
      { name: "Illustrator", icon: <SiAdobeillustrator size={22} /> },
    ],
  },
];
