import { BoldText } from "@/ui/bold_text";

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
        name: "Chief Technology Officer",
        timeline: "June 2025 – Present",
        achievements: [
          <>
            Led R&D strategy for improving our precision skate profiler and
            sharpener trusted by <BoldText>6+ NHL teams</BoldText>, AHL
            affiliates, and 10+ pro shops across North America.
          </>,
          // <>
          //   Developed and executed SEO optimization strategy that increased
          //   organic website traffic by 40% (from 2K to 2.8K monthly visitors)
          //   within 3 months.
          // </>,
          <>
            Reviewed major contracts critical for{" "}
            <BoldText>11x expansion (17 to 200+ machines)</BoldText>,
            identifying and negotiating resolution of unfair terms and workload
            imbalances
          </>,
        ],
      },
      {
        name: "Lead Software Engineer",
        timeline: "Oct 2023 – June 2025",
        achievements: [
          <>
            Architected <BoldText>microservices refactor</BoldText> to decouple
            order management into independent services, decreasing cycle time by
            25%, and improving data accuracy by 70%.
          </>,
          <>
            Provided technical support for critical hardware and software issues
            and developed a comprehensive troubleshooting workflow to reduce
            support calls by 10%
          </>,
        ],
      },
      {
        name: "Full Stack Software Developer",
        timeline: "May 2021 – Oct 2023",
        achievements: [
          <>
            Prototyped a skate profiling and sharpening system using an LJ V7080
            laser profiler with Tormach 1100MX CNC mill through custom{" "}
            <BoldText>Python (Flask, SQLAlchemy, Pandas, NumPy)</BoldText>{" "}
            backend, <BoldText>React + Electron UI</BoldText>, and{" "}
            <BoldText>PostgreSQL database</BoldText>.
          </>,
          <>
            Invented proprietary algorithms achieving{" "}
            <BoldText>±1 μm precision</BoldText> through signal processing and
            regression, and designed scalable cloud infrastructure on{" "}
            <BoldText>Linode</BoldText> using <BoldText>Docker</BoldText> and{" "}
            <BoldText>NGINX</BoldText> for high availability.
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
        name: "Full Stack Software Developer (Part-Time)",
        timeline: "Sept 2020 – May 2021",
        achievements: [
          <>
            Built reaction time and memory assessment games in{" "}
            <BoldText>React</BoldText> and <BoldText>Node.js</BoldText> that
            collected cognitive performance data on 100+ participants, enabling
            psychology students to conduct behavioral research through engaging
            gameplay instead of traditional testing.
          </>,
          <>
            Refactored redundant code across the codebase and established PR
            review standards and development workflow, improving code
            consistency and reducing technical debt for a team of 10.
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
        name: "Full Stack Software Developer (Internship)",
        timeline: "May 2019 – April 2020",
        achievements: [
          <>
            Developed a full-stack cost-benefit analysis platform (
            <BoldText>AngularJS</BoldText> & <BoldText>Python</BoldText>) that
            transformed complex economic research models into interactive
            visualizations, enabling real-time assessment of environmental,
            economic, and social impacts.
          </>,
          <>
            Automated aggregation of 150+ GB of NetCDF government data using{" "}
            <BoldText>Pandas</BoldText>, reducing processing time from 5 days to
            8 hours and enabling faster benchmarking of model performance.
          </>,
          <>
            Designed and implemented comprehensive unit and integration tests
            using <BoldText>PyTest</BoldText> and <BoldText>Jest</BoldText>,
            increasing test coverage from 50% to 95%+ and reducing
            post-deployment issues by 30%.
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
            Understood different metrics to determine the next steps forward in
            improving the marketing funnel.
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
