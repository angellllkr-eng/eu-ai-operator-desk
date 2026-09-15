/**
 * API Routes - Monetization
 * Sponsor applications, affiliate signups, admin endpoints
 */
import express, { Request, Response } from "express";
import { sendEmail } from "../lib/emails";

const router = express.Router();

// In-memory store (replace with database)
const pendingSponsors: any[] = [];
const pendingAffiliates: any[] = [];
const activeSponsors: any[] = [];
const activeAffiliates: any[] = [];

// POST /api/sponsors/apply
router.post("/sponsors/apply", async (req: Request, res: Response) => {
  const { companyName, email, website, tier, description, logoUrl, ctaText, ctaUrl } =
    req.body;

  if (!companyName || !email || !tier) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sponsor = {
    id: `sponsor_${Date.now()}`,
    companyName,
    email,
    website,
    tier,
    description,
    logoUrl,
    ctaText,
    ctaUrl,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  pendingSponsors.push(sponsor);

  // Send confirmation email
  await sendEmail(
    email,
    "sponsorWelcome",
    [
      companyName,
      tier,
      tier === "bronze" ? "100k+/month" : tier === "silver" ? "500k+/month" : "1M+/month",
    ]
  );

  // Notify admin
  console.log(`✓ New sponsor application: ${companyName} (${tier})`);

  res.json({ success: true, sponsorId: sponsor.id });
});

// POST /api/affiliates/apply
router.post("/affiliates/apply", async (req: Request, res: Response) => {
  const { name, email, website } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const affiliate = {
    id: `affiliate_${Date.now()}`,
    name,
    email,
    website,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  pendingAffiliates.push(affiliate);

  // Send confirmation
  console.log(`✓ New affiliate application: ${name}`);

  res.json({ success: true, affiliateId: affiliate.id });
});

// GET /api/admin/stats
router.get("/admin/stats", (req: Request, res: Response) => {
  const stats = {
    totalSponsors: activeSponsors.length,
    activeSponsors: activeSponsors.filter((s: any) => s.status === "active").length,
    totalAffiliates: activeAffiliates.length,
    totalRevenue: activeSponsors.reduce((sum: number, s: any) => sum + (s.monthly_price || 0), 0),
    pendingApplications: pendingSponsors.length + pendingAffiliates.length,
    revenueThisMonth: activeSponsors.reduce(
      (sum: number, s: any) => sum + (s.monthly_price || 0),
      0
    ),
  };

  res.json(stats);
});

// GET /api/admin/sponsors
router.get("/admin/sponsors", (req: Request, res: Response) => {
  res.json(activeSponsors);
});

// GET /api/admin/affiliates
router.get("/admin/affiliates", (req: Request, res: Response) => {
  res.json(activeAffiliates);
});

// GET /api/admin/pending-sponsors
router.get("/admin/pending-sponsors", (req: Request, res: Response) => {
  res.json(pendingSponsors);
});

// GET /api/admin/pending-affiliates
router.get("/admin/pending-affiliates", (req: Request, res: Response) => {
  res.json(pendingAffiliates);
});

// POST /api/admin/approve-sponsor
router.post("/admin/approve-sponsor", async (req: Request, res: Response) => {
  const { sponsorId } = req.body;

  const sponsor = pendingSponsors.find((s) => s.id === sponsorId);
  if (!sponsor) {
    return res.status(404).json({ error: "Sponsor not found" });
  }

  // Move to active
  pendingSponsors.splice(pendingSponsors.indexOf(sponsor), 1);
  sponsor.status = "active";
  activeSponsors.push(sponsor);

  // Send approval email
  await sendEmail(sponsor.email, "sponsorWelcome", [sponsor.companyName, sponsor.tier, "TBD"]);

  console.log(`✓ Approved sponsor: ${sponsor.companyName}`);

  res.json({ success: true });
});

// POST /api/admin/approve-affiliate
router.post("/admin/approve-affiliate", async (req: Request, res: Response) => {
  const { affiliateId } = req.body;

  const affiliate = pendingAffiliates.find((a) => a.id === affiliateId);
  if (!affiliate) {
    return res.status(404).json({ error: "Affiliate not found" });
  }

  // Move to active
  pendingAffiliates.splice(pendingAffiliates.indexOf(affiliate), 1);
  affiliate.status = "active";
  activeAffiliates.push(affiliate);

  console.log(`✓ Approved affiliate: ${affiliate.name}`);

  res.json({ success: true });
});

// POST /api/admin/reject-sponsor
router.post("/admin/reject-sponsor", async (req: Request, res: Response) => {
  const { sponsorId, reason } = req.body;

  const sponsor = pendingSponsors.find((s) => s.id === sponsorId);
  if (!sponsor) {
    return res.status(404).json({ error: "Sponsor not found" });
  }

  // Send rejection email
  console.log(`✓ Rejected sponsor: ${sponsor.companyName}`);

  pendingSponsors.splice(pendingSponsors.indexOf(sponsor), 1);

  res.json({ success: true });
});

// POST /api/admin/payout
router.post("/admin/payout", async (req: Request, res: Response) => {
  const { affiliateId, amount } = req.body;

  const affiliate = activeAffiliates.find((a) => a.id === affiliateId);
  if (!affiliate) {
    return res.status(404).json({ error: "Affiliate not found" });
  }

  // Create payout record
  const payout = {
    id: `payout_${Date.now()}`,
    affiliateId,
    amount,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  console.log(`✓ Initiated payout: ${affiliate.name} - $${amount}`);

  res.json({ success: true, payoutId: payout.id });
});

export default router;
