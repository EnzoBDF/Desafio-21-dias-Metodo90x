// Create an isolated, static deployment of the game without publishing the existing site.
import { cp, mkdir, readFile, writeFile, symlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destination = path.join(root, ".next", "mondra-site");
await mkdir(path.join(destination, "app", "jogo"), { recursive: true });
await mkdir(path.join(destination, "public"), { recursive: true });
await mkdir(path.join(destination, ".openai"), { recursive: true });
try { await symlink(path.join(root, "node_modules"), path.join(destination, "node_modules"), "junction"); } catch (error) { if (error.code !== "EEXIST") throw error; }
for (const file of ["MondraGame.tsx", "WorldCanvas.tsx", "game.ts", "mondra.css", "page.tsx"]) await cp(path.join(root, "app", "jogo", file), path.join(destination, "app", file));
await cp(path.join(root, "public", "game"), path.join(destination, "public", "game"), { recursive: true });
await cp(path.join(root, "app", "jogo", ".openai", "hosting.json"), path.join(destination, ".openai", "hosting.json"));
await writeFile(path.join(destination, "app", "jogo", "page.tsx"), 'export { default, metadata } from "../page";\n');
await writeFile(path.join(destination, "app", "layout.tsx"), 'import type { ReactNode } from "react";\nimport "./base.css";\nexport default function Layout({children}: {children: ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }\n');
await writeFile(path.join(destination, "app", "base.css"), ':root { --font-poppins: "Segoe UI", Arial, sans-serif; --font-geist-mono: "Consolas", monospace; } html,body{margin:0;min-width:320px;background:#101b1b}button{font:inherit}');
await writeFile(path.join(destination, "next.config.mjs"), 'export default { output: "export", images: { unoptimized: true }, turbopack: { root: process.env.MONDRA_BUILD_ROOT || process.cwd() } };\n');
await writeFile(path.join(destination, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2017", lib: ["dom", "dom.iterable", "esnext"], strict: true, noEmit: true, esModuleInterop: true, module: "esnext", moduleResolution: "bundler", jsx: "react-jsx", skipLibCheck: true, resolveJsonModule: true, isolatedModules: true, plugins: [{ name: "next" }] }, include: ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], exclude: ["node_modules"] }, null, 2));
const original = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
await writeFile(path.join(destination, "package.json"), JSON.stringify({ name: "mondra-vale", version: "1.0.0", private: true, scripts: { build: "next build" }, dependencies: { next: original.dependencies.next, react: original.dependencies.react, "react-dom": original.dependencies["react-dom"] }, devDependencies: { typescript: original.devDependencies.typescript, "@types/react": original.devDependencies["@types/react"], "@types/node": original.devDependencies["@types/node"] } }, null, 2));
await writeFile(path.join(destination, ".gitignore"), "node_modules/\n.next/\nout/\ndist/\nnext-env.d.ts\n");
console.log(destination);
