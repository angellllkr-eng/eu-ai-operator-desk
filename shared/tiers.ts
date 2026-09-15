/**
 * Premium Tier Configuration
 * High-end SaaS pricing for EU AI Operator's Desk
 */

export const tiers = {
  free: {
    name: "Explorer",
    price: 0,
    interval: null,
    stripePriceId: null,
    features: {
      strategy: {
        pestel: true,
        fiveForces: false,
        businessCanvas: false,
        marketReports: 0, // number per month
        regionalData: ["Bulgaria"], // countries
      },
      hardware: {
        configurator: true,
        componentRecommendations: false,
        compatibilityCheck: false,
        exportFormats: ["JSON"],
        builds: 1, // saved configurations
      },
      support: {
        community: true,
        email: false,
        priority: false,
      },
    },
  },

  operator: {
    name: "Operator",
    price: 29,
    interval: "month",
    stripePriceId: "price_operator_monthly", // Set in Stripe dashboard
    description: "For individual researchers, founders, operators",
    features: {
      strategy: {
        pestel: true,
        fiveForces: true,
        businessCanvas: true,
        marketReports: 4, // per month
        regionalData: ["Bulgaria", "Poland", "Germany", "France"],
        customAnalysis: false,
      },
      hardware: {
        configurator: true,
        componentRecommendations: true,
        compatibilityCheck: true,
        exportFormats: ["JSON", "CSV", "PDF"],
        builds: 10,
        costOptimization: true,
      },
      support: {
        community: true,
        email: true,
        priority: false,
        responseTime: "48h",
      },
    },
  },

  sovereign: {
    name: "Sovereign",
    price: 99,
    interval: "month",
    stripePriceId: "price_sovereign_monthly",
    description: "For teams, SMEs, educational institutions",
    features: {
      strategy: {
        pestel: true,
        fiveForces: true,
        businessCanvas: true,
        marketReports: 20,
        regionalData: ["Bulgaria", "Poland", "Germany", "France", "EU-wide"],
        customAnalysis: true,
        consultingHours: 2, // per month
        apiAccess: true,
      },
      hardware: {
        configurator: true,
        componentRecommendations: true,
        compatibilityCheck: true,
        exportFormats: ["JSON", "CSV", "PDF", "HTML"],
        builds: 50,
        costOptimization: true,
        budgetSimulation: true,
        partnerIntegrations: true,
      },
      support: {
        community: true,
        email: true,
        priority: true,
        responseTime: "24h",
        slackChannel: true,
      },
    },
  },

  enterprise: {
    name: "Enterprise",
    price: null, // Custom pricing
    interval: "year",
    stripePriceId: null,
    description: "For large organizations, governments, enterprises",
    features: {
      strategy: {
        pestel: true,
        fiveForces: true,
        businessCanvas: true,
        marketReports: "unlimited",
        regionalData: "all",
        customAnalysis: true,
        consultingHours: "unlimited",
        apiAccess: true,
        dataExport: true,
        whiteLabel: true,
      },
      hardware: {
        configurator: true,
        componentRecommendations: true,
        compatibilityCheck: true,
        exportFormats: ["all"],
        builds: "unlimited",
        costOptimization: true,
        budgetSimulation: true,
        partnerIntegrations: true,
        customComponents: true,
        dedicatedAccount: true,
      },
      support: {
        community: true,
        email: true,
        priority: true,
        responseTime: "4h",
        slackChannel: true,
        dedicatedManager: true,
        quarterlyReviews: true,
      },
    },
  },
};

export const upgradePrompts = {
  strategy: {
    fiveForces:
      "Unlock Five Forces analysis to understand competitive dynamics in your market.",
    businessCanvas:
      "Create a complete Business Model Canvas with Sovereign tier.",
    customAnalysis:
      "Get custom market analysis tailored to your specific region and use case.",
    regionalData:
      "Expand to 4 EU regions with Operator tier, or all regions with Sovereign.",
  },
  hardware: {
    recommendations:
      "Get AI-powered component recommendations based on your workload.",
    costOptimization:
      "Unlock cost optimization engine to find the best price-to-performance ratio.",
    exportPDF:
      "Export your configuration as a professional PDF specification sheet.",
  },
};
