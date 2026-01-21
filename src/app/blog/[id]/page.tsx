import BlogClient from "@/ui/blog_content";
import fs from "fs/promises";
import path from "path";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server component
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <BlogClient id={id} />;
}

// Static paths for export
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public/blog");
  const files = await fs.readdir(blogDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ id: f.replace(".md", "") }));
}
