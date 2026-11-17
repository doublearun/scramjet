import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// The published controller package has no "./path" export yet, so point at
// the installed dist directories directly.
const distOf = (pkg) => path.resolve("node_modules", pkg, "dist");

export default {
	plugins: [
		viteStaticCopy({
			structured: false,
			targets: [
				{ src: distOf("@mercuryworkshop/scramjet") + "/*", dest: "scramjet" },
				{ src: distOf("@mercuryworkshop/scramjet-controller") + "/*", dest: "controller" },
			],
		}),
	],
};
