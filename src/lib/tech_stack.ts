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
  SiAkamai,
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

import { IconType } from "react-icons";

export interface TechStackType {
  category: string;
  items: TechStackItemType[];
}

export interface TechStackItemType {
  name: string;
  /** Component reference, not an element — the render site decides the size. */
  icon: IconType;
}

export const TECH_STACK: TechStackType[] = [
  {
    category: "Languages / Databases",
    items: [
      { name: "Python", icon: FaPython },
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "C", icon: SiC },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    category: "Frameworks / Libraries",
    items: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Angular", icon: FaAngular },
      { name: "Node.js", icon: FaNodeJs },
      { name: "MUI", icon: SiMui },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Flask", icon: SiFlask },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "SciPy", icon: SiScipy },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "GitHub", icon: FaGithub },
      { name: "Bitbucket", icon: FaBitbucket },
      { name: "Docker", icon: FaDocker },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Linode", icon: SiAkamai },
    ],
  },
];
