import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // ✅ Add this for CSP fix
import { getJson } from "serpapi";
import { connectDb } from "./config/db.js";
import periodTrackingRoutes from "./routes/periodTracking.route.js";
import postRoutes from "./routes/post.route.js";
import spotifyRoutes from "./routes/spotify.route.js";
import userRoutes from "./routes/user.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Environment check
console.log("🔍 Checking environment variables...");
if (!process.env.CLERK_SECRET_KEY) {
  console.error("❌ Missing: CLERK_SECRET_KEY...");
  process.exit(1);
}
console.log("✅ Clerk secret key found");

// ✅ Helmet Security Setup (fixes CSP block)
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        connectSrc: ["'self'", "*"], // allow APIs, WebSockets, Clerk, etc.
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // prevents blocking Clerk SDK & APIs
  })
);

// ✅ Optional: Handle favicon requests safely
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Middleware setup
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());
app.use(clerkMiddleware());

// ✅ CORS setup
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174",
      "https://api.clerk.dev",
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Svix-Id",
      "Svix-Timestamp",
      "Svix-Signature",
    ],
  })
);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({
    message: "✅ Backend running successfully!",
    clerkConfigured: !!process.env.CLERK_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV,
  });
});

// ✅ API Routes
app.use("/api/auth", userRoutes);
app.use("/api/period", requireAuth(), periodTrackingRoutes);
app.use("/api/post", requireAuth(), postRoutes);
app.use("/api/spotify", spotifyRoutes);

// ✅ Product search (SerpAPI)
app.get("/api/products", async (req, res) => {
  const query = req.query.q || "period care products";
  try {
    const response = await getJson({
      engine: "google_shopping",
      q: query,
      location: "India",
      hl: "en",
      gl: "in",
      api_key: process.env.VITE_SERPAPI_KEY,
    });
    res.json({ products: response.shopping_results || [] });
  } catch (error) {
    console.error("❌ SerpAPI error:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Connect to MongoDB and start the server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });
