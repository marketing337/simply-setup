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
  authorId: integer("author_id").notNull().references(() => users.id),
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
  mainImage: text("main_image"),
  contactPerson: text("contact_person"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  isActive: boolean("is_active").default(true).notNull(),
  status: text("status").default("available").notNull(),
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

export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
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

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertOffice = z.infer<typeof insertOfficeSchema>;
export type Office = typeof offices.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertArea = z.infer<typeof insertAreaSchema>;
export type Area = typeof areas.$inferSelect;

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