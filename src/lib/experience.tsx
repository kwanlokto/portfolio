export interface Role {
  name: string;
  timeline: string;
  achievements: React.ReactElement[];
}
export interface ExperienceType {
  company: string;
  icon_url: string;
  roles: Role[];
}

export const work: ExperienceType[] = [
  {
    company: "Skatescribe",
    icon_url: "/portfolio/SS Logo.png",
    roles: [
      {
        name: "CTO",
        timeline: "June 2025 – Present",
        achievements: [
          <>
            Drove technical vision and R&D strategy for precise skate profiler
            and sharpener trusted by 5+ NHL teams, AHL affiliates, and 10+ pro
            shops across North America.
          </>,
          <>
            Led cross-functional team of 5 engineers and designers through rapid
            iteration cycles, shipping features that directly expanded market
            penetration and earned recognition from NHL equipment managers.
          </>,
          <>
            Directed McMaster PhD students to prototype Gen 2 machine with
            compact design fitting through standard doorways, proprietary
            software integration, and 0.1 μm loading repeatability.
          </>,
        ],
      },
      {
        name: "Lead Software Engineer",
        timeline: "Oct 2023 – June 2025",
        achievements: [
          <>
            Designed and led implementation of full-stack architecture
            coordinating firmware, state management, and real-time hardware
            control across CNC and laser subsystems—managing 2 engineers through
            complex integration challenges.
          </>,
          <>
            Architected system-wide refactor from monolith to microservices
            architecture by integrating the ordering system into the main
            interface, increasing operational efficiency by 25% and improving
            data accuracy by 70%
          </>,
          <>
            Improved scanning repeatability by 22% while reducing
            processing time by 75% through redesigning smoothing and joining
            algorithms, greatly increasing throughput.
          </>,
          <>
            Deployed diagnostic tooling that cut support resolution time in half
            by surfacing CNC and laser controller state to support team.
          </>,
        ],
      },
      {
        name: "Full Stack Software Developer",
        timeline: "May 2021 – Oct 2023",
        achievements: [
          <>
            Prototyped a skate profiling and sharpening system using an LJ V7080
            laser profiler with Tormach 1100MX CNC mill through custom Python
            (Flask, SQLAlchemy, Pandas, NumPy) backend, React + Electron UI, and
            PostgreSQL database.
          </>,
          <>
            Invented proprietary algorithms for smoothing and joining noisy scan
            data, achieving ±1 μm precision by applying signal processing and
            least-squares optimizations, creating the technical foundation
            powering every machine built today.
          </>,
          <>
            Designed and managed secure, scalable cloud infrastructure on
            Linode, deploying production and staging environments using Docker
            and NGINX to ensure high availability and performance.
          </>,
        ],
      },
    ],
  },
  {
    company: "Cognitive Centivizer",
    icon_url: "/portfolio/Cognitive Centivizer.png",
    roles: [
      {
        name: "Full Stack Software Developer",
        timeline: "Sept 2020 – May 2021",
        achievements: [
          <>
            Created key components and CRUD endpoints to collect and structure
            data on participants&apos; cognitive functions, enabling psychology
            students to conduct further analysis.
          </>,
          <>
            Established best software practices in a dynamic team environment to
            maintain a consistent, scalable codebase, enabling future developers
            to contribute with ease.
          </>,
        ],
      },
    ],
  },
  {
    company: "Autocase",
    icon_url: "/portfolio/Autocase.jpeg",
    roles: [
      {
        name: "Full Stack Software Developer",
        timeline: " May 2019 – April 2020",
        achievements: [
          <>
            Translated economic research models into a comprehensive
            cost-benefit analysis tool for builders and governments to determine
            impact of design decisions on community, tenant and owner
            stakeholders.
          </>,
          <>
            Built a custom tool in Python to aggregate and convert over 150GB of
            statistical data into a pandas dataframe for benchmarking model
            performance.
          </>,
        ],
      },
    ],
  },
  {
    company: "Town of Richmond Hill",
    icon_url: "/portfolio/Town of Richmond Hill.png",
    roles: [
      {
        name: "Swim Instructor",
        timeline: "Sept 2015 – May 2016",
        achievements: [],
      },
    ],
  },
];

export const education: ExperienceType[] = [
  {
    company: "Toronto Metropolitan University",
    icon_url: "/portfolio/TMU Talent Accelerator.png",
    roles: [
      {
        name: "Digital Growth Marketing Talent Accelerator",
        timeline: "July 2025 – Nov 2025",
        achievements: [
          <>
            Learned and applied different SEO optimizations to real world
            applications
          </>,
          <>
            Understood how to monitor different metrics to determine the next
            steps forward in improving the marketing funnel.
          </>,
          <>
            Implemented A/B testing strategies to evaluate campaign performance
            and drive data-informed decisions.
          </>,
        ],
      },
    ],
  },
  {
    company: "University of Toronto",
    icon_url: "/portfolio/University of Toronto.png",
    roles: [
      {
        name: "BSc. in Computer Science",
        timeline: "Sept 2016 – April 2021",
        achievements: [
          <>Computer Science Specialist</>,
          <>Graduated with high distinction</>,
        ],
      },
    ],
  },
];
