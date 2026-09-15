/**
 * Stripe Integration - Sponsor Billing
 * Manage recurring sponsor payments and invoicing
 */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20",
});

export interface SponsorPayment {
  sponsorId: string;
  sponsorName: string;
  tier: "bronze" | "silver" | "gold";
  price: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  startDate: Date;
  endDate?: Date;
  status: "active" | "paused" | "canceled";
}

/**
 * Create sponsor subscription
 * Charges monthly starting today
 */
export async function createSponsorSubscription(
  sponsor: SponsorPayment
): Promise<SponsorPayment> {
  try {
    // 1. Create customer
    const customer = await stripe.customers.create({
      name: sponsor.sponsorName,
      email: `${sponsor.sponsorId}@sponsor.eu-ai-desk.com`,
      metadata: {
        sponsorId: sponsor.sponsorId,
        tier: sponsor.tier,
      },
    });

    // 2. Create price (if not cached)
    const priceId = `price_${sponsor.tier}_${Date.now()}`;

    // 3. Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor - EU AI Operator's Desk`,
              description: `Monthly sponsorship placement`,
            },
            unit_amount: sponsor.price * 100, // Convert to cents
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        sponsorId: sponsor.sponsorId,
        tier: sponsor.tier,
      },
    });

    return {
      ...sponsor,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      status: "active",
    };
  } catch (error) {
    console.error("Failed to create sponsor subscription:", error);
    throw error;
  }
}

/**
 * Cancel sponsor subscription
 */
export async function cancelSponsorSubscription(
  subscriptionId: string
): Promise<void> {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  } catch (error) {
    console.error("Failed to cancel sponsor subscription:", error);
    throw error;
  }
}

/**
 * Get sponsor billing history
 */
export async function getSponsorBillingHistory(
  customerId: string
): Promise<Stripe.Invoice[]> {
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 12,
    });

    return invoices.data;
  } catch (error) {
    console.error("Failed to fetch billing history:", error);
    throw error;
  }
}

/**
 * Webhook handler for Stripe events
 */
export async function handleStripeWebhook(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "customer.subscription.created":
      console.log("✓ New sponsor subscription created");
      // TODO: Send welcome email to sponsor
      break;

    case "customer.subscription.updated":
      console.log("✓ Sponsor subscription updated");
      // TODO: Update sponsor status in database
      break;

    case "customer.subscription.deleted":
      console.log("✓ Sponsor subscription canceled");
      // TODO: Remove sponsor placements, send offboarding email
      break;

    case "invoice.payment_succeeded":
      console.log("✓ Sponsor payment received");
      // TODO: Send invoice email
      break;

    case "invoice.payment_failed":
      console.log("! Sponsor payment failed");
      // TODO: Send retry email
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

export default {
  createSponsorSubscription,
  cancelSponsorSubscription,
  getSponsorBillingHistory,
  handleStripeWebhook,
};
