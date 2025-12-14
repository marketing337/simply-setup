import { db } from "../server/db.js";
import { workspaces } from "../shared/schema.js";

async function enableTierPricingForAll() {
  try {
    console.log("Starting to enable 3-tier pricing for all workspaces...");

    // Update all workspaces with 3-tier pricing
    const result = await db
      .update(workspaces)
      .set({
        enableTieredPricing: true,
        tier1Name: "Business Address",
        tier1Price: "699",
        tier1Description:
          "Professional business address for your company registration and correspondence",
        tier1Features: ["Business Address", "Mail Handling"],

        tier2Name: "GST Registration",
        tier2Price: "999",
        tier2Description:
          "Complete GST registration package with business address and tax compliance support",
        tier2Features: [
          "GST Registration",
          "Business Address",
          "Tax Compliance",
          "Government Liaison",
          "Document Support",
        ],

        // Leave tier3 empty for now as user only specified 2 tiers
        tier3Name: null,
        tier3Price: null,
        tier3Description: null,
        tier3Features: [],

        updatedAt: new Date(),
      })
      .returning();

    console.log(
      `Successfully updated ${result.length} workspaces with 3-tier pricing!`,
    );
    console.log("Pricing structure applied:");
    console.log("- Tier 1: Business Address - ₹699/month");
    console.log("- Tier 2: GST Registration - ₹999/month");

    return result;
  } catch (error) {
    console.error("Error updating workspaces:", error);
    throw error;
  }
}

// Run the update
enableTierPricingForAll()
  .then(() => {
    console.log("✅ All workspaces have been updated with 3-tier pricing!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to update workspaces:", error);
    process.exit(1);
  });
