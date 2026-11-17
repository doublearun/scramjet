import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const port = Number(process.env.PORT || 8080);

const types = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".mjs": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".wasm": "application/wasm",
	".png": "image/png",
	".svg": "image/svg+xml",
	".map": "application/json",
	".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
	const { pathname } = new URL(req.url, "http://x");
	let file = path.normalize(path.join(root, decodeURIComponent(pathname)));
	if (!file.startsWith(root)) {
		res.writeHead(403).end();
		return;
	}
	if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
		file = path.join(root, "index.html");
	}
	res.writeHead(200, {
		"Content-Type": types[path.extname(file)] || "application/octet-stream",
	});
	fs.createReadStream(file).pipe(res);
});

server.on("upgrade", (req, socket, head) => wisp.routeRequest(req, socket, head));

server.listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
