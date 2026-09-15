/**
 * Database Schema - Monetization
 * Postgres tables for sponsors, affiliates, transactions
 * Generated SQL for schema setup
 */

export const schema = `
-- Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  website VARCHAR(255),
  logo_url TEXT,
  description TEXT,
  tier VARCHAR(50) NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'paused', 'canceled')),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  placement_position VARCHAR(50) CHECK (placement_position IN ('sidebar', 'footer', 'featured', 'homepage')),
  cta_text VARCHAR(100),
  cta_url VARCHAR(255),
  start_date TIMESTAMP DEFAULT NOW(),
  end_date TIMESTAMP,
  monthly_price DECIMAL(10, 2) NOT NULL,
  total_clicks INT DEFAULT 0,
  total_impressions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  website VARCHAR(255),
  tier VARCHAR(50) DEFAULT 'basic' CHECK (tier IN ('basic', 'premium', 'partner')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'suspended')),
  amazon_tracking_id VARCHAR(255),
  newegg_tracking_id VARCHAR(255),
  bhphoto_tracking_id VARCHAR(255),
  total_clicks INT DEFAULT 0,
  total_conversions INT DEFAULT 0,
  total_commission DECIMAL(12, 2) DEFAULT 0,
  payout_method VARCHAR(50) CHECK (payout_method IN ('bank_transfer', 'paypal', 'stripe')),
  payout_account_id VARCHAR(255),
  minimum_payout DECIMAL(10, 2) DEFAULT 50.00,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate clicks (events)
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  retailer VARCHAR(50) NOT NULL CHECK (retailer IN ('amazon', 'newegg', 'bhphoto')),
  tier VARCHAR(50),
  url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate conversions (sales)
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  click_id UUID REFERENCES affiliate_clicks(id),
  product_name VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  retailer VARCHAR(50) NOT NULL,
  order_id VARCHAR(255) UNIQUE,
  sale_amount DECIMAL(12, 2) NOT NULL,
  commission_amount DECIMAL(12, 2) NOT NULL,
  commission_rate DECIMAL(5, 2) DEFAULT 5.00,
  status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'failed', 'refunded')),
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP
);

-- Sponsor clicks (events)
CREATE TABLE IF NOT EXISTS sponsor_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  position VARCHAR(50) NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sponsor impressions (page views)
CREATE TABLE IF NOT EXISTS sponsor_impressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  position VARCHAR(50) NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payouts
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
  payout_date TIMESTAMP,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  stripe_payout_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sponsor invoices
CREATE TABLE IF NOT EXISTS sponsor_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  stripe_invoice_id VARCHAR(255) UNIQUE,
  amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'failed')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  invoice_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);

-- Email logs
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email VARCHAR(255) NOT NULL,
  recipient_type VARCHAR(50) NOT NULL CHECK (recipient_type IN ('sponsor', 'affiliate')),
  recipient_id UUID,
  email_type VARCHAR(50) NOT NULL,
  subject VARCHAR(255),
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced', 'opened', 'clicked')),
  resend_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_affiliate ON affiliate_conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_sponsor ON sponsor_clicks(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_payouts_affiliate ON payouts(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
`;

export default schema;
