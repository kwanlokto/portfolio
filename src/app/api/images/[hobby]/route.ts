import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ hobby: string }> }
) {
  const { params } = context;
  const { hobby } = await params;
  const dir = path.join(process.cwd(), "public", hobby);

  let images: string[] = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    images = files.map((f) => `/portfolio/${hobby}/${f}`);
  }

  return NextResponse.json(images);
}
