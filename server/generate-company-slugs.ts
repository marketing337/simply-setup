import { db } from "./db";
import { companies } from "@shared/schema";
import { generateSlug, ensureUniqueSlug } from "./utils/slug-generator";
import { eq } from "drizzle-orm";

async function generateCompanySlugs() {
  console.log("Starting to generate slugs for companies...");
  
  try {
    // Get all companies that don't have slugs
    const companiesWithoutSlugs = await db
      .select()
      .from(companies);
    
    console.log(`Found ${companiesWithoutSlugs.length} companies without slugs`);
    
    // Get existing slugs to ensure uniqueness
    const existingCompanies = await db.select({ slug: companies.slug }).from(companies);
    const existingSlugs = existingCompanies
      .map(c => c.slug)
      .filter(slug => slug !== null) as string[];
    
    let updatedCount = 0;
    
    for (const company of companiesWithoutSlugs) {
      const baseSlug = generateSlug(company.companyName);
      const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);
      
      // Update the company with the new slug
      await db
        .update(companies)
        .set({ 
          slug: uniqueSlug,
          updatedAt: new Date()
        })
        .where(eq(companies.id, company.id));
      
      existingSlugs.push(uniqueSlug);
      updatedCount++;
      
      if (updatedCount % 50 === 0) {
        console.log(`Updated ${updatedCount} companies...`);
      }
    }
    
    console.log(`Successfully generated slugs for ${updatedCount} companies`);
    
    // Add unique constraint for slugs
    try {
      await db.execute(`ALTER TABLE companies ADD CONSTRAINT companies_slug_unique UNIQUE (slug)`);
      console.log("Added unique constraint for company slugs");
    } catch (error) {
      console.log("Unique constraint already exists or error:", error);
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error generating company slugs:", error);
    process.exit(1);
  }
}

generateCompanySlugs();