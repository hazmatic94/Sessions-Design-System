import { promises as fs } from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("src/components");
const outputRoot = path.resolve("dist/components");
const stylesSourceRoot = path.resolve("src/styles");
const stylesOutputRoot = path.resolve("dist/styles");

async function copyCssModules(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const sourcePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await copyCssModules(sourcePath);
        return;
      }

      if (!entry.isFile() || !entry.name.endsWith(".module.css")) {
        return;
      }

      const relativePath = path.relative(sourceRoot, sourcePath);
      const outputPath = path.join(outputRoot, relativePath);

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.copyFile(sourcePath, outputPath);
    }),
  );
}

async function copyStyles() {
  await fs.mkdir(stylesOutputRoot, { recursive: true });
  const entries = await fs.readdir(stylesSourceRoot, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
      .map((entry) => fs.copyFile(path.join(stylesSourceRoot, entry.name), path.join(stylesOutputRoot, entry.name))),
  );
}

async function copyComponentGlobalStyles(directory, isSourceRoot = false) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const sourcePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await copyComponentGlobalStyles(sourcePath, false);
        return;
      }

      if (isSourceRoot || !entry.isFile() || !entry.name.endsWith(".css") || entry.name.endsWith(".module.css")) {
        return;
      }

      const relativePath = path.relative(sourceRoot, sourcePath);
      const outputPath = path.join(outputRoot, relativePath);

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.copyFile(sourcePath, outputPath);
    }),
  );
}

await copyCssModules(sourceRoot);
await copyComponentGlobalStyles(sourceRoot, true);
await copyStyles();
