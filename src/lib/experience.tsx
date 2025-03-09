export interface ExperienceType {
  company: string;
  icon_url: string;
  role: string;
  timeline: string;
  achievements: React.ReactElement[];
}

export const work_experience: ExperienceType[] = [
  {
    company: "Skatescribe",
    icon_url: "/SS Logo.png",
    role: "Senior Software Developer & Team Lead",
    timeline: "Oct 2023 - Present",
    achievements: [
      <>
        Led a team of 2 developers and 1 UI/UX designer to build critical
        features for our electron and web application
      </>,
      <>
        Spearheaded the planning and development of a 6-month project leading to
        a 25% reduction in cycle time, enhanced user experience, a cleaner and
        more maintainable codebase, and improved data accuracy and reliability
      </>,
      <>
        Configured and managed containerized environments using Docker for
        consistent and scalable deployments
      </>,
    ],
  },
  {
    company: "Skatescribe",
    icon_url: "/SS Logo.png",
    role: "Full Stack Software Developer",
    timeline: "May 2021 – Oct 2023",
    achievements: [
      <>
        Developed an Electron app that captures any skate blade’s shape with
        0.5μm accuracy using a laser profiler, enabling users to customize their
        blade’s geometry with a 0.1μm tolerance on a Tormach CNC machine
      </>,
      <>
        Applied Savitzky-Golay filtering and spline regression to enhance 2D
        blade images from the laser profiler, dynamically minimizing errors in
        approximating the noisy image with G1 continuous B-splines
      </>,
      <>
        Implemented algorithms to convert B-splines into segments that can be
        processed by the CNC machine for cutting
      </>,
    ],
  },
  {
    company: "Cognitive Centivizer",
    icon_url: "/Cognitive Centivizer.png",
    role: "Full Stack Software Developer",
    timeline: "Sept 2020 – May 2021",
    achievements: [
      <>
        Created key components and CRUD endpoints in React and NodeJS to collect
        and organize participant data to be used by psychology students
      </>,
    ],
  },
  {
    company: "Autocase",
    icon_url: "/Autocase.jpeg",
    role: "Full Stack Software Developer",
    timeline: " May 2019 – April 2020",
    achievements: [
      <>
        Developed an AngularJS and Python-based application that translates
        mathematical research models into a comprehensive cost-benefit analysis
        tool for buildings
      </>,
      <>
        Built a custom tool in Python to aggregate and translate 150+ GB of
        NC/CSV files into a pandas dataframe
      </>,
    ],
  },
  {
    company: "Town of Richmond Hill",
    icon_url: "/Town of Richmond Hill.png",
    role: "Swim Instructor",
    timeline: "Sept 2015 – May 2016",
    achievements: [],
  },
];

export const education: ExperienceType[] = [
  {
    company: "University of Toronto",
    icon_url: "/University of Toronto.png",
    role: "BSc. in Computer Science",
    timeline: "Sept 2016 - April 2021",
    achievements: [
      <>Computer Science Specialist</>,
      <>Graduated with high distinction</>,
    ],
  },
];
