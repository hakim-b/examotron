"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { storage } from "~/lib/firebase";
import {
  listAll,
  ref,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { Tree, Folder, File, TreeViewElement } from "./magicui/file-tree";
import Link from "next/link";

function ExamoFiles() {
  const [subjectFolders, setSubjectFolders] = useState<string[]>([]);
  const [fileTrees, setFileTrees] = useState<{ [key: string]: any[] }>({});

  const fetchFolderContentsRecursive = async (
    folderRef: StorageReference,
  ): Promise<any> => {
    const result = await listAll(folderRef);

    const subFolders = await Promise.all(
      result.prefixes.map(async (subFolderRef) => {
        const subFolderContents =
          await fetchFolderContentsRecursive(subFolderRef);
        return {
          id: subFolderRef.fullPath,
          isSelectable: true,
          name: subFolderRef.name,
          children: subFolderContents,
        };
      }),
    );

    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          id: itemRef.fullPath,
          isSelectable: true,
          name: itemRef.name,
          url,
        };
      }),
    );

    return [...subFolders, ...files];
  };

  const fetchFolderContents = async (folderName: string) => {
    const folderRef = ref(storage, `/${folderName}`);
    try {
      const result = await listAll(folderRef);

      const elements = await Promise.all(
        result.prefixes.map(async (subFolderRef) => {
          const subFolderContents =
            await fetchFolderContentsRecursive(subFolderRef);
          return {
            id: subFolderRef.fullPath,
            isSelectable: true,
            name: subFolderRef.name,
            children: subFolderContents,
          };
        }),
      );

      const files = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            id: itemRef.fullPath,
            isSelectable: true,
            name: itemRef.name,
            url,
          };
        }),
      );

      setFileTrees((prev) => ({
        ...prev,
        [folderName]: [...elements, ...files],
      }));
    } catch (error) {
      console.error(`Error fetching contents for ${folderName}:`, error);
    }
  };

  const fetchFolders = async () => {
    const storageRef = ref(storage, "/");

    try {
      const result = await listAll(storageRef);
      const subjectFolderNames = result.prefixes.map(
        (subjectFolderRef) => subjectFolderRef.name,
      );
      setSubjectFolders(subjectFolderNames);

      // Fetch contents for each folder
      subjectFolderNames.forEach((folderName) => {
        fetchFolderContents(folderName);
      });
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <>
      <Tabs defaultValue="biol" className="mt-5 w-full">
        <TabsList className="grid w-full grid-cols-5 md:grid-cols-11 h-28 md:h-10">
          {subjectFolders.map((subjFolder, index) => (
            <TabsTrigger value={subjFolder.toLowerCase()} key={index}>
              {subjFolder}
            </TabsTrigger>
          ))}
        </TabsList>
        {subjectFolders.map((subjFolder, index) => (
          <TabsContent value={subjFolder.toLowerCase()} key={index} className="mt-8 md:mt-2">
            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
              <Tree
                className="overflow-hidden rounded-md bg-background p-2"
                elements={fileTrees[subjFolder] || []}
              >
                {fileTrees[subjFolder]?.map((item) =>
                  item.children ? (
                    <Folder key={item.id} value={item.id} element={item.name}>
                      {item.children.map((child: TreeViewElement) =>
                        child.children ? (
                          <Folder
                            key={child.id}
                            value={child.id}
                            element={child.name}
                          >
                            {child.children.map((subChild) => (
                              <File key={subChild.id} value={subChild.id}>
                                <Link
                                  href={subChild.url!}
                                  download
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {subChild.name}
                                </Link>
                              </File>
                            ))}
                          </Folder>
                        ) : (
                          <File key={child.id} value={child.id}>
                            <Link
                              href={child.url!}
                              download
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {child.name}
                            </Link>
                          </File>
                        ),
                      )}
                    </Folder>
                  ) : (
                    <File key={item.id} value={item.id}>
                      <Link
                        href={item.url!}
                        download
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </Link>
                    </File>
                  ),
                )}
              </Tree>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default ExamoFiles;
