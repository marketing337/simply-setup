import { db } from "./db";
import { docukitCategories, docukitTemplates } from "@shared/schema";

export async function seedDocuKit() {
  console.log("🌱 Seeding DocuKit data...");

  try {
    // Seed categories
    const categories = [
      {
        name: "HR & Employee Management",
        slug: "hr",
        description: "Essential HR documents for employee management, policies, and procedures",
        isActive: true,
      },
      {
        name: "Legal & Compliance",
        slug: "legal",
        description: "Legal agreements, contracts, and compliance documents for businesses",
        isActive: true,
      },
      {
        name: "Finance & Accounting",
        slug: "finance",
        description: "Financial templates, invoices, and accounting documents",
        isActive: true,
      },
      {
        name: "Business Operations",
        slug: "operations",
        description: "Standard operating procedures and business process documents",
        isActive: true,
      },
      {
        name: "Marketing & Sales",
        slug: "marketing",
        description: "Marketing materials, sales documents, and promotional templates",
        isActive: true,
      },
    ];

    // Insert categories and get their IDs
    const insertedCategories = await db.insert(docukitCategories).values(categories).returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Find HR category ID for templates
    const hrCategory = insertedCategories.find(cat => cat.slug === "hr");
    const legalCategory = insertedCategories.find(cat => cat.slug === "legal");
    const financeCategory = insertedCategories.find(cat => cat.slug === "finance");

    if (!hrCategory || !legalCategory || !financeCategory) {
      console.error("❌ Required categories not found");
      return;
    }

    // Seed templates
    const templates = [
      // HR Templates
      {
        title: "Employee Handbook Template",
        slug: "employee-handbook",
        description: "Comprehensive employee handbook template covering company policies, procedures, and guidelines",
        downloadUrl: "https://example.com/templates/employee-handbook.pdf",
        previewUrl: "https://example.com/previews/employee-handbook.jpg",
        categoryId: hrCategory.id,
        formats: ["PDF", "DOCX"],
        features: ["Customizable", "Professional Design", "Legal Compliance", "Easy to Edit"],
        rating: "4.8",
        downloadCount: 1250,
        ratingCount: 89,
        isActive: true,
        isPopular: true,
      },
      {
        title: "Offer Letter Template",
        slug: "offer-letter",
        description: "Professional job offer letter template with standard terms and conditions",
        downloadUrl: "https://example.com/templates/offer-letter.pdf",
        categoryId: hrCategory.id,
        formats: ["PDF", "DOCX", "DOC"],
        features: ["Ready to Use", "Professional Format", "Legally Sound"],
        rating: "4.7",
        downloadCount: 892,
        ratingCount: 67,
        isActive: true,
        isPopular: false,
      },
      {
        title: "Performance Appraisal Form",
        slug: "performance-appraisal",
        description: "Structured performance evaluation form for annual employee reviews",
        downloadUrl: "https://example.com/templates/performance-appraisal.pdf",
        categoryId: hrCategory.id,
        formats: ["PDF", "XLSX"],
        features: ["Comprehensive Metrics", "Goal Tracking", "360-Degree Feedback"],
        rating: "4.6",
        downloadCount: 567,
        ratingCount: 45,
        isActive: true,
        isPopular: false,
      },
      // Legal Templates
      {
        title: "Non-Disclosure Agreement (NDA)",
        slug: "nda-template",
        description: "Standard NDA template for protecting confidential business information",
        downloadUrl: "https://example.com/templates/nda.pdf",
        categoryId: legalCategory.id,
        formats: ["PDF", "DOCX"],
        features: ["Legally Binding", "Mutual Protection", "Industry Standard"],
        rating: "4.9",
        downloadCount: 2134,
        ratingCount: 156,
        isActive: true,
        isPopular: true,
      },
      {
        title: "Service Agreement Template",
        slug: "service-agreement",
        description: "Comprehensive service agreement template for client engagements",
        downloadUrl: "https://example.com/templates/service-agreement.pdf",
        categoryId: legalCategory.id,
        formats: ["PDF", "DOCX"],
        features: ["Customizable Terms", "Payment Protection", "Scope Definition"],
        rating: "4.5",
        downloadCount: 743,
        ratingCount: 52,
        isActive: true,
        isPopular: false,
      },
      // Finance Templates
      {
        title: "Invoice Template",
        slug: "invoice-template",
        description: "Professional invoice template with GST compliance for Indian businesses",
        downloadUrl: "https://example.com/templates/invoice.pdf",
        categoryId: financeCategory.id,
        formats: ["PDF", "XLSX", "DOCX"],
        features: ["GST Compliant", "Auto Calculations", "Professional Design"],
        rating: "4.7",
        downloadCount: 1567,
        ratingCount: 98,
        isActive: true,
        isPopular: true,
      },
    ];

    // Insert templates
    const insertedTemplates = await db.insert(docukitTemplates).values(templates).returning();
    console.log(`✅ Inserted ${insertedTemplates.length} templates`);

    console.log("✅ DocuKit seeding completed successfully");
    
  } catch (error) {
    console.error("❌ Error seeding DocuKit data:", error);
  }
}