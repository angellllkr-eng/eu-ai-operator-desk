/**
 * Analytics API Routes
 * Track affiliate clicks, sponsor impressions, conversions
 */
import express, { Request, Response } from "express";

const router = express.Router();

// In-memory store (replace with database in production)
const analytics = {
  affiliateClicks: [] as any[],
  sponsorClicks: [] as any[],
  conversions: [] as any[],
};

/**
 * POST /api/analytics/affiliate-click
 * Log affiliate link clicks
 */
router.post("/affiliate-click", (req: Request, res: Response) => {
  const { productName, productId, retailer, tier, timestamp } = req.body;

  analytics.affiliateClicks.push({
    id: `click_${Date.now()}`,
    productName,
    productId,
    retailer,
    tier,
    timestamp: timestamp || new Date().toISOString(),
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });

  res.json({ tracked: true });
});

/**
 * POST /api/analytics/sponsor-click
 * Log sponsor link clicks
 */
router.post("/sponsor-click", (req: Request, res: Response) => {
  const { sponsorId, position, timestamp } = req.body;

  analytics.sponsorClicks.push({
    id: `sponsor_${Date.now()}`,
    sponsorId,
    position,
    timestamp: timestamp || new Date().toISOString(),
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });

  res.json({ tracked: true });
});

/**
 * POST /api/analytics/conversion
 * Log conversions (user completed purchase via affiliate link)
 */
router.post("/conversion", (req: Request, res: Response) => {
  const { productId, retailer, amount, orderId, timestamp } = req.body;

  analytics.conversions.push({
    id: `conv_${Date.now()}`,
    productId,
    retailer,
    amount,
    orderId,
    timestamp: timestamp || new Date().toISOString(),
    commission: amount * 0.05, // 5% default
  });

  res.json({ tracked: true, commission: amount * 0.05 });
});

/**
 * GET /api/analytics/report
 * Summary report (protected endpoint - add auth in production)
 */
router.get("/report", (req: Request, res: Response) => {
  const report = {
    period: "all-time",
    affiliateClicks: {
      total: analytics.affiliateClicks.length,
      byRetailer: {
        amazon: analytics.affiliateClicks.filter((c) => c.retailer === "amazon")
          .length,
        newegg: analytics.affiliateClicks.filter((c) => c.retailer === "newegg")
          .length,
        bhphoto: analytics.affiliateClicks.filter((c) => c.retailer === "bhphoto")
          .length,
      },
      byTier: {
        focused: analytics.affiliateClicks.filter((c) => c.tier === "focused")
          .length,
        parallel: analytics.affiliateClicks.filter((c) => c.tier === "parallel")
          .length,
        enterprise: analytics.affiliateClicks.filter(
          (c) => c.tier === "enterprise"
        ).length,
      },
    },
    sponsorClicks: {
      total: analytics.sponsorClicks.length,
      byPosition: {
        sidebar: analytics.sponsorClicks.filter((c) => c.position === "sidebar")
          .length,
        footer: analytics.sponsorClicks.filter((c) => c.position === "footer")
          .length,
        featured: analytics.sponsorClicks.filter((c) => c.position === "featured")
          .length,
      },
    },
    conversions: {
      total: analytics.conversions.length,
      totalRevenue: analytics.conversions.reduce((sum, c) => sum + c.amount, 0),
      estimatedCommission: analytics.conversions.reduce(
        (sum, c) => sum + c.commission,
        0
      ),
      averageOrderValue:
        analytics.conversions.length > 0
          ? analytics.conversions.reduce((sum, c) => sum + c.amount, 0) /
            analytics.conversions.length
          : 0,
    },
  };

  res.json(report);
});

/**
 * GET /api/analytics/dashboard
 * Real-time dashboard data
 */
router.get("/dashboard", (req: Request, res: Response) => {
  const last30days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const recent = {
    affiliateClicks30d: analytics.affiliateClicks.filter(
      (c) => new Date(c.timestamp) > last30days
    ).length,
    sponsorClicks30d: analytics.sponsorClicks.filter(
      (c) => new Date(c.timestamp) > last30days
    ).length,
    conversions30d: analytics.conversions.filter(
      (c) => new Date(c.timestamp) > last30days
    ).length,
    revenue30d: analytics.conversions
      .filter((c) => new Date(c.timestamp) > last30days)
      .reduce((sum, c) => sum + c.amount, 0),
  };

  res.json(recent);
});

export default router;
