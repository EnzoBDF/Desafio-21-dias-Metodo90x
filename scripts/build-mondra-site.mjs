import "./prepare-mondra-site.mjs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const build = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build"], { cwd: path.join(root, ".next/mondra-site"), env: { ...process.env, MONDRA_BUILD_ROOT: root }, stdio: "inherit" });
if (build.error) throw build.error;
process.exitCode = build.status ?? 1;
