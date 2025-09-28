import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { hobby: string } }
) {
  const hobby = params.hobby;
  const dir = path.join(process.cwd(), "public", hobby);

  let images: string[] = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    images = files.map((f) => `/portfolio/${hobby}/${f}`);
  }

  return NextResponse.json(images);
}
