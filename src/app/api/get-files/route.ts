import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const fileMap = new Map<string, string[]>();

  const getFilesRecursively = (dir: string) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const relativePath = path
        .relative(process.cwd(), fullPath)
        .replace(/\\/g, "/");

      if (fs.statSync(fullPath).isDirectory()) {
        getFilesRecursively(fullPath);
      } else {
        const folder = path.dirname(relativePath);
        if (!fileMap.has(folder)) {
          fileMap.set(folder, []);
        }
        fileMap.get(folder)!.push(file);
      }
    });
  };

  const startDir = path.join(process.cwd(), "/public/examotron_backup");
  getFilesRecursively(startDir);

  const fileMapObject = Object.fromEntries(fileMap); // Convert to an object to return as JSON
  return NextResponse.json({ fileMap: fileMapObject }, { status: 200 });
}
