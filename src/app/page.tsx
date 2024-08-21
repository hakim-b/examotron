import fs from "fs";
import path from "path";
import { Tree, File, Folder } from "~/components/magicui/file-tree";
import Navbar from "~/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type DirElement = {
  id: string;
  name: string;
  isSelectable: boolean;
  children?: DirElement[];
};

// Function to generate a tree structure
const generateTree = (directoryPath: string, baseId = ""): DirElement[] => {
  const elements: DirElement[] = [];
  const dirItems = fs.readdirSync(directoryPath, { withFileTypes: true });

  dirItems.forEach((item, index) => {
    const itemPath = path.join(directoryPath, item.name);
    const itemId = `${baseId}${index}`;

    if (item.isDirectory()) {
      const children = generateTree(itemPath, `${itemId}-`);

      elements.push({
        id: itemId,
        isSelectable: true,
        name: item.name,
        children,
      });
    } else {
      elements.push({
        id: itemId,
        isSelectable: true,
        name: item.name,
      });
    }
  });

  return elements;
};

// Server Component to read subdirectories and render tabs
export default async function Home() {
  const directoryPath = path.join(process.cwd(), "examotron_backup");
  const subdirectories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return (
    <>
      <Navbar />
      <Tabs defaultValue={subdirectories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-12">
          {subdirectories.map((subdir) => (
            <TabsTrigger key={subdir} value={subdir}>
              {subdir}
            </TabsTrigger>
          ))}
        </TabsList>
        {subdirectories.map((subdir) => {
          const elements = generateTree(path.join(directoryPath, subdir));
          return (
            <TabsContent key={subdir} value={subdir}>
              <div className="relative flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <Tree
                  className="p-2 overflow-hidden rounded-md bg-background"
                  initialExpandedItems={["1"]}
                  elements={elements}
                >
                  {elements.map((element) => (
                    <Folder key={element.id} element={element.name} value={element.id}>
                      {element.children?.map((child) => (
                        <File key={child.id} value={child.id}>
                          <p>{child.name}</p>
                        </File>
                      ))}
                    </Folder>
                  ))}
                </Tree>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
