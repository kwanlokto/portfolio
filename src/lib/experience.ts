import { asset } from "@/lib/site";

export interface Role {
  title: string;
  dates: string;
  /**
   * Optional one-line clarifier shown under the dates. Used where a date range
   * alone would read as a mistake — e.g. two roles that are both "Present".
   */
  note?: string;
  /** Plain text. `**...**` marks emphasis; rendered by <RichText>. */
  achievements: string[];
}

export interface ExperienceType {
  organization: string;
  icon_url: string;
  dark_mode_icon_url?: string;
  /**
   * Keeps an entry out of the rendered timeline without deleting it. Preferred
   * over commenting the block out: this stays type-checked and is one word away
   * from being visible again.
   */
  hidden?: boolean;
  roles: Role[];
}

export const NUMBER_OF_PRO_SHOPS = 12;
export const NUMBER_OF_NHL_TEAMS = 6;
export const NUMBER_OF_AHL_TEAMS = 3;

/** Year the professional career started; drives the "N years" line on the home page. */
export const CAREER_START_YEAR = 2019;

export const WORK: ExperienceType[] = [
  {
    organization: "Bauer Hockey",
    hidden: true,
    icon_url: asset("/Bauer.png"),
    dark_mode_icon_url: asset("/Bauer Dark.png"),
    roles: [
      {
        title: "Software Engineer",
        dates: "Jan 2026 – Present",
        note: "Ongoing partnership, concurrent with the Skatescribe CTO role",
        achievements: [
          "Evaluated **7 scanning and CNC solutions** and selected one that reduced costs without compromising quality, informing the hardware roadmap for the next-generation skate tuning platform.",
          "Integrated the **Aetrex foot-scanning API** to automate customer data transfer from scanning hardware into **Skatescribe**, delivering recommended skate specs and eliminating manual data entry and operator error.",
          "Stood up the first multi-region **AWS** footprint — servers, load balancers, and databases across regions — replacing a single-region deployment and clearing the path from **19 installed machines** toward a planned **700+ worldwide**.",
        ],
      },
    ],
  },
  {
    organization: "Skatescribe",
    icon_url: asset("/SS Logo.png"),
    roles: [
      {
        title: "Chief Technology Officer",
        dates: "Jun 2025 – Present",
        achievements: [
          `Lead 7 engineers building the skate tuning platform now in daily use by **${NUMBER_OF_NHL_TEAMS}+ NHL teams**, **${NUMBER_OF_AHL_TEAMS}+ AHL affiliates**, and **${NUMBER_OF_PRO_SHOPS}+ pro shops** across North America.`,
          "Grew organic traffic **40%** — from **2K to 2.8K monthly visitors** in 3 months — by building and executing the SEO strategy from scratch.",
          "Grew the team from 3 to 7 (**3 full-time engineers** and **1 co-op**) and shipped **4 production machines** in the first year as CTO.",
        ],
      },
      {
        title: "Lead Software Engineer",
        dates: "Oct 2023 – Jun 2025",
        achievements: [
          "Cut **cycle time by 25%** and improved **data accuracy by 70%** by decomposing a monolith into independent services behind a **custom-built API gateway** — centralizing authentication, isolating service responsibilities, and decoupling deploys so each service could ship on its own cadence.",
          "Ran the **Linode** production fleet serving **19+ deployed locations**, containerizing every service behind **NGINX** to keep the platform available through the rollout.",
          "Cut support call volume **10%** by writing a first-response runbook for the most common hardware and software failures, letting on-site operators resolve issues without escalating to engineering.",
        ],
      },
      {
        title: "Full Stack Software Developer",
        dates: "May 2021 – Oct 2023",
        achievements: [
          "Built the company's first working prototype of the skate tuning platform — a **Python** backend driving a **Keyence LJ-V7080** laser profiler and a **Tormach 1100MX** CNC mill, with a **React + Electron** operator UI and a **PostgreSQL** store.",
          "Invented proprietary signal processing algorithms for smoothing and joining noisy laser data, achieving **±1 μm precision** via least-squares optimization — establishing the technical foundation for every production machine that followed.",
          "Designed and built the initial cloud infrastructure on **Linode** using **Docker** and **NGINX**, establishing the containerized deployment pattern that scaled the platform from prototype to production.",
        ],
      },
    ],
  },
  {
    organization: "Cognitive Centivizer",
    icon_url: asset("/Cognitive Centivizer.png"),
    roles: [
      {
        title: "Full Stack Software Developer",
        dates: "Sep 2020 – May 2021",
        achievements: [
          "Built reaction time and memory assessment games in **React** and **Node.js** that collected cognitive performance data on **100+ participants**, letting psychology students run behavioural research through gameplay instead of traditional testing.",
          "Introduced PR review standards and a branching workflow for a team of 10, then consolidated duplicated game logic into a shared module that cut the time to add a new assessment from a week to a day.",
        ],
      },
    ],
  },
  {
    organization: "OpenRace — University of Toronto Hatchery",
    icon_url: asset("/Hatchery.png"),
    roles: [
      {
        title: "Software Developer",
        dates: "Jan 2021 – Apr 2021",
        achievements: [
          "Shipped a virtual race platform in **Swift** and **Node.js** during the 2021 lockdowns, streaming competitor positions live over **WebSockets** and mobile GPS so isolated runners could still race head-to-head.",
        ],
      },
    ],
  },
  {
    organization: "Autocase",
    icon_url: asset("/Autocase.jpeg"),
    roles: [
      {
        title: "Full Stack Software Developer (Internship)",
        dates: "May 2019 – Jun 2020",
        achievements: [
          "Developed a full-stack cost-benefit analysis platform (**AngularJS** and **Python**) that transformed complex economic research models into interactive visualizations, enabling real-time assessment of environmental, economic, and social impacts.",
          "Automated aggregation of **150+ GB** of NetCDF government data using **Pandas**, reducing processing time from **5 days to 8 hours** and enabling faster benchmarking of model performance.",
          "Designed and implemented unit and integration tests using **pytest** and **Jest**, increasing test coverage from **50% to 95%+** and reducing post-deployment issues by **30%**.",
        ],
      },
    ],
  },
];

export const EDUCATION: ExperienceType[] = [
  {
    organization: "Toronto Metropolitan University",
    icon_url: asset("/TMU Talent Accelerator.png"),
    roles: [
      {
        title: "Digital Growth Marketing Talent Accelerator",
        dates: "Jul 2025 – Nov 2025",
        achievements: [
          "Instrumented funnel analytics to find the highest drop-off stage, then reallocated spend toward the channels with the lowest acquisition cost.",
          "Ran A/B tests on landing page headlines and calls to action to evaluate campaign performance and drive data-informed decisions.",
        ],
      },
    ],
  },
  {
    organization: "University of Toronto",
    icon_url: asset("/University of Toronto.png"),
    roles: [
      {
        title: "BSc. in Computer Science",
        dates: "Sep 2016 – Apr 2021",
        achievements: [
          "Dean's List, all years of undergraduate study",
          "CGPA: 3.72/4.0",
        ],
      },
    ],
  },
];
