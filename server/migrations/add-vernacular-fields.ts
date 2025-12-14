import { db } from "../db";
import { sql } from "drizzle-orm";

export async function addVernacularFields() {
  try {
    console.log("Adding vernacular fields to locations table...");
    
    // Check if columns already exist
    const checkResult = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'locations'
      AND column_name IN ('vernacular_salutation', 'vernacular_language', 'vernacular_translation')
    `);
    
    const existingColumns = checkResult.rows.map((row: any) => row.column_name);
    
    // Add vernacular_salutation column if it doesn't exist
    if (!existingColumns.includes('vernacular_salutation')) {
      await db.execute(sql`
        ALTER TABLE locations 
        ADD COLUMN IF NOT EXISTS vernacular_salutation TEXT
      `);
      console.log("Added vernacular_salutation column");
    }
    
    // Add vernacular_language column if it doesn't exist
    if (!existingColumns.includes('vernacular_language')) {
      await db.execute(sql`
        ALTER TABLE locations 
        ADD COLUMN IF NOT EXISTS vernacular_language TEXT
      `);
      console.log("Added vernacular_language column");
    }
    
    // Add vernacular_translation column if it doesn't exist
    if (!existingColumns.includes('vernacular_translation')) {
      await db.execute(sql`
        ALTER TABLE locations 
        ADD COLUMN IF NOT EXISTS vernacular_translation TEXT
      `);
      console.log("Added vernacular_translation column");
    }
    
    console.log("Vernacular fields added successfully");
  } catch (error) {
    console.error("Error adding vernacular fields:", error);
    throw error;
  }
}