"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [fileMap, setFileMap] = useState<Map<string, string[]>>(new Map());

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    fetch("/api/get-files")
      .then((res) => res.json())
      .then((data) => {
        const fileMapData = new Map<string, string[]>(
          Object.entries(data.fileMap),
        );
        setFileMap(fileMapData);
      });
  }, []);

  const fileArr = Array.from(fileMap.entries());

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL or ⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No files found.</CommandEmpty>
          {fileArr.map(([folder, files]) => (
            <CommandGroup heading={folder} key={folder}>
              {files.map((file) => (
                <CommandItem key={file}>
                  <FileText size={16} className="mr-2 h-4 w-4" />{" "}
                  <span>{file}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default CommandPalette;
