import * as fs from 'fs';
import * as path from 'path';

// Define a type for the file map
type FileMap = Map<string, string[]>;

function getFilesRecursively(dir: string, map: FileMap): void {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

        if (fs.statSync(fullPath).isDirectory()) {
            getFilesRecursively(fullPath, map);
        } else {
            const folder = path.dirname(relativePath);
            if (!map.has(folder)) {
                map.set(folder, []);
            }
            map.get(folder)!.push(file);
        }
    });
}

function createFileMap(startDir: string): FileMap {
    const fileMap: FileMap = new Map();
    getFilesRecursively(startDir, fileMap);
    return fileMap;
}

// Starting directory
const startDir = path.join(process.cwd(), 'public/examotron_backup');

// Creating the map
const fileMap = createFileMap(startDir);

// Print the map
fileMap.forEach((files, folder) => {
    console.log(`"${folder}": [${files.map(f => `"${f}"`).join(', ')}]`);
});
