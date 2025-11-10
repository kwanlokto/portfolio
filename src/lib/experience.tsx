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
            Developed and executed SEO optimization strategy that increased
            organic website traffic by 40% (from 2K to 2.8K monthly visitors)
            within 3 months.
          </>,
          <>
            Reviewed major partnership contracts for 47x expansion (17 to 700+
            machines), identifying unfair contract terms and workload
            imbalances.
          </>,
        ],
      },
      {
        name: "Lead Software Engineer",
        timeline: "Oct 2023 – June 2025",
        achievements: [
          <>
            Architected system-wide refactor from monolith to microservices
            architecture by integrating the ordering system into the main
            interface, increasing operational efficiency by 25% and improving
            data accuracy by 70%
          </>,
          <>
            Provided technical troubleshooting support for clients and internal
            teams to resolve complex issues, and designed a streamlined machine
            setup procedure that reduced deployment time by 62% (from 8 to 3
            hours)
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
            Invented proprietary algorithms achieving ±1 μm precision through
            signal processing and regression, and designed scalable cloud
            infrastructure on Linode using Docker and NGINX for high
            availability
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
            Built reaction time and memory assessment games in React and Node.js
            that collected cognitive performance data on 100+ participants,
            enabling psychology students to conduct behavioral research through
            engaging gameplay instead of traditional testing methods.
          </>,
          <>
            Refactored redundant code across the codebase and established PR
            review standards and development workflow, improving code
            consistency and reducing technical debt for a team of 10 developers.
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
        timeline: " May 2019 – April 2020",
        achievements: [
          <>
            Developed a full-stack cost-benefit analysis platform (AngularJS &
            Python) that transformed complex economic research models into
            interactive visualizations, enabling real-time assessment of
            environmental, economic, and social impacts from design decisions
          </>,
          <>
            Automated aggregation of 150+ GB of NetCDF government data using
            Pandas, reducing processing time from 5 days to 8 hours and enabling
            faster benchmarking of model performance
          </>,
          <>
            Designed and implemented comprehensive unit and integration tests
            using PyTest and Jest increasing test coverage from 50% to 95%+ and
            significantly reducing post-deployment issues by 30%.
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
