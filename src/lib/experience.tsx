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
            Lead company-wide technology vision, engineering operations, and R&D
            strategy to drive Skatescribe&apos;s growth and innovation in hockey technology.
          </>,
          <>
            Defined long-term product architecture and technical direction to
            ensure scalability, reliability, and data integrity across all
            deployed systems.
          </>,
          <>
            Directed growth marketing initiatives that increased website
            traffic by 10% and social engagement by 15% within three months.
          </>,
        ],
      },
      {
        name: "Lead Software Engineer",
        timeline: "Oct 2023 – June 2025",
        achievements: [
          <>
            Led the design and production of Skatescribe&apos;s automated skate
            profiling and sharpening system — now used by professional teams
            worldwide.
          </>,
          <>
            Reduced end-to-end machine processing time from 15 seconds to 2
            seconds using concurrency, profiling, and optimized algorithms.
          </>,
        ],
      },
      {
        name: "Full Stack Software Developer",
        timeline: "May 2021 – Oct 2023",
        achievements: [
          <>
            Developed Skatescribe&apos;s first integrated laser profiling + CNC
            sharpening prototype with ±0.1μm precision — a key milestone toward
            commercial viability.
          </>,
          <>
            Implemented advanced signal-processing algorithms that enhanced
            measurement accuracy and reduced cost per sharpen by 20%.
          </>,
          <>
            Built full-stack systems, including embedded control firmware,
            backend APIs (Node.js, Python, C++), and modern React/MUI frontends
            for real-time machine interaction.
          </>,
          <>
            Contributed to early-stage product R&D by bridging mechanical,
            optical, and software components into a cohesive production-ready
            platform.
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
