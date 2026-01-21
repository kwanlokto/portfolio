import BlogClient from "@/ui/blog_client";
import fs from "fs/promises";
import path from "path";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public/blog");
  const files = await fs.readdir(blogDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ id: f.replace(".md", "") }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ REQUIRED in Next 15+
  return <BlogClient id={id} />;
}
