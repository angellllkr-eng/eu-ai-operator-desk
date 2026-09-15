import { Hono } from "hono";
import { Mppx, tempo } from "mppx/server";
import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { paymentMiddleware } from "@x402/hono";

interface Env {
  MPP_SECRET_KEY: string;
  PAYMENT_RECIPIENT: `0x${string}`;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/health", (c) =>
  c.json({
    service: "eu-ai-operator-desk-payments",
    status: "ok",
    mpp: true,
    x402: true,
    environment: "testnet-until-promoted",
  }),
);

app.all("/mpp/brief", async (c) => {
  if (!c.env.MPP_SECRET_KEY || !c.env.PAYMENT_RECIPIENT) {
    return c.json({ error: "payment gateway not configured" }, 503);
  }

  const mpp = Mppx.create({
    methods: [
      tempo({
        recipient: c.env.PAYMENT_RECIPIENT,
        // Tempo testnet/default currency is intentionally used until production approval.
      }),
    ],
    secretKey: c.env.MPP_SECRET_KEY,
  });

  const response = await mpp.charge({ amount: "0.01" })(c.req.raw);
  if (response.status === 402) return response.challenge;

  return response.withReceipt(
    Response.json({
      product: "eu-ai-operator-desk",
      resource: "operator-brief",
      delivery: "evidence-led qualification brief",
      next: "handoff-to-mindreply",
    }),
  );
});

app.use("/x402/brief", async (c, next) => {
  if (!c.env.PAYMENT_RECIPIENT) {
    return c.json({ error: "payment gateway not configured" }, 503);
  }

  const facilitator = new HTTPFacilitatorClient({
    url: "https://x402.org/facilitator",
  });
  const resourceServer = new x402ResourceServer(facilitator);
  registerExactEvmScheme(resourceServer);

  const middleware = paymentMiddleware(
    {
      "GET /x402/brief": {
        accepts: {
          scheme: "exact",
          price: "$0.01",
          network: "eip155:84532",
          payTo: c.env.PAYMENT_RECIPIENT,
          maxTimeoutSeconds: 60,
        },
        description: "One EU AI Operator's Desk evidence brief",
        mimeType: "application/json",
      },
    },
    resourceServer,
  );

  return middleware(c.env as never, c.req.raw, next);
});

app.get("/x402/brief", (c) =>
  c.json({
    product: "eu-ai-operator-desk",
    resource: "operator-brief",
    delivery: "evidence-led qualification brief",
    next: "handoff-to-mindreply",
  }),
);

export default app;
