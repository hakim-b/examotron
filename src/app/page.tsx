import fs from "fs";
import path from "path";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// Server Component to read subdirectories and render tabs
export default async function Home() {
  const directoryPath = path.join(process.cwd(), "examotron_backup");
  const subdirectories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return (
    <Tabs defaultValue={subdirectories[0]} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-12 gap-28">
        {subdirectories.map((subdir) => (
          <TabsTrigger key={subdir} value={subdir}>
            {subdir}
          </TabsTrigger>
        ))}
      </TabsList>
      {subdirectories.map((subdir) => (
        <TabsContent key={subdir} value={subdir}></TabsContent>
      ))}
    </Tabs>
  );
}
