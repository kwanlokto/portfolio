import { SystemDesignStudy, system_design_studies } from "@/lib/system_design";

import SystemDesignClient from "@/ui/system_design";

interface PageProps {
  params: { id: string };
}

// Server component
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const system_design_study = system_design_studies.find((p) => p.id === id);

  if (!system_design_study) return <div>Not found</div>;

  return <SystemDesignClient system_design_study={system_design_study} />;
}

// Static paths for export
export async function generateStaticParams() {
  return system_design_studies.map(
    (system_design_study: SystemDesignStudy) => ({
      id: system_design_study.id,
    })
  );
}
