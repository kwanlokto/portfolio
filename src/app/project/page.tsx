import { Box } from "@mui/material";
import { ItemGrid } from "@/ui/item_grid";
import { PROJECTS } from "@/lib/project";
import { ProjectCard } from "@/ui/card/project_card";
import { SectionHeader } from "@/ui/section_header";

export const metadata = {
  title: "Projects — Ray Kwan",
  description:
    "Chrome extensions, offline AI tooling, algorithm visualizers, and hardware-integrated systems.",
};

export default function Page() {
  return (
    <Box>
      <SectionHeader title="Projects" variant="page" mb={3} />
      <ItemGrid>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ItemGrid>
    </Box>
  );
}
