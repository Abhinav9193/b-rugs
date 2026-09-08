import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load .env.local for local serverless development
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function contactApiPlugin() {
  return {
    name: "contact-api-dev-server",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/contact" && req.method === "POST") {
          let bodyStr = "";
          req.on("data", (chunk) => {
            bodyStr += chunk;
          });
          req.on("end", async () => {
            try {
              let parsedBody = {};
              if (bodyStr) {
                parsedBody = JSON.parse(bodyStr);
              }
              const mockReq = {
                method: req.method,
                body: parsedBody,
                headers: req.headers,
              };
              const mockRes = {
                setHeader(key, val) {
                  res.setHeader(key, val);
                },
                status(statusCode) {
                  res.statusCode = statusCode;
                  return this;
                },
                json(data) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(data));
                },
              };

              const { default: handler } = await import("./api/contact.js");
              await handler(mockReq, mockRes);
            } catch (err) {
              console.error(
                "Error handling /api/contact in dev middleware:",
                err,
              );
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  message: "Internal Server Error",
                }),
              );
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  build: {
    cssMinify: false,
  },
});
