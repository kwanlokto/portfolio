import { FaBitbucket, FaGit, FaGithub, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
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

export const tech_stack: TechStackType[] = [
  {
    name: "Python",
    icon: <FaPython className="dark:text-white" size={22} />,
  },
  { name: "Java", icon: <FaJava className="dark:text-white" size={22} /> },

  {
    name: "Javascript",
    icon: <SiJavascript className="dark:text-white" size={22} />,
  },

  {
    name: "Typescript",
    icon: <SiTypescript className="dark:text-white" size={22} />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="dark:text-white" size={22} />,
  },
  { name: "React", icon: <FaReact className="dark:text-white" size={22} /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="dark:text-white" size={22} />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="dark:text-white" size={22} />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="dark:text-white" size={22} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="dark:text-white" size={22} />,
  },
  {
    name: "Git",
    icon: <FaGit className="dark:text-white" size={22} />,
  },
  {
    name: "Github",
    icon: <FaGithub className="dark:text-white" size={22} />,
  },
  {
    name: "Bitbucket",
    icon: <FaBitbucket className="dark:text-white" size={22} />,
  },
  {
    name: "Photoshop",
    icon: <SiAdobephotoshop className="dark:text-white" size={22} />,
  },
  {
    name: "Illustrator",
    icon: <SiAdobeillustrator className="dark:text-white" size={22} />,
  },
];
