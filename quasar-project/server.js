import { serve } from "bun";
import fs from "fs";
import path from "path";

// 路径设置
const DIST_DIR = path.join(process.cwd(), "dist/spa");

// 创建 Bun 服务器
serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // 处理静态文件请求
    if (url.pathname === "/") {
      return new Response(fs.readFileSync(path.join(DIST_DIR, "index.html")), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // 静态资源
    const filePath = path.join(DIST_DIR, url.pathname);
    if (fs.existsSync(filePath)) {
      const contentType = getContentType(filePath);
      return new Response(fs.readFileSync(filePath), {
        headers: { "Content-Type": contentType },
      });
    }

    // API 请求处理
    if (url.pathname.startsWith("/assets")) {
      const headers = {
        "Access-Control-Allow-Origin": "*", // 生产环境中应改为特定域名
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      // 处理预检请求
      if (req.method === "OPTIONS") {
        return new Response(null, { headers });
      }

      // 处理 API 请求的逻辑
      return new Response(JSON.stringify({ message: "API response" }), {
        headers,
      });
    }

    // 404 Not Found
    return new Response("404 Not Found", { status: 404 });
  },
});

// 根据文件扩展名返回相应的 Content-Type
function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case ".html":
      return "text/html";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}
