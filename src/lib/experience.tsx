export interface ExperienceType {
  company: string;
  icon_url: string;
  role: string;
  timeline: string;
  achievements: React.ReactElement[];
}

export const work: ExperienceType[] = [
  {
    company: "Skatescribe",
    icon_url: "/portfolio/SS Logo.png",
    role: "CTO",
    timeline: "June 2025 - Present",
    achievements: [],
  },
  {
    company: "Skatescribe",
    icon_url: "/portfolio/SS Logo.png",
    role: "Senior Software Developer & Team Lead",
    timeline: "Oct 2023 - June 2025",
    achievements: [
      <>
        Led a cross-functional team of developers, mechanical engineers, and a
        UI/UX designer to design and implement an automated sharpening and
        profiling machine that has transformed the hockey industry and is now
        widely used by NHL players
      </>,
      <>
        Directed large-scale projects that increased sharpening efficiency by
        25%, enhanced user experience, improved data accuracy and reliability,
        and optimized code maintainability.
      </>,
      <>
        Collaborated with stakeholders and equipment managers to define and
        prioritize features, ensuring alignment with business goals and
        improving project delivery timelines.
      </>,
    ],
  },
  {
    company: "Skatescribe",
    icon_url: "/portfolio/SS Logo.png",
    role: "Full Stack Software Developer",
    timeline: "May 2021 – Oct 2023",
    achievements: [
      <>
        Developed the first functional prototype integrating a high-precision
        laser system with a CNC machine, achieving 0.5μm accuracy in blade
        geometry capture and sharpening precision within a 0.1μm tolerance.
      </>,
      <>
        Researched and implemented advanced signal processing techniques to
        enhance laser profiler images, increasing accuracy by 0.5mm, reducing
        costs by $2 per sharpen, and cutting runtime by 20%.
      </>,
    ],
  },
  {
    company: "Cognitive Centivizer",
    icon_url: "/portfolio/Cognitive Centivizer.png",
    role: "Full Stack Software Developer",
    timeline: "Sept 2020 – May 2021",
    achievements: [
      <>
        Created key components and CRUD endpoints to collect and structure data
        on participants&apos; cognitive functions, enabling psychology students
        to conduct further analysis.
      </>,
      <>
        Established best software practices in a dynamic team environment to
        maintain a consistent, scalable codebase, enabling future developers to
        contribute with ease.
      </>,
    ],
  },
  {
    company: "Autocase",
    icon_url: "/portfolio/Autocase.jpeg",
    role: "Full Stack Software Developer",
    timeline: " May 2019 – April 2020",
    achievements: [
      <>
        Translated economic research models into a comprehensive cost-benefit
        analysis tool for builders and governments to determine impact of design
        decisions on community, tenant and owner stakeholders.
      </>,
      <>
        Built a custom tool in Python to aggregate and convert over 150GB of
        statistical data into a pandas dataframe for benchmarking model
        performance.
      </>,
    ],
  },
  {
    company: "Town of Richmond Hill",
    icon_url: "/portfolio/Town of Richmond Hill.png",
    role: "Swim Instructor",
    timeline: "Sept 2015 – May 2016",
    achievements: [],
  },
];

export const education: ExperienceType[] = [
  {
    company: "University of Toronto",
    icon_url: "/portfolio/University of Toronto.png",
    role: "BSc. in Computer Science",
    timeline: "Sept 2016 - April 2021",
    achievements: [
      <>Computer Science Specialist</>,
      <>Graduated with high distinction</>,
    ],
  },
];
