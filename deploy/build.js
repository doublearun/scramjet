// Builds the demo against the published npm packages, so deploys don't need
// the Rust/wasm toolchain that building packages/core from source requires.
import { cpSync } from "node:fs";
import { execSync } from "node:child_process";

for (const f of ["src", "public", "index.html", "tsconfig.json"]) {
	cpSync(`../packages/demo/${f}`, f, { recursive: true });
}

const domain = process.env.RAILWAY_PUBLIC_DOMAIN;
const env = { ...process.env };
env.VITE_WISP_URL ||= domain ? `wss://${domain}/wisp/` : "ws://localhost:8080/wisp/";

execSync("npx vite build", { stdio: "inherit", env });
