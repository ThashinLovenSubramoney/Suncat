// server/server.cjs  (CommonJS, runs with: node server/server.cjs)
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// simple request logger (helps debug)
app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});

// --- health check ---
app.get("/api/ping", (_req, res) => res.json({ ok: true, msg: "pong" }));

// --- reCAPTCHA verify (dev) ---
app.post("/api/verify-recaptcha", async (req, res) => {
  try {
    const { recaptchaToken } = req.body || {};
    if (!recaptchaToken) return res.status(400).json({ success: false, error: "Missing recaptchaToken" });

    const secretKey = "6LeBURsqAAAAABO3kq_6pyndR6t-Y6obg-G8_FIt"; // TODO: replace with your own later
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: { secret: secretKey, response: recaptchaToken },
    });

    const result = response.data;
    res.json({ success: !!result.success, score: result.score ?? null, action: result.action ?? null });
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- dev token store (resets when server restarts) ---
const invites = new Map();
invites.set("SUN-PORTAL-2025", { role: "member", email: "demo@example.com", used: false });

// verify token
app.post("/api/verifyPortalCode", (req, res) => {
  const code = String(req.body?.code || "").toUpperCase().trim();
  const row = invites.get(code);
  if (!row || row.used) return res.status(403).json({ ok: false, message: "Invalid or expired code." });
  row.used = true;
  res.json({ ok: true, role: row.role, email: row.email, next: "/" });
});

// begin registration
app.post("/api/beginRegistration", (req, res) => {
  const { name = "", email = "", org = "", purpose = "" } = req.body || {};
  if (!email) return res.status(400).json({ ok: false, message: "Email required" });
  const params = new URLSearchParams({ name, email, org, purpose });
  res.json({ ok: true, registerUrl: `/register?${params.toString()}` });
});

// audit
app.post("/api/logPortalEvent", (req, res) => {
  console.log("[audit]", {
    type: req.body?.type,
    status: req.body?.status,
    email: req.body?.email,
    ua: req.headers["user-agent"],
    ip: req.socket.remoteAddress,
  });
  res.json({ ok: true });
});

// global error handler
app.use((err, _req, res, _next) => {
  console.error("API error:", err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`[dev-api] http://localhost:${PORT}`));
