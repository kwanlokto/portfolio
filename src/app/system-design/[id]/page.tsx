import { SystemDesignStudy, system_design_studies } from "@/lib/system_design";

import { Button } from "@mui/material";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import SystemDesignClient from "@/ui/system_design";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server component
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const system_design_study = system_design_studies.find((p) => p.id === id);

  if (!system_design_study) return <div>Not found</div>;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<MdArrowBack size={18} />}
        component={Link}
        href="/system-design"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          mb: 2,
          fontSize: "0.875rem",
          borderColor: "divider",
          color: "text.primary",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "text.secondary",
          },
        }}
      >
        Back
      </Button>
      <SystemDesignClient system_design_study={system_design_study} />
    </>
  );
}

// Static paths for export
export async function generateStaticParams() {
  return system_design_studies.map(
    (system_design_study: SystemDesignStudy) => ({
      id: system_design_study.id,
    })
  );
}
