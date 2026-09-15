/**
 * Affiliate & Sponsor Configuration
 * High-performing monetization: hardware commissions + sponsorships
 */

export const affiliatePrograms = {
  amazon: {
    name: "Amazon Associates",
    commission: 0.05, // 5%
    trackingId: "YOUR_AMAZON_TRACKING_ID",
    baseUrl: "https://amazon.com",
    categories: ["hardware", "components", "cooling", "storage"],
  },
  newegg: {
    name: "Newegg Affiliate",
    commission: 0.04, // 4%
    trackingId: "YOUR_NEWEGG_TRACKING_ID",
    baseUrl: "https://newegg.com",
    categories: ["hardware", "components"],
  },
  bhphoto: {
    name: "B&H Photo",
    commission: 0.03, // 3%
    trackingId: "YOUR_BH_TRACKING_ID",
    baseUrl: "https://bhphotovideo.com",
    categories: ["hardware", "professional"],
  },
};

export const sponsorTiers = {
  bronze: {
    name: "Bronze Sponsor",
    price: 500, // USD/month
    slots: 2,
    placement: ["sidebar"],
    impressions: "100k+/month",
    features: {
      logo: true,
      link: true,
      description: false,
      featuredPost: false,
    },
  },
  silver: {
    name: "Silver Sponsor",
    price: 1000,
    slots: 1,
    placement: ["sidebar", "footer", "featured section"],
    impressions: "500k+/month",
    features: {
      logo: true,
      link: true,
      description: true,
      featuredPost: false,
    },
  },
  gold: {
    name: "Gold Sponsor",
    price: 2000,
    slots: 1,
    placement: ["sidebar", "footer", "featured section", "homepage"],
    impressions: "1M+/month",
    features: {
      logo: true,
      link: true,
      description: true,
      featuredPost: true,
      customIntegration: true,
    },
  },
};

export const sponsorCategories = [
  {
    name: "GPU & Compute",
    examples: ["Nvidia", "AMD", "Vast.ai", "Lambda Labs", "Crusoe Energy"],
    monthlyBudget: "$2,000-$5,000",
  },
  {
    name: "Cloud & Infrastructure",
    examples: ["AWS", "Azure", "DigitalOcean", "Linode", "Hetzner"],
    monthlyBudget: "$1,500-$3,000",
  },
  {
    name: "Software & Tools",
    examples: ["n8n", "Make", "Zapier", "Anyscale", "Ray", "LlamaIndex"],
    monthlyBudget: "$1,000-$2,500",
  },
  {
    name: "Storage & Data",
    examples: ["Backblaze", "Wasabi", "Ceph", "MinIO", "Storj"],
    monthlyBudget: "$500-$1,500",
  },
  {
    name: "Cooling & Hardware",
    examples: ["Noctua", "Corsair", "Seasonic", "Be Quiet", "EKWB"],
    monthlyBudget: "$500-$1,000",
  },
  {
    name: "Education & Training",
    examples: ["Coursera", "DataCamp", "Fast.ai", "Hugging Face", "Cohere"],
    monthlyBudget: "$500-$1,500",
  },
];

export const affiliateComponentLinks = {
  // CPU recommendations with affiliate links
  cpus: [
    {
      name: "AMD Ryzen 7 7800X3D",
      amazon: "https://amazon.com/s?k=AMD+Ryzen+7+7800X3D",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "focused",
    },
    {
      name: "Intel Core i9-14900K",
      amazon: "https://amazon.com/s?k=Intel+i9-14900K",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "focused",
    },
    {
      name: "AMD Threadripper Pro 5995WX",
      amazon: "https://amazon.com/s?k=Threadripper+Pro+5995WX",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "parallel",
    },
  ],

  // GPU recommendations
  gpus: [
    {
      name: "RTX 4090",
      amazon: "https://amazon.com/s?k=RTX+4090",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "parallel",
    },
    {
      name: "RTX 4070 Super",
      amazon: "https://amazon.com/s?k=RTX+4070+Super",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "focused",
    },
  ],

  // Memory
  memory: [
    {
      name: "32GB DDR5-6000",
      amazon: "https://amazon.com/s?k=32GB+DDR5+6000",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "focused",
    },
  ],

  // Storage
  storage: [
    {
      name: "2TB Samsung 990 Pro",
      amazon: "https://amazon.com/s?k=Samsung+990+Pro+2TB",
      newegg: "https://newegg.com/p/",
      bhphoto: "https://bhphotovideo.com/c/product/",
      tier: "focused",
    },
  ],
};
