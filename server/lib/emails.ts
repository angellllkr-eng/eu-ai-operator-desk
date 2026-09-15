/**
 * Email Templates - Transactional emails for monetization
 * Use with Resend, SendGrid, or AWS SES
 */

export const emailTemplates = {
  sponsorWelcome: {
    subject: "Welcome to EU AI Operator's Desk Sponsor Network",
    template: (sponsorName: string, tier: string, monthlyImpressions: string) =>
      `
<h2>Welcome, ${sponsorName}!</h2>
<p>Thank you for sponsoring EU AI Operator's Desk. Your ${tier} sponsorship is now active.</p>

<h3>Your Placement</h3>
<ul>
  <li><strong>Tier:</strong> ${tier}</li>
  <li><strong>Monthly Impressions:</strong> ${monthlyImpressions}</li>
  <li><strong>Billing:</strong> Monthly, charged on the 1st</li>
</ul>

<h3>Next Steps</h3>
<ol>
  <li>Submit your logo and description (2-3 sentences)</li>
  <li>We'll activate your placement within 24 hours</li>
  <li>Track clicks and impressions in your dashboard</li>
</ol>

<p><a href="https://eu-ai-desk.com/sponsor/dashboard">View Your Dashboard</a></p>
<p>Questions? Reply to this email or contact sponsors@eu-ai-desk.com</p>
      `,
  },

  affiliateCommission: {
    subject: "Affiliate Commission Earned - EU AI Operator's Desk",
    template: (
      productName: string,
      amount: string,
      commission: string,
      retailer: string
    ) =>
      `
<h2>Commission Earned! 🎉</h2>
<p>A user purchased via your affiliate link.</p>

<h3>Details</h3>
<ul>
  <li><strong>Product:</strong> ${productName}</li>
  <li><strong>Retailer:</strong> ${retailer}</li>
  <li><strong>Sale Amount:</strong> $${amount}</li>
  <li><strong>Your Commission (5%):</strong> $${commission}</li>
</ul>

<p>Commission will be paid via bank transfer on the 15th of each month (minimum $50).</p>
<p><a href="https://eu-ai-desk.com/affiliate/dashboard">View Your Affiliate Dashboard</a></p>
      `,
  },

  sponsorInvoice: {
    subject: "EU AI Operator's Desk - Monthly Invoice",
    template: (
      sponsorName: string,
      amount: string,
      month: string,
      invoiceId: string
    ) =>
      `
<h2>Invoice for ${month}</h2>
<p>Thank you, ${sponsorName}. Your monthly sponsorship has been charged.</p>

<h3>Invoice Details</h3>
<ul>
  <li><strong>Invoice ID:</strong> ${invoiceId}</li>
  <li><strong>Amount Charged:</strong> $${amount}</li>
  <li><strong>Period:</strong> ${month}</li>
</ul>

<h3>Performance</h3>
<p>This month your sponsor placement received:</p>
<ul>
  <li>~500 impressions</li>
  <li>~25 clicks (5% CTR)</li>
  <li>~3 estimated conversions</li>
</ul>

<p><a href="https://eu-ai-desk.com/sponsor/dashboard/invoices/${invoiceId}">Download Invoice (PDF)</a></p>
      `,
  },

  paymentFailed: {
    subject: "Payment Failed - Action Required",
    template: (sponsorName: string) =>
      `
<h2>Payment Could Not Be Processed</h2>
<p>Hi ${sponsorName},</p>
<p>We tried to charge your card for this month's sponsorship, but it was declined.</p>

<p><strong>Your sponsorship will be paused in 3 days if payment is not updated.</strong></p>

<p><a href="https://eu-ai-desk.com/sponsor/dashboard/billing">Update Payment Method</a></p>
<p>Need help? Contact us at sponsors@eu-ai-desk.com</p>
      `,
  },

  affiliateMonthlyReport: {
    subject: "Your Affiliate Report - EU AI Operator's Desk",
    template: (
      email: string,
      clicks: string,
      conversions: string,
      commission: string
    ) =>
      `
<h2>Your Monthly Affiliate Report</h2>
<p>Hi,</p>

<h3>This Month's Performance</h3>
<ul>
  <li><strong>Clicks:</strong> ${clicks}</li>
  <li><strong>Conversions:</strong> ${conversions}</li>
  <li><strong>Commission Earned:</strong> $${commission}</li>
</ul>

<h3>Top Products</h3>
<ol>
  <li>RTX 4090 - 8 clicks, 1 sale</li>
  <li>32GB DDR5 Memory - 5 clicks, 2 sales</li>
  <li>AMD Ryzen 7 7800X3D - 3 clicks, 0 sales</li>
</ol>

<p><a href="https://eu-ai-desk.com/affiliate/dashboard">View Full Dashboard</a></p>
<p>Commissions are paid on the 15th of each month (minimum $50).</p>
      `,
  },

  sponsorshipExpiring: {
    subject: "Your Sponsorship Ends Soon",
    template: (sponsorName: string, endDate: string) =>
      `
<h2>Sponsorship Ending Notice</h2>
<p>Hi ${sponsorName},</p>

<p>Your ${endDate} sponsorship with EU AI Operator's Desk is set to end on <strong>${endDate}</strong>.</p>

<p>Would you like to renew? <a href="https://eu-ai-desk.com/sponsor/renew">Renew Your Sponsorship</a></p>
<p>We'd love to continue working with you. Reach out: sponsors@eu-ai-desk.com</p>
      `,
  },
};

export type EmailTemplate = keyof typeof emailTemplates;

/**
 * Send email via Resend (recommended)
 */
export async function sendEmail(
  to: string,
  template: EmailTemplate,
  params: any
): Promise<boolean> {
  try {
    const { subject, template: htmlTemplate } = emailTemplates[template];
    const html = htmlTemplate(...Object.values(params));

    // Using Resend API (add to environment: RESEND_API_KEY)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "sponsors@eu-ai-desk.com",
        to,
        subject,
        html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export default emailTemplates;
