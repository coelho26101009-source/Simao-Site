// Tiny static server for dist/ (local preview and tests). Usage: node scripts/serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png",
  ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain",
};

export function serve(port = 4173) {
  const server = createServer(async (req, res) => {
    let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
    let file = join(root, path);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": types[".html"] });
      res.end(await readFile(join(root, "404.html")));
    }
  });
  return new Promise((ok) => server.listen(port, () => ok(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.argv[2]) || 4173;
  await serve(port);
  console.log(`http://localhost:${port}`);
}
