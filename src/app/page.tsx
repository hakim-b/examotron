import fs from "fs";
import Link from "next/link";
import path from "path";
import {
  Tree,
  File,
  Folder,
  TreeViewElement,
} from "~/components/magicui/file-tree";
import Navbar from "~/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default async function Home() {
  const directoryPath = path.join(process.cwd(), "examotron_backup");
  const subdirectories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const generateTree = (directoryPath: string, baseId = "") => {
    const elements: TreeViewElement[] = [];
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

  const renderTreeElements = (elements: TreeViewElement[]) => {
    return elements.map((element) =>
      element.children && element.children.length > 0 ? (
        <Folder key={element.id} element={element.name} value={element.id}>
          {renderTreeElements(element.children)}
        </Folder>
      ) : (
        <File key={element.id} value={element.id}>
          <Link
            href={element.name}
            download
            rel="noopener noreferrer"
            target="_blank"
          >
            {element.name}
          </Link>
        </File>
      ),
    );
  };

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
                  className="overflow-hidden rounded-md bg-background p-2"
                  initialExpandedItems={["1"]}
                  elements={elements}
                >
                  {renderTreeElements(elements)}
                </Tree>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
