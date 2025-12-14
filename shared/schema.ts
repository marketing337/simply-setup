import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  heroImage: text("hero_image"),
  officeImage: text("office_image"),
  mainAddress: text("main_address").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email").notNull(),
  vernacularSalutation: text("vernacular_salutation"),
  vernacularLanguage: text("vernacular_language"),
  vernacularTranslation: text("vernacular_translation"),
  countryCode: text("country_code").default("IN").notNull(), // IN for India, SG for Singapore
  currencyCode: text("currency_code").default("INR").notNull(), // INR for India, SGD for Singapore
  countryName: text("country_name").default("India").notNull(),
});

export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  logo: text("logo"),
  colorCode: text("color_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const offices = pgTable("offices", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  image: text("image"),
  features: text("features").array(),
  badge: text("badge"),
  badgeColor: text("badge_color"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  name: text("name").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  avatar: text("avatar"),
  rating: integer("rating").notNull(),
});

export const areas = pgTable("areas", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  heroImage: text("hero_image"),
  address: text("address").notNull(),
  zipCode: text("zip_code"),
  mapCoordinates: text("map_coordinates"),
  features: text("features").array(),
  isPopular: boolean("is_popular").default(false),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  youtubeVideoId: text("youtube_video_id"), // Store YouTube video ID for embedding
  authorId: integer("author_id").notNull().references(() => authors.id),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  tags: text("tags").array().default([]).notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const capturedUrls = pgTable("captured_urls", {
  id: serial("id").primaryKey(),
  blogPostId: integer("blog_post_id").notNull().references(() => blogPosts.id),
  url: text("url").notNull(),
  domain: text("domain").notNull(),
  linkText: text("link_text"),
  linkType: text("link_type").notNull(),
  isNoFollow: boolean("is_no_follow").default(false).notNull(),
  isSponsored: boolean("is_sponsored").default(false).notNull(),
  status: text("status").default("active").notNull(),
  lastChecked: timestamp("last_checked"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  photo: text("photo"),
  qualification: text("qualification"),
  yearsOfExperience: integer("years_of_experience"),
  bio: text("bio"),
  email: text("email"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const salesPersons = pgTable("sales_persons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  avatar: text("avatar"),
  designation: text("designation").notNull(),
  bio: text("bio"),
  locationId: integer("location_id").references(() => locations.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  areaId: integer("area_id").references(() => areas.id),
  vendorId: integer("vendor_id").references(() => vendors.id),
  address: text("address").notNull(),
  mapCoordinates: text("map_coordinates"),
  
  // Legacy single pricing
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }),
  
  // 3-Tier Pricing Structure
  tier1Name: text("tier1_name"),
  tier1Price: decimal("tier1_price", { precision: 10, scale: 2 }),
  tier1Features: text("tier1_features").array(),
  tier1Description: text("tier1_description"),
  
  tier2Name: text("tier2_name"),
  tier2Price: decimal("tier2_price", { precision: 10, scale: 2 }),
  tier2Features: text("tier2_features").array(),
  tier2Description: text("tier2_description"),
  
  tier3Name: text("tier3_name"),
  tier3Price: decimal("tier3_price", { precision: 10, scale: 2 }),
  tier3Features: text("tier3_features").array(),
  tier3Description: text("tier3_description"),
  
  enableTieredPricing: boolean("enable_tiered_pricing").default(false).notNull(),
  
  amenities: text("amenities").array().default([]),
  features: text("features").array().default([]),
  images: text("images").array().default([]),
  imageAltTexts: text("image_alt_texts").array().default([]),
  mainImage: text("main_image"),
  contactPerson: text("contact_person"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  isActive: boolean("is_active").default(true).notNull(),
  status: text("status", { enum: ["available", "occupied", "maintenance", "coming_soon"] }).default("available").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pricingCatalog = pgTable("pricing_catalog", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  serviceName: text("service_name").notNull(),
  serviceDescription: text("service_description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR").notNull(),
  duration: text("duration").notNull(),
  features: text("features").array().default([]),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  pricingCatalogId: integer("pricing_catalog_id").notNull().references(() => pricingCatalog.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR").notNull(),
  status: text("status").default("created").notNull(),
  paymentId: text("payment_id"),
  razorpaySignature: text("razorpay_signature"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const docukitCategories = pgTable("docukit_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon"),
  color: text("color"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const docukitTemplates = pgTable("docukit_templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull().references(() => docukitCategories.id),
  downloadUrl: text("download_url").notNull(),
  previewUrl: text("preview_url"),
  formats: text("formats").array().default([]).notNull(),
  features: text("features").array().default([]).notNull(),
  downloadCount: integer("download_count").default(0).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00").notNull(),
  ratingCount: integer("rating_count").default(0).notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  cin: text("cin").notNull().unique(),
  companyName: text("company_name").notNull(),
  slug: text("slug").notNull().unique(),
  companyROCcode: text("company_roc_code"),
  companyCategory: text("company_category"),
  companySubCategory: text("company_sub_category"),
  companyClass: text("company_class"),
  authorizedCapital: decimal("authorized_capital", { precision: 15, scale: 2 }),
  paidupCapital: decimal("paidup_capital", { precision: 15, scale: 2 }),
  registrationDate: text("registration_date"),
  registeredOfficeAddress: text("registered_office_address"),
  listingStatus: text("listing_status"),
  companyStatus: text("company_status"),
  companyStateCode: text("company_state_code"),
  companyType: text("company_type"), // Indian/Foreign Company
  nicCode: text("nic_code"),
  companyIndustrialClassification: text("company_industrial_classification"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companySearchHistory = pgTable("company_search_history", {
  id: serial("id").primaryKey(),
  cin: text("cin").notNull(),
  companyName: text("company_name"),
  status: text("status"),
  registrationDate: text("registration_date"),
  category: text("category"),
  subCategory: text("sub_category"),
  classOfCompany: text("class_of_company"),
  authorizedCapital: text("authorized_capital"),
  paidUpCapital: text("paid_up_capital"),
  numberOfMembers: text("number_of_members"),
  address: text("address"),
  state: text("state"),
  country: text("country"),
  email: text("email"),
  website: text("website"),
  lastAGMDate: text("last_agm_date"),
  lastAccountsDate: text("last_accounts_date"),
  directors: text("directors").array().default([]),
  searchedAt: timestamp("searched_at").defaultNow().notNull(),
  apiResponse: text("api_response"),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  cardType: text("card_type").notNull().default("notice"), // notice, due_date
  type: text("type").notNull().default("info"), // info, warning, success, error
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  targetUrl: text("target_url"), // Optional link to navigate to
  targetType: text("target_type"), // service, page, external
  isActive: boolean("is_active").default(true).notNull(),
  publishedDate: timestamp("published_date").defaultNow().notNull(),
  dueDate: timestamp("due_date"), // For due_date cards
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"), // Optional end date
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SimplySetup/Comply User System Tables
export const complyUsers = pgTable("comply_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  companyName: text("company_name"),
  gstin: text("gstin").unique(),
  panNumber: text("pan_number"),
  isVerified: boolean("is_verified").default(false).notNull(),
  profileCompleted: boolean("profile_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gstCertificates = pgTable("gst_certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => complyUsers.id, { onDelete: "cascade" }),
  gstin: text("gstin").notNull(),
  businessName: text("business_name").notNull(),
  legalName: text("legal_name"),
  tradeName: text("trade_name"),
  registrationDate: text("registration_date"),
  constitutionOfBusiness: text("constitution_of_business"),
  address: text("address"),
  state: text("state"),
  pinCode: text("pin_code"),
  certificateUrl: text("certificate_url").notNull(),
  originalFileName: text("original_file_name").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  status: text("status", { enum: ["pending", "verified", "rejected"] }).default("pending").notNull(),
  verificationNotes: text("verification_notes"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  verifiedAt: timestamp("verified_at"),
});

export const gstFilings = pgTable("gst_filings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => complyUsers.id, { onDelete: "cascade" }),
  gstin: text("gstin").notNull(),
  returnType: text("return_type").notNull(), // GSTR-1, GSTR-3B, etc.
  taxPeriod: text("tax_period").notNull(), // MM-YYYY format
  dueDate: timestamp("due_date").notNull(),
  filingDate: timestamp("filing_date"),
  status: text("status", { enum: ["not_filed", "filed", "late_filed", "overdue"] }).default("not_filed").notNull(),
  arn: text("arn"), // Acknowledgment Reference Number
  grossTurnover: decimal("gross_turnover", { precision: 15, scale: 2 }),
  igst: decimal("igst", { precision: 15, scale: 2 }),
  cgst: decimal("cgst", { precision: 15, scale: 2 }),
  sgst: decimal("sgst", { precision: 15, scale: 2 }),
  cess: decimal("cess", { precision: 15, scale: 2 }),
  totalTax: decimal("total_tax", { precision: 15, scale: 2 }),
  penalties: decimal("penalties", { precision: 15, scale: 2 }).default("0.00"),
  interestAmount: decimal("interest_amount", { precision: 15, scale: 2 }).default("0.00"),
  notes: text("notes"),
  reminderSent: boolean("reminder_sent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gstReminders = pgTable("gst_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => complyUsers.id, { onDelete: "cascade" }),
  filingId: integer("filing_id").notNull().references(() => gstFilings.id, { onDelete: "cascade" }),
  reminderType: text("reminder_type", { enum: ["7_days", "3_days", "1_day", "overdue"] }).notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  sentAt: timestamp("sent_at"),
  status: text("status", { enum: ["scheduled", "sent", "failed"] }).default("scheduled").notNull(),
  method: text("method", { enum: ["email", "sms", "whatsapp"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Services Module Tables
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "GST Registration", "Singapore Company Registration"
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  country: text("country").notNull(), // India, Singapore, etc.
  countryCode: text("country_code").notNull(), // IN, SG, etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull(), // INR, SGD, USD
  processingTime: text("processing_time").notNull(), // e.g., "7-10 business days"
  features: text("features").array().default([]).notNull(),
  requirements: text("requirements").array().default([]).notNull(),
  category: text("category").notNull(), // e.g., "Registration", "Compliance", "Tax"
  isActive: boolean("is_active").default(true).notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  heroImage: text("hero_image"),
  
  // Enhanced Service Page Content Structure
  // Overview Section
  overviewTitle: text("overview_title"),
  overviewContent: text("overview_content"),
  overviewHighlights: text("overview_highlights").array().default([]),
  
  // Types Section
  typesTitle: text("types_title"),
  typesContent: text("types_content"),
  serviceTypes: text("service_types").array().default([]),
  
  // Eligibility Section
  eligibilityTitle: text("eligibility_title"),
  eligibilityContent: text("eligibility_content"),
  eligibilityCriteria: text("eligibility_criteria").array().default([]),
  
  // Documents Required Section
  documentsTitle: text("documents_title"),
  documentsContent: text("documents_content"),
  requiredDocuments: text("required_documents").array().default([]),
  
  // Process Section
  processTitle: text("process_title"),
  processContent: text("process_content"),
  processSteps: text("process_steps").array().default([]),
  
  // Fees Section
  feesTitle: text("fees_title"),
  feesContent: text("fees_content"),
  feeStructure: text("fee_structure").array().default([]),
  
  // Benefits Section
  benefitsTitle: text("benefits_title"),
  benefitsContent: text("benefits_content"),
  benefits: text("benefits").array().default([]),
  
  // Comparison Section
  comparisonTitle: text("comparison_title"),
  comparisonContent: text("comparison_content"),
  comparisonTable: text("comparison_table"), // JSON string for structured comparison data
  
  // Compliance Section
  complianceTitle: text("compliance_title"),
  complianceContent: text("compliance_content"),
  complianceRequirements: text("compliance_requirements").array().default([]),
  
  // Certificate Section
  certificateTitle: text("certificate_title"),
  certificateContent: text("certificate_content"),
  certificateDetails: text("certificate_details").array().default([]),
  
  // SEO and Meta Information
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords").array().default([]),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const serviceOrders = pgTable("service_orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerCompany: text("customer_company"),
  formData: text("form_data").notNull(), // JSON string of form responses
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull(),
  paymentMethod: text("payment_method").notNull(), // razorpay, stripe
  paymentStatus: text("payment_status", { enum: ["pending", "paid", "failed", "refunded"] }).default("pending").notNull(),
  orderStatus: text("order_status", { enum: ["pending", "processing", "completed", "cancelled"] }).default("pending").notNull(),
  paymentId: text("payment_id"),
  paymentIntentId: text("payment_intent_id"), // For Stripe
  razorpayOrderId: text("razorpay_order_id"), // For Razorpay
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dynamicPages = pgTable("dynamic_pages", {
  id: serial("id").primaryKey(),
  areaName: text("area_name").notNull(),
  cityName: text("city_name").notNull(),
  purpose: text("purpose").notNull(),
  slug: text("slug").notNull().unique(),
  overviewContent: text("overview_content").notNull(),
  benefitsContent: text("benefits_content").notNull(),
  whyUsContent: text("why_us_content").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const salesPersonRelations = relations(salesPersons, ({ one }) => ({
  location: one(locations, {
    fields: [salesPersons.locationId],
    references: [locations.id],
  }),
}));

export const locationRelations = relations(locations, ({ many }) => ({
  offices: many(offices),
  testimonials: many(testimonials),
  areas: many(areas),
  workspaces: many(workspaces),
  salesPersons: many(salesPersons),
}));

export const officeRelations = relations(offices, ({ one }) => ({
  location: one(locations, {
    fields: [offices.locationId],
    references: [locations.id],
  }),
}));

export const testimonialRelations = relations(testimonials, ({ one }) => ({
  location: one(locations, {
    fields: [testimonials.locationId],
    references: [locations.id],
  }),
}));

export const areaRelations = relations(areas, ({ one }) => ({
  location: one(locations, {
    fields: [areas.locationId],
    references: [locations.id],
  }),
}));

export const authorRelations = relations(authors, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(authors, {
    fields: [blogPosts.authorId],
    references: [authors.id],
  }),
  capturedUrls: many(capturedUrls),
}));

export const capturedUrlRelations = relations(capturedUrls, ({ one }) => ({
  blogPost: one(blogPosts, {
    fields: [capturedUrls.blogPostId],
    references: [blogPosts.id],
  }),
}));

export const workspaceRelations = relations(workspaces, ({ one }) => ({
  location: one(locations, {
    fields: [workspaces.locationId],
    references: [locations.id],
  }),
  area: one(areas, {
    fields: [workspaces.areaId],
    references: [areas.id],
  }),
  vendor: one(vendors, {
    fields: [workspaces.vendorId],
    references: [vendors.id],
  }),
}));

export const vendorRelations = relations(vendors, ({ many }) => ({
  workspaces: many(workspaces),
}));

export const userRelations = relations(users, ({ many }) => ({
  posts: many(blogPosts),
}));

export const pricingCatalogRelations = relations(pricingCatalog, ({ one, many }) => ({
  location: one(locations, {
    fields: [pricingCatalog.locationId],
    references: [locations.id],
  }),
  orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one }) => ({
  location: one(locations, {
    fields: [orders.locationId],
    references: [locations.id],
  }),
  pricingCatalog: one(pricingCatalog, {
    fields: [orders.pricingCatalogId],
    references: [pricingCatalog.id],
  }),
}));

export const docukitCategoryRelations = relations(docukitCategories, ({ many }) => ({
  templates: many(docukitTemplates),
}));

export const docukitTemplateRelations = relations(docukitTemplates, ({ one }) => ({
  category: one(docukitCategories, {
    fields: [docukitTemplates.categoryId],
    references: [docukitCategories.id],
  }),
}));

// SimplySetup/Comply Relations
export const complyUserRelations = relations(complyUsers, ({ many }) => ({
  gstCertificates: many(gstCertificates),
  gstFilings: many(gstFilings),
  gstReminders: many(gstReminders),
}));

export const gstCertificateRelations = relations(gstCertificates, ({ one }) => ({
  user: one(complyUsers, {
    fields: [gstCertificates.userId],
    references: [complyUsers.id],
  }),
}));

export const gstFilingRelations = relations(gstFilings, ({ one, many }) => ({
  user: one(complyUsers, {
    fields: [gstFilings.userId],
    references: [complyUsers.id],
  }),
  reminders: many(gstReminders),
}));

export const gstReminderRelations = relations(gstReminders, ({ one }) => ({
  user: one(complyUsers, {
    fields: [gstReminders.userId],
    references: [complyUsers.id],
  }),
  filing: one(gstFilings, {
    fields: [gstReminders.filingId],
    references: [gstFilings.id],
  }),
}));

// Services Module Relations
export const serviceRelations = relations(services, ({ many }) => ({
  orders: many(serviceOrders),
}));

export const serviceOrderRelations = relations(serviceOrders, ({ one }) => ({
  service: one(services, {
    fields: [serviceOrders.serviceId],
    references: [services.id],
  }),
}));



// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
  slug: true,
  description: true,
  heroImage: true,
  officeImage: true,
  mainAddress: true,
  phoneNumber: true,
  email: true,
  vernacularSalutation: true,
  vernacularLanguage: true,
  vernacularTranslation: true,
});

export const insertOfficeSchema = createInsertSchema(offices).pick({
  locationId: true,
  name: true,
  address: true,
  image: true,
  features: true,
  badge: true,
  badgeColor: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  locationId: true,
  name: true,
  company: true,
  content: true,
  avatar: true,
  rating: true,
});

export const insertAreaSchema = createInsertSchema(areas).pick({
  locationId: true,
  name: true,
  slug: true,
  description: true,
  heroImage: true,
  address: true,
  zipCode: true,
  mapCoordinates: true,
  features: true,
  isPopular: true,
});

export const insertAuthorSchema = createInsertSchema(authors).pick({
  name: true,
  photo: true,
  qualification: true,
  yearsOfExperience: true,
  bio: true,
  email: true,
  isActive: true,
});

export const insertSalesPersonSchema = createInsertSchema(salesPersons).pick({
  name: true,
  email: true,
  phone: true,
  avatar: true,
  designation: true,
  bio: true,
  locationId: true,
  isActive: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .pick({
    title: true,
    slug: true,
    excerpt: true,
    content: true,
    featuredImage: true,
    youtubeVideoId: true,
    authorId: true,
    published: true,
    tags: true,
    metaTitle: true,
    metaDescription: true,
  })
  .extend({
    publishedAt: z.date().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertCapturedUrlSchema = createInsertSchema(capturedUrls)
  .pick({
    blogPostId: true,
    url: true,
    domain: true,
    linkText: true,
    linkType: true,
    isNoFollow: true,
    isSponsored: true,
    status: true,
    lastChecked: true,
  })
  .extend({
    linkType: z.enum(['internal', 'external', 'inbound', 'outbound']),
    status: z.enum(['active', 'broken', 'redirected']).optional().default('active'),
    isNoFollow: z.boolean().optional().default(false),
    isSponsored: z.boolean().optional().default(false),
    lastChecked: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertVendorSchema = createInsertSchema(vendors)
  .pick({
    name: true,
    slug: true,
    description: true,
    logo: true,
    colorCode: true,
  })
  .extend({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertWorkspaceSchema = createInsertSchema(workspaces)
  .pick({
    name: true,
    slug: true,
    description: true,
    locationId: true,
    areaId: true,
    vendorId: true,
    address: true,
    mapCoordinates: true,
    monthlyPrice: true,
    tier1Name: true,
    tier1Price: true,
    tier1Features: true,
    tier1Description: true,
    tier2Name: true,
    tier2Price: true,
    tier2Features: true,
    tier2Description: true,
    tier3Name: true,
    tier3Price: true,
    tier3Features: true,
    tier3Description: true,
    enableTieredPricing: true,
    amenities: true,
    features: true,
    images: true,
    mainImage: true,
    contactPerson: true,
    contactEmail: true,
    contactPhone: true,
    isActive: true,
    status: true,
  })
  .extend({
    monthlyPrice: z.union([z.string(), z.number()]).optional(),
    tier1Price: z.union([z.string(), z.number()]).optional(),
    tier2Price: z.union([z.string(), z.number()]).optional(),
    tier3Price: z.union([z.string(), z.number()]).optional(),
    amenities: z.array(z.string()).optional().default([]),
    features: z.array(z.string()).optional().default([]),
    images: z.array(z.string()).optional().default([]),
    tier1Features: z.array(z.string()).optional().default([]),
    tier2Features: z.array(z.string()).optional().default([]),
    tier3Features: z.array(z.string()).optional().default([]),
    vendorId: z.number().optional(),
    isActive: z.boolean().optional().default(true),
    enableTieredPricing: z.boolean().optional().default(false),
    status: z.enum(['available', 'occupied', 'maintenance', 'coming_soon']).optional().default('available'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertPricingCatalogSchema = createInsertSchema(pricingCatalog)
  .pick({
    locationId: true,
    serviceName: true,
    serviceDescription: true,
    price: true,
    currency: true,
    duration: true,
    features: true,
    isActive: true,
  })
  .extend({
    price: z.union([z.string(), z.number()]),
    currency: z.string().optional().default("INR"),
    features: z.array(z.string()).optional().default([]),
    isActive: z.boolean().optional().default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertOrderSchema = createInsertSchema(orders)
  .pick({
    orderId: true,
    locationId: true,
    pricingCatalogId: true,
    customerName: true,
    customerEmail: true,
    customerPhone: true,
    amount: true,
    currency: true,
    status: true,
    paymentId: true,
    razorpaySignature: true,
  })
  .extend({
    amount: z.union([z.string(), z.number()]),
    currency: z.string().optional().default("INR"),
    status: z.enum(['created', 'paid', 'failed', 'cancelled']).optional().default('created'),
    paymentId: z.string().optional(),
    razorpaySignature: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertDocukitCategorySchema = createInsertSchema(docukitCategories)
  .pick({
    name: true,
    slug: true,
    description: true,
    icon: true,
    color: true,
    isActive: true,
  })
  .extend({
    isActive: z.boolean().optional().default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertDocukitTemplateSchema = createInsertSchema(docukitTemplates)
  .pick({
    title: true,
    slug: true,
    description: true,
    categoryId: true,
    downloadUrl: true,
    previewUrl: true,
    formats: true,
    features: true,
    downloadCount: true,
    rating: true,
    ratingCount: true,
    isPopular: true,
    isActive: true,
  })
  .extend({
    formats: z.array(z.string()).optional().default([]),
    features: z.array(z.string()).optional().default([]),
    downloadCount: z.number().optional().default(0),
    rating: z.union([z.string(), z.number()]).optional().default("0.00"),
    ratingCount: z.number().optional().default(0),
    isPopular: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
    previewUrl: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertCompanySchema = createInsertSchema(companies)
  .pick({
    cin: true,
    companyName: true,
    slug: true,
    companyROCcode: true,
    companyCategory: true,
    companySubCategory: true,
    companyClass: true,
    authorizedCapital: true,
    paidupCapital: true,
    registrationDate: true,
    registeredOfficeAddress: true,
    listingStatus: true,
    companyStatus: true,
    companyStateCode: true,
    companyType: true,
    nicCode: true,
    companyIndustrialClassification: true,
  })
  .extend({
    authorizedCapital: z.union([z.string(), z.number()]).optional(),
    paidupCapital: z.union([z.string(), z.number()]).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

// SimplySetup/Comply Insert Schemas
export const insertComplyUserSchema = createInsertSchema(complyUsers)
  .pick({
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    companyName: true,
    gstin: true,
    panNumber: true,
    isVerified: true,
    profileCompleted: true,
  })
  .extend({
    password: z.string().min(6), // Accept password in input, will be hashed to passwordHash
    isVerified: z.boolean().optional().default(false),
    profileCompleted: z.boolean().optional().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertGstCertificateSchema = createInsertSchema(gstCertificates)
  .pick({
    userId: true,
    gstin: true,
    businessName: true,
    legalName: true,
    tradeName: true,
    registrationDate: true,
    constitutionOfBusiness: true,
    address: true,
    state: true,
    pinCode: true,
    certificateUrl: true,
    originalFileName: true,
    fileSize: true,
    mimeType: true,
    status: true,
    verificationNotes: true,
    verifiedAt: true,
  })
  .extend({
    status: z.enum(['pending', 'verified', 'rejected']).optional().default('pending'),
    uploadedAt: z.date().optional(),
    verifiedAt: z.date().optional(),
  });

export const insertGstFilingSchema = createInsertSchema(gstFilings)
  .pick({
    userId: true,
    gstin: true,
    returnType: true,
    taxPeriod: true,
    dueDate: true,
    filingDate: true,
    status: true,
    arn: true,
    grossTurnover: true,
    igst: true,
    cgst: true,
    sgst: true,
    cess: true,
    totalTax: true,
    penalties: true,
    interestAmount: true,
    notes: true,
    reminderSent: true,
  })
  .extend({
    status: z.enum(['not_filed', 'filed', 'late_filed', 'overdue']).optional().default('not_filed'),
    grossTurnover: z.union([z.string(), z.number()]).optional(),
    igst: z.union([z.string(), z.number()]).optional(),
    cgst: z.union([z.string(), z.number()]).optional(),
    sgst: z.union([z.string(), z.number()]).optional(),
    cess: z.union([z.string(), z.number()]).optional(),
    totalTax: z.union([z.string(), z.number()]).optional(),
    penalties: z.union([z.string(), z.number()]).optional().default("0.00"),
    interestAmount: z.union([z.string(), z.number()]).optional().default("0.00"),
    reminderSent: z.boolean().optional().default(false),
    dueDate: z.date(),
    filingDate: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertGstReminderSchema = createInsertSchema(gstReminders)
  .pick({
    userId: true,
    filingId: true,
    reminderType: true,
    scheduledAt: true,
    sentAt: true,
    status: true,
    method: true,
  })
  .extend({
    reminderType: z.enum(['7_days', '3_days', '1_day', 'overdue']),
    status: z.enum(['scheduled', 'sent', 'failed']).optional().default('scheduled'),
    method: z.enum(['email', 'sms', 'whatsapp']),
    scheduledAt: z.date(),
    sentAt: z.date().optional(),
    createdAt: z.date().optional(),
  });

// Services Module Insert Schemas
export const insertServiceSchema = createInsertSchema(services)
  .pick({
    name: true,
    slug: true,
    description: true,
    longDescription: true,
    country: true,
    countryCode: true,
    price: true,
    currency: true,
    processingTime: true,
    features: true,
    requirements: true,
    category: true,
    isActive: true,
    isPopular: true,
    heroImage: true,
    // Enhanced content fields
    overviewTitle: true,
    overviewContent: true,
    overviewHighlights: true,
    typesTitle: true,
    typesContent: true,
    serviceTypes: true,
    eligibilityTitle: true,
    eligibilityContent: true,
    eligibilityCriteria: true,
    documentsTitle: true,
    documentsContent: true,
    requiredDocuments: true,
    processTitle: true,
    processContent: true,
    processSteps: true,
    feesTitle: true,
    feesContent: true,
    feeStructure: true,
    benefitsTitle: true,
    benefitsContent: true,
    benefits: true,
    comparisonTitle: true,
    comparisonContent: true,
    comparisonTable: true,
    complianceTitle: true,
    complianceContent: true,
    complianceRequirements: true,
    certificateTitle: true,
    certificateContent: true,
    certificateDetails: true,
    metaTitle: true,
    metaDescription: true,
    keywords: true,
  })
  .extend({
    price: z.union([z.string(), z.number()]),
    features: z.array(z.string()).optional().default([]),
    requirements: z.array(z.string()).optional().default([]),
    isActive: z.boolean().optional().default(true),
    isPopular: z.boolean().optional().default(false),
    longDescription: z.string().optional(),
    heroImage: z.string().optional(),
    // Enhanced content fields - all optional with defaults
    overviewTitle: z.string().optional(),
    overviewContent: z.string().optional(),
    overviewHighlights: z.array(z.string()).optional().default([]),
    typesTitle: z.string().optional(),
    typesContent: z.string().optional(),
    serviceTypes: z.array(z.string()).optional().default([]),
    eligibilityTitle: z.string().optional(),
    eligibilityContent: z.string().optional(),
    eligibilityCriteria: z.array(z.string()).optional().default([]),
    documentsTitle: z.string().optional(),
    documentsContent: z.string().optional(),
    requiredDocuments: z.array(z.string()).optional().default([]),
    processTitle: z.string().optional(),
    processContent: z.string().optional(),
    processSteps: z.array(z.string()).optional().default([]),
    feesTitle: z.string().optional(),
    feesContent: z.string().optional(),
    feeStructure: z.array(z.string()).optional().default([]),
    benefitsTitle: z.string().optional(),
    benefitsContent: z.string().optional(),
    benefits: z.array(z.string()).optional().default([]),
    comparisonTitle: z.string().optional(),
    comparisonContent: z.string().optional(),
    comparisonTable: z.string().optional(),
    complianceTitle: z.string().optional(),
    complianceContent: z.string().optional(),
    complianceRequirements: z.array(z.string()).optional().default([]),
    certificateTitle: z.string().optional(),
    certificateContent: z.string().optional(),
    certificateDetails: z.array(z.string()).optional().default([]),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional().default([]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertServiceOrderSchema = createInsertSchema(serviceOrders)
  .pick({
    orderId: true,
    serviceId: true,
    customerName: true,
    customerEmail: true,
    customerPhone: true,
    customerCompany: true,
    formData: true,
    amount: true,
    currency: true,
    paymentMethod: true,
    paymentStatus: true,
    orderStatus: true,
    paymentId: true,
    paymentIntentId: true,
    razorpayOrderId: true,
    razorpayPaymentId: true,
    razorpaySignature: true,
    notes: true,
  })
  .extend({
    amount: z.union([z.string(), z.number()]),
    paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional().default('pending'),
    orderStatus: z.enum(['pending', 'processing', 'completed', 'cancelled']).optional().default('pending'),
    customerCompany: z.string().optional(),
    paymentId: z.string().optional(),
    paymentIntentId: z.string().optional(),
    razorpayOrderId: z.string().optional(),
    razorpayPaymentId: z.string().optional(),
    razorpaySignature: z.string().optional(),
    notes: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });



// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertComplyUser = z.infer<typeof insertComplyUserSchema>;
export type ComplyUser = typeof complyUsers.$inferSelect;

export type InsertGstCertificate = z.infer<typeof insertGstCertificateSchema>;
export type GstCertificate = typeof gstCertificates.$inferSelect;

export type InsertGstFiling = z.infer<typeof insertGstFilingSchema>;
export type GstFiling = typeof gstFilings.$inferSelect;

export type InsertGstReminder = z.infer<typeof insertGstReminderSchema>;
export type GstReminder = typeof gstReminders.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertServiceOrder = z.infer<typeof insertServiceOrderSchema>;
export type ServiceOrder = typeof serviceOrders.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertOffice = z.infer<typeof insertOfficeSchema>;
export type Office = typeof offices.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertArea = z.infer<typeof insertAreaSchema>;
export type Area = typeof areas.$inferSelect;

export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type Author = typeof authors.$inferSelect;

export type InsertSalesPerson = z.infer<typeof insertSalesPersonSchema>;
export type SalesPerson = typeof salesPersons.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertCapturedUrl = z.infer<typeof insertCapturedUrlSchema>;
export type CapturedUrl = typeof capturedUrls.$inferSelect;

export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
export type Workspace = typeof workspaces.$inferSelect;

export type InsertPricingCatalog = z.infer<typeof insertPricingCatalogSchema>;
export type PricingCatalog = typeof pricingCatalog.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertDocukitCategory = z.infer<typeof insertDocukitCategorySchema>;
export type DocukitCategory = typeof docukitCategories.$inferSelect;

export type InsertDocukitTemplate = z.infer<typeof insertDocukitTemplateSchema>;
export type DocukitTemplate = typeof docukitTemplates.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export const insertCompanySearchSchema = createInsertSchema(companySearchHistory)
  .pick({
    cin: true,
    companyName: true,
    status: true,
    registrationDate: true,
    category: true,
    subCategory: true,
    classOfCompany: true,
    authorizedCapital: true,
    paidUpCapital: true,
    numberOfMembers: true,
    address: true,
    state: true,
    country: true,
    email: true,
    website: true,
    lastAGMDate: true,
    lastAccountsDate: true,
    directors: true,
    apiResponse: true,
  })
  .extend({
    directors: z.array(z.string()).optional().default([]),
    searchedAt: z.date().optional(),
  });

export type InsertCompanySearch = z.infer<typeof insertCompanySearchSchema>;
export type CompanySearch = typeof companySearchHistory.$inferSelect;

// Alerts Schema
export const insertAlertSchema = createInsertSchema(alerts)
  .pick({
    title: true,
    description: true,
    cardType: true,
    type: true,
    priority: true,
    targetUrl: true,
    targetType: true,
    isActive: true,
    publishedDate: true,
    dueDate: true,
    startDate: true,
    endDate: true,
  })
  .extend({
    cardType: z.enum(['notice', 'due_date']).optional().default('notice'),
    type: z.enum(['info', 'warning', 'success', 'error']).optional().default('info'),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional().default('medium'),
    targetType: z.enum(['service', 'page', 'external']).optional(),
    isActive: z.boolean().optional().default(true),
    publishedDate: z.date().optional(),
    dueDate: z.date().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

// Offers table
export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  hyperlink: text("hyperlink").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schema for offers
export const insertOfferSchema = createInsertSchema(offers)
  .pick({
    title: true,
    description: true,
    image: true,
    hyperlink: true,
    isActive: true,
    sortOrder: true,
  })
  .extend({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
    hyperlink: z.string().url("Please enter a valid URL"),
    isActive: z.boolean().optional().default(true),
    sortOrder: z.number().int().optional().default(0),
  });

export type InsertOffer = z.infer<typeof insertOfferSchema>;
export type Offer = typeof offers.$inferSelect;

// Menu Management Tables
export const menuSections = pgTable("menu_sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  countryCode: text("country_code").notNull(), // IN, SG, etc.
  displayOrder: integer("display_order").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").notNull().references(() => menuSections.id),
  title: text("title").notNull(),
  description: text("description"),
  href: text("href").notNull(),
  displayOrder: integer("display_order").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Menu Relations
export const menuSectionsRelations = relations(menuSections, ({ many }) => ({
  items: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  section: one(menuSections, {
    fields: [menuItems.sectionId],
    references: [menuSections.id],
  }),
}));

// Menu Insert Schemas
export const insertMenuSectionSchema = createInsertSchema(menuSections)
  .pick({
    name: true,
    slug: true,
    countryCode: true,
    displayOrder: true,
    isActive: true,
  })
  .extend({
    isActive: z.boolean().optional().default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const insertMenuItemSchema = createInsertSchema(menuItems)
  .pick({
    sectionId: true,
    title: true,
    description: true,
    href: true,
    displayOrder: true,
    isActive: true,
  })
  .extend({
    isActive: z.boolean().optional().default(true),
    description: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

// Menu Types
export type InsertMenuSection = z.infer<typeof insertMenuSectionSchema>;
export type MenuSection = typeof menuSections.$inferSelect;

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

// Dynamic Pages Schema
export const insertDynamicPageSchema = createInsertSchema(dynamicPages)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertDynamicPage = z.infer<typeof insertDynamicPageSchema>;
export type DynamicPage = typeof dynamicPages.$inferSelect;

// SimplySetup AI Lead Management Tables
export const simplySetupLeads = pgTable("simply_setup_leads", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  
  // Basic Details
  entityType: text("entity_type"), // proprietorship, partnership, llp, pvt_ltd, opc, etc.
  legalName: text("legal_name"),
  tradeName: text("trade_name"),
  
  // Contact Details
  email: text("email"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  
  // Location
  stateOfRegistration: text("state_of_registration"),
  city: text("city"),
  
  // Office Details
  hasOwnOffice: boolean("has_own_office"),
  needsVirtualOffice: boolean("needs_virtual_office"),
  virtualOfficeLocation: text("virtual_office_location"),
  
  // Business Details
  natureOfBusiness: text("nature_of_business"), // ecommerce, services, trading, manufacturing
  platforms: text("platforms").array().default([]), // amazon, flipkart, meesho, etc.
  approxTurnover: text("approx_turnover"),
  gstScheme: text("gst_scheme"), // regular, composition
  
  // Pricing & Payment
  selectedPackage: text("selected_package"),
  packagePrice: decimal("package_price", { precision: 10, scale: 2 }),
  paymentStatus: text("payment_status", { enum: ["pending", "paid", "failed", "refunded"] }).default("pending").notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  
  // Summary
  summary: text("summary"),
  
  // Status & Tracking
  status: text("status", { enum: ["new", "qualified", "documents_pending", "documents_uploaded", "payment_pending", "payment_complete", "handed_off", "completed"] }).default("new").notNull(),
  assignedTo: text("assigned_to"),
  notes: text("notes"),
  
  // Zoho CRM Integration
  zohoRecordId: text("zoho_record_id"),
  zohoPushStatus: text("zoho_push_status", { enum: ["pending", "success", "failed"] }),
  zohoPushError: text("zoho_push_error"),
  zohoPushedAt: timestamp("zoho_pushed_at"),
  
  // Conversation
  conversationHistory: text("conversation_history"), // JSON string of messages
  currentStep: text("current_step").default("greeting"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const simplySetupDocuments = pgTable("simply_setup_documents", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull().references(() => simplySetupLeads.id, { onDelete: "cascade" }),
  documentType: text("document_type").notNull(), // pan, aadhaar, rent_agreement, vo_docs, bank_proof, photo, etc.
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  status: text("status", { enum: ["pending", "verified", "rejected"] }).default("pending").notNull(),
  verificationNotes: text("verification_notes"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Relations
export const simplySetupLeadsRelations = relations(simplySetupLeads, ({ many }) => ({
  documents: many(simplySetupDocuments),
}));

export const simplySetupDocumentsRelations = relations(simplySetupDocuments, ({ one }) => ({
  lead: one(simplySetupLeads, {
    fields: [simplySetupDocuments.leadId],
    references: [simplySetupLeads.id],
  }),
}));

// Insert Schemas
export const insertSimplySetupLeadSchema = createInsertSchema(simplySetupLeads)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    platforms: z.array(z.string()).optional().default([]),
    packagePrice: z.union([z.string(), z.number()]).optional(),
    paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional().default("pending"),
    status: z.enum(["new", "qualified", "documents_pending", "documents_uploaded", "payment_pending", "payment_complete", "handed_off", "completed"]).optional().default("new"),
  });

export const insertSimplySetupDocumentSchema = createInsertSchema(simplySetupDocuments)
  .omit({
    id: true,
    uploadedAt: true,
  })
  .extend({
    status: z.enum(["pending", "verified", "rejected"]).optional().default("pending"),
  });

// Types
export type InsertSimplySetupLead = z.infer<typeof insertSimplySetupLeadSchema>;
export type SimplySetupLead = typeof simplySetupLeads.$inferSelect;

export type InsertSimplySetupDocument = z.infer<typeof insertSimplySetupDocumentSchema>;
export type SimplySetupDocument = typeof simplySetupDocuments.$inferSelect;

// GSTIN Search Types (for GST Number Search Tool)
export const gstinSearchRequestSchema = z.object({
  gstin: z.string().min(15).max(15).regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
    message: "Invalid GSTIN format. Must be 15 characters in valid format."
  }),
});

export type GSTINSearchRequest = z.infer<typeof gstinSearchRequestSchema>;

export interface GSTINDetails {
  gstin: string;
  legalName: string;
  tradeName: string;
  address: {
    buildingName: string;
    buildingNumber: string;
    floorNumber: string;
    street: string;
    locality: string;
    district: string;
    stateCode: string;
    stateName: string;
    pincode: string;
    fullAddress: string;
  };
  taxpayerType: string;
  registrationStatus: string;
  registrationDate: string;
  lastUpdated: string;
  constitutionOfBusiness: string;
  natureOfBusinessActivities: string[];
  principalPlaceOfBusiness: string;
  additionalPlacesOfBusiness: string[];
  isECommerceOperator: boolean;
  annualTurnoverRange: string;
  stateJurisdiction: string;
  centerJurisdiction: string;
}

export interface GSTINSearchResponse {
  success: boolean;
  data?: GSTINDetails;
  error?: string;
  errorCode?: string;
}

// GST Return Filing Types (for GST Return Checker Tool)
export interface GSTReturnFiling {
  returnType: string; // GSTR1, GSTR3B, GSTR9, etc.
  financialYear: string; // e.g., "2023-24"
  taxPeriod: string; // e.g., "April 2024", "Q1 2024"
  dateOfFiling: string;
  status: "Filed" | "Not Filed" | "Late Filed" | "Pending";
  modeOfFiling: string; // ONLINE, OFFLINE
  arnNumber?: string; // Acknowledgement Reference Number
  liability?: {
    igst?: number;
    cgst?: number;
    sgst?: number;
    cess?: number;
    total?: number;
  };
}

export interface GSTReturnSummary {
  gstin: string;
  legalName: string;
  tradeName: string;
  registrationStatus: string;
  registrationDate: string;
  taxpayerType: string;
  stateName: string;
  lastFiledReturn?: {
    returnType: string;
    taxPeriod: string;
    dateOfFiling: string;
  };
  filingCompliance: {
    totalReturns: number;
    filedOnTime: number;
    filedLate: number;
    pending: number;
    compliancePercentage: number;
  };
  filings: GSTReturnFiling[];
}

export interface GSTReturnResponse {
  success: boolean;
  data?: GSTReturnSummary;
  error?: string;
  errorCode?: string;
  source?: "live" | "derived" | "demo";
  isDemo?: boolean;
  message?: string;
}

export const gstReturnRequestSchema = z.object({
  gstin: z.string().min(15).max(15).regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
    message: "Invalid GSTIN format. Must be 15 characters in valid format."
  }),
});

export type GSTReturnRequest = z.infer<typeof gstReturnRequestSchema>;