import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const capabilities = {
  service: "eu-ai-operator-desk",
  version: "1.1.0",
  status: "ready",
  public_surface: ["health", "capabilities", "llms.txt"],
  control_plane: "MindReply / MRdash",
  modules: [
    "orchestrator",
    "memory",
    "planner",
    "scheduler",
    "analytics",
    "mcp-tools",
    "shopping-memberships",
    "robotics",
    "multi-region",
    "founder-presence",
  ],
  payment_protocols: {
    mpp: "planned-controlled",
    x402: "compatible-controlled",
    production_settlement: "not_activated",
  },
  regions: ["EU", "UK", "US"],
  execution_policy: "approval-gated",
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.disable("x-powered-by");
  app.use(express.json({ limit: "256kb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: capabilities.service,
      version: capabilities.version,
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/operator/capabilities", (_req, res) => {
    res.status(200).json(capabilities);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`EU AI Operator's Desk running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start EU AI Operator's Desk", error);
  process.exit(1);
});
