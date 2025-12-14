import { seedDocuKit } from "./seed-docukit";

async function runSeed() {
  try {
    await seedDocuKit();
    console.log("DocuKit seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DocuKit:", error);
    process.exit(1);
  }
}

runSeed();