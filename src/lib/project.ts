import { BASE_PATH, asset } from "@/lib/site";

import projects_data from "@/lib/projects.json";
import { screenshot_filename } from "@/lib/screenshot_name.mjs";

export interface ProjectType {
  title: string;
  description: string;
  picture_url: string | null;
  tech_stack: string[];
  deployed_url?: string;
  download_url?: string;
  source_url: string;
  featured?: boolean;
}

export const PROJECTS: ProjectType[] = projects_data as ProjectType[];

export const FEATURED_PROJECTS: ProjectType[] = PROJECTS.filter(
  (project) => project.featured,
);

/** Image shown on the project card. */
export const get_screenshot_url = (project: ProjectType): string => {
  const filename = screenshot_filename(project);
  if (filename) return `${BASE_PATH}/screenshots/${filename}`;
  if (project.picture_url) return asset(project.picture_url);
  return `https://api.microlink.io/?url=${encodeURIComponent(
    project.source_url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=800`;
};
