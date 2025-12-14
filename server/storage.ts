import { 
  users, type User, type InsertUser,
  locations, type Location, type InsertLocation,
  offices, type Office, type InsertOffice,
  testimonials, type Testimonial, type InsertTestimonial,
  areas, type Area, type InsertArea,
  authors, type Author, type InsertAuthor,
  blogPosts, type BlogPost, type InsertBlogPost,
  capturedUrls, type CapturedUrl, type InsertCapturedUrl,
  workspaces, type Workspace, type InsertWorkspace,
  vendors, type Vendor, type InsertVendor,
  salesPersons, type SalesPerson, type InsertSalesPerson,
  pricingCatalog, type PricingCatalog, type InsertPricingCatalog,
  orders, type Order, type InsertOrder,
  docukitCategories, type DocukitCategory, type InsertDocukitCategory,
  docukitTemplates, type DocukitTemplate, type InsertDocukitTemplate,
  companySearchHistory, type CompanySearch, type InsertCompanySearch,
  companies, type Company, type InsertCompany,
  complyUsers, type ComplyUser, type InsertComplyUser,
  gstCertificates, type GstCertificate, type InsertGstCertificate,
  gstFilings, type GstFiling, type InsertGstFiling,
  gstReminders, type GstReminder, type InsertGstReminder,
  alerts, type Alert, type InsertAlert,
  offers, type Offer, type InsertOffer,
  menuSections, type MenuSection, type InsertMenuSection,
  menuItems, type MenuItem, type InsertMenuItem,
  services, type Service, type InsertService,
  serviceOrders, type ServiceOrder, type InsertServiceOrder,
  dynamicPages, type DynamicPage, type InsertDynamicPage,
  simplySetupLeads, type SimplySetupLead, type InsertSimplySetupLead,
  simplySetupDocuments, type SimplySetupDocument, type InsertSimplySetupDocument
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, or, isNull, ilike, count } from "drizzle-orm";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Location operations
  getAllLocations(country?: string): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
  getLocationById(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: number, location: Partial<InsertLocation>): Promise<Location>;
  
  // Office operations
  getOfficesByLocationId(locationId: number): Promise<Office[]>;
  createOffice(office: InsertOffice): Promise<Office>;
  
  // Testimonial operations
  getTestimonialsByLocationId(locationId: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Area operations
  getAreasByLocationId(locationId: number): Promise<Area[]>;
  getAreaBySlug(locationSlug: string, areaSlug: string): Promise<Area | undefined>;
  getArea(id: number): Promise<Area | undefined>;
  createArea(area: InsertArea): Promise<Area>;
  updateArea(id: number, area: Partial<InsertArea>): Promise<Area>;
  deleteArea(id: number): Promise<void>;
  
  // Author operations
  getAllAuthors(): Promise<Author[]>;
  getAuthorById(id: number): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  updateAuthor(id: number, author: Partial<InsertAuthor>): Promise<Author>;
  deleteAuthor(id: number): Promise<void>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByTag(tag: string): Promise<BlogPost[]>;
  getAllBlogTags(): Promise<string[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]>;
  getBlogPostAuthorUsername(authorId: number): Promise<string | undefined>;
  
  // URL Capture operations
  getCapturedUrlsByBlogPostId(blogPostId: number): Promise<CapturedUrl[]>;
  createCapturedUrl(capturedUrl: InsertCapturedUrl): Promise<CapturedUrl>;
  updateCapturedUrl(id: number, capturedUrl: Partial<InsertCapturedUrl>): Promise<CapturedUrl>;
  deleteCapturedUrl(id: number): Promise<void>;
  getAllCapturedUrls(): Promise<CapturedUrl[]>;
  getCapturedUrlsByDomain(domain: string): Promise<CapturedUrl[]>;
  
  // Vendor operations
  getAllVendors(): Promise<Vendor[]>;
  getVendorById(id: number): Promise<Vendor | undefined>;
  getVendorBySlug(slug: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, vendor: Partial<InsertVendor>): Promise<Vendor>;
  deleteVendor(id: number): Promise<void>;
  
  // Workspace operations
  getAllWorkspaces(): Promise<Workspace[]>;
  getWorkspaceById(id: number): Promise<Workspace | undefined>;
  getWorkspaceBySlug(slug: string): Promise<Workspace | undefined>;
  getWorkspacesByLocationId(locationId: number): Promise<Workspace[]>;
  getWorkspacesByAreaId(areaId: number): Promise<Workspace[]>;
  getWorkspacesByVendorId(vendorId: number): Promise<Workspace[]>;
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
  updateWorkspace(id: number, workspace: Partial<InsertWorkspace>): Promise<Workspace>;
  deleteWorkspace(id: number): Promise<void>;
  
  // Sales Person operations
  getAllSalesPersons(): Promise<SalesPerson[]>;
  getSalesPersonById(id: number): Promise<SalesPerson | undefined>;
  getSalesPersonsByLocationId(locationId: number): Promise<SalesPerson[]>;
  createSalesPerson(salesPerson: InsertSalesPerson): Promise<SalesPerson>;
  updateSalesPerson(id: number, salesPerson: Partial<InsertSalesPerson>): Promise<SalesPerson>;
  deleteSalesPerson(id: number): Promise<void>;
  
  // Pricing Catalog operations
  getAllPricingCatalog(): Promise<PricingCatalog[]>;
  getPricingCatalogByLocationId(locationId: number): Promise<PricingCatalog[]>;
  getPricingCatalogById(id: number): Promise<PricingCatalog | undefined>;
  createPricingCatalog(catalog: InsertPricingCatalog): Promise<PricingCatalog>;
  updatePricingCatalog(id: number, catalog: Partial<InsertPricingCatalog>): Promise<PricingCatalog>;
  deletePricingCatalog(id: number): Promise<void>;
  
  // Order operations
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order>;
  updateOrderByOrderId(orderId: string, order: Partial<InsertOrder>): Promise<Order>;
  updateOrderByPaymentId(paymentId: string, order: Partial<InsertOrder>): Promise<Order>;
  
  // DocuKit Category operations
  getAllDocukitCategories(): Promise<DocukitCategory[]>;
  getDocukitCategoryById(id: number): Promise<DocukitCategory | undefined>;
  getDocukitCategoryBySlug(slug: string): Promise<DocukitCategory | undefined>;
  createDocukitCategory(category: InsertDocukitCategory): Promise<DocukitCategory>;
  updateDocukitCategory(id: number, category: Partial<InsertDocukitCategory>): Promise<DocukitCategory>;
  deleteDocukitCategory(id: number): Promise<void>;
  
  // DocuKit Template operations
  getAllDocukitTemplates(): Promise<DocukitTemplate[]>;
  getDocukitTemplateById(id: number): Promise<DocukitTemplate | undefined>;
  getDocukitTemplateBySlug(slug: string): Promise<DocukitTemplate | undefined>;
  getDocukitTemplateWithCategoryBySlug(categorySlug: string, templateSlug: string): Promise<any | undefined>;
  getDocukitTemplatesByCategoryId(categoryId: number): Promise<DocukitTemplate[]>;
  createDocukitTemplate(template: InsertDocukitTemplate): Promise<DocukitTemplate>;
  updateDocukitTemplate(id: number, template: Partial<InsertDocukitTemplate>): Promise<DocukitTemplate>;
  deleteDocukitTemplate(id: number): Promise<void>;
  incrementTemplateDownload(id: number): Promise<void>;
  
  // Company Search operations
  getAllCompanySearchHistory(): Promise<CompanySearch[]>;
  getCompanySearchHistoryByCin(cin: string): Promise<CompanySearch | undefined>;
  createCompanySearchHistory(companySearch: InsertCompanySearch): Promise<CompanySearch>;
  
  // Company operations
  createCompany(company: InsertCompany): Promise<Company>;
  getAllCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  getCompanyByCin(cin: string): Promise<Company | undefined>;
  getCompanyBySlug(slug: string): Promise<Company | undefined>;
  searchCompanies(query: string, limit?: number): Promise<Company[]>;
  getCompaniesCount(): Promise<number>;
  getActiveCompaniesCount(): Promise<number>;
  getRecentlyAddedCompaniesCount(): Promise<number>;
  getAllCompanyCins(): Promise<string[]>;
  
  // SimplySetup/Comply operations
  // Comply User operations
  getComplyUser(id: number): Promise<ComplyUser | undefined>;
  getComplyUserByEmail(email: string): Promise<ComplyUser | undefined>;
  createComplyUser(user: Omit<InsertComplyUser, 'password'> & { passwordHash: string }): Promise<ComplyUser>;
  updateComplyUser(id: number, user: Partial<InsertComplyUser>): Promise<ComplyUser>;
  updateComplyUserPassword(id: number, hashedPassword: string): Promise<ComplyUser>;
  
  // Alert operations
  getAllAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  getAlertById(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, alert: Partial<InsertAlert>): Promise<Alert>;
  deleteAlert(id: number): Promise<void>;
  
  // Offer operations
  getAllOffers(): Promise<Offer[]>;
  getActiveOffers(): Promise<Offer[]>;
  getOfferById(id: number): Promise<Offer | undefined>;
  createOffer(offer: InsertOffer): Promise<Offer>;
  updateOffer(id: number, offer: Partial<InsertOffer>): Promise<Offer>;
  deleteOffer(id: number): Promise<void>;
  
  // GST Certificate operations
  getGstCertificatesByUserId(userId: number): Promise<GstCertificate[]>;
  getGstCertificateById(id: number): Promise<GstCertificate | undefined>;
  createGstCertificate(certificate: InsertGstCertificate): Promise<GstCertificate>;
  updateGstCertificate(id: number, certificate: Partial<InsertGstCertificate>): Promise<GstCertificate>;
  deleteGstCertificate(id: number): Promise<void>;
  
  // GST Filing operations
  getGstFilingsByUserId(userId: number): Promise<GstFiling[]>;
  getGstFilingById(id: number): Promise<GstFiling | undefined>;
  getGstFilingsByGstin(gstin: string): Promise<GstFiling[]>;
  createGstFiling(filing: InsertGstFiling): Promise<GstFiling>;
  updateGstFiling(id: number, filing: Partial<InsertGstFiling>): Promise<GstFiling>;
  deleteGstFiling(id: number): Promise<void>;
  getOverdueFilings(): Promise<GstFiling[]>;
  getUpcomingFilings(days: number): Promise<GstFiling[]>;
  
  // GST Reminder operations
  getGstRemindersByUserId(userId: number): Promise<GstReminder[]>;
  getGstReminderById(id: number): Promise<GstReminder | undefined>;
  createGstReminder(reminder: InsertGstReminder): Promise<GstReminder>;
  updateGstReminder(id: number, reminder: Partial<InsertGstReminder>): Promise<GstReminder>;
  deleteGstReminder(id: number): Promise<void>;
  getPendingReminders(): Promise<GstReminder[]>;
  
  // Menu Management operations
  getAllMenuSections(): Promise<MenuSection[]>;
  getMenuSectionsByCountry(countryCode: string): Promise<MenuSection[]>;
  getMenuSectionById(id: number): Promise<MenuSection | undefined>;
  createMenuSection(section: InsertMenuSection): Promise<MenuSection>;
  updateMenuSection(id: number, section: Partial<InsertMenuSection>): Promise<MenuSection>;
  deleteMenuSection(id: number): Promise<void>;
  
  getMenuItemsBySection(sectionId: number): Promise<MenuItem[]>;
  getMenuItemById(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;

  // Services Module operations
  getAllServices(): Promise<Service[]>;
  getServicesByCountry(countryCode: string): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // Service Order operations
  getAllServiceOrders(): Promise<ServiceOrder[]>;
  getServiceOrderById(id: number): Promise<ServiceOrder | undefined>;
  getServiceOrderByOrderId(orderId: string): Promise<ServiceOrder | undefined>;
  getServiceOrdersByService(serviceId: number): Promise<ServiceOrder[]>;
  getServiceOrdersByCustomerEmail(customerEmail: string): Promise<ServiceOrder[]>;
  createServiceOrder(order: InsertServiceOrder): Promise<ServiceOrder>;
  updateServiceOrder(id: number, order: Partial<InsertServiceOrder>): Promise<ServiceOrder>;
  updateServiceOrderByOrderId(orderId: string, order: Partial<InsertServiceOrder>): Promise<ServiceOrder>;
  getServiceOrdersByPaymentStatus(status: string): Promise<ServiceOrder[]>;
  getServiceOrdersByOrderStatus(status: string): Promise<ServiceOrder[]>;

  // Dynamic Pages operations
  getAllDynamicPages(): Promise<DynamicPage[]>;
  getDynamicPageById(id: number): Promise<DynamicPage | undefined>;
  getDynamicPageBySlug(slug: string): Promise<DynamicPage | undefined>;
  createDynamicPage(page: InsertDynamicPage): Promise<DynamicPage>;
  createDynamicPagesBulk(pages: InsertDynamicPage[]): Promise<DynamicPage[]>;
  updateDynamicPage(id: number, page: Partial<InsertDynamicPage>): Promise<DynamicPage>;
  deleteDynamicPage(id: number): Promise<void>;
  deleteDynamicPagesBulk(ids: number[]): Promise<void>;

  // SimplySetup Lead operations
  getAllSimplySetupLeads(): Promise<SimplySetupLead[]>;
  getSimplySetupLeadById(id: number): Promise<SimplySetupLead | undefined>;
  getSimplySetupLeadBySessionId(sessionId: string): Promise<SimplySetupLead | undefined>;
  createSimplySetupLead(lead: InsertSimplySetupLead): Promise<SimplySetupLead>;
  updateSimplySetupLead(id: number, lead: Partial<InsertSimplySetupLead>): Promise<SimplySetupLead>;
  updateSimplySetupLeadBySessionId(sessionId: string, lead: Partial<InsertSimplySetupLead>): Promise<SimplySetupLead>;
  deleteSimplySetupLead(id: number): Promise<void>;
  getSimplySetupLeadsByStatus(status: string): Promise<SimplySetupLead[]>;

  // SimplySetup Document operations
  getSimplySetupDocumentsByLeadId(leadId: number): Promise<SimplySetupDocument[]>;
  getSimplySetupDocumentById(id: number): Promise<SimplySetupDocument | undefined>;
  createSimplySetupDocument(document: InsertSimplySetupDocument): Promise<SimplySetupDocument>;
  updateSimplySetupDocument(id: number, document: Partial<InsertSimplySetupDocument>): Promise<SimplySetupDocument>;
  deleteSimplySetupDocument(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Location operations
  async getAllLocations(country?: string): Promise<Location[]> {
    let query = db.select().from(locations);
    
    if (country) {
      query = query.where(eq(locations.country_code, country));
    }
    
    return await query;
  }
  
  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    const result = await db.select().from(locations).where(eq(locations.slug, slug));
    return result[0];
  }
  
  async getLocationById(id: number): Promise<Location | undefined> {
    const result = await db.select().from(locations).where(eq(locations.id, id));
    return result[0];
  }
  
  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const result = await db.insert(locations).values(insertLocation).returning();
    return result[0];
  }
  
  async updateLocation(id: number, locationUpdate: Partial<InsertLocation>): Promise<Location> {
    try {
      console.log(`Updating location ${id} in database with:`, locationUpdate);
      
      const result = await db
        .update(locations)
        .set(locationUpdate)
        .where(eq(locations.id, id))
        .returning();
      
      console.log(`Location ${id} update result:`, result);
      
      if (!result || result.length === 0) {
        console.error(`No location found with ID ${id}`);
        throw new Error(`Location with ID ${id} not found`);
      }
      
      return result[0];
    } catch (error) {
      console.error(`Error updating location ${id}:`, error);
      throw error;
    }
  }
  
  // Office operations
  async getOfficesByLocationId(locationId: number): Promise<Office[]> {
    return db.select().from(offices).where(eq(offices.locationId, locationId));
  }
  
  async createOffice(insertOffice: InsertOffice): Promise<Office> {
    const result = await db.insert(offices).values(insertOffice).returning();
    return result[0];
  }
  
  // Testimonial operations
  async getTestimonialsByLocationId(locationId: number): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.locationId, locationId));
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(insertTestimonial).returning();
    return result[0];
  }
  
  // Area operations
  async getAreasByLocationId(locationId: number): Promise<Area[]> {
    return db.select().from(areas).where(eq(areas.locationId, locationId));
  }
  
  async getAreaBySlug(locationSlug: string, areaSlug: string): Promise<Area | undefined> {
    // First get the location id
    const location = await this.getLocationBySlug(locationSlug);
    if (!location) return undefined;
    
    // Then get the area with matching slug in that location
    const result = await db.select()
      .from(areas)
      .where(and(
        eq(areas.locationId, location.id),
        eq(areas.slug, areaSlug)
      ));
    return result[0];
  }
  
  async getArea(id: number): Promise<Area | undefined> {
    const result = await db.select().from(areas).where(eq(areas.id, id));
    return result[0];
  }
  
  async createArea(insertArea: InsertArea): Promise<Area> {
    const result = await db.insert(areas).values(insertArea).returning();
    return result[0];
  }
  
  async updateArea(id: number, areaUpdate: Partial<InsertArea>): Promise<Area> {
    const result = await db
      .update(areas)
      .set(areaUpdate)
      .where(eq(areas.id, id))
      .returning();
    return result[0];
  }
  
  async deleteArea(id: number): Promise<void> {
    await db.delete(areas).where(eq(areas.id, id));
  }
  
  // Author operations
  async getAllAuthors(): Promise<Author[]> {
    return db.select()
      .from(authors)
      .orderBy(desc(authors.createdAt));
  }
  
  async getAuthorById(id: number): Promise<Author | undefined> {
    const result = await db.select()
      .from(authors)
      .where(eq(authors.id, id));
    return result[0];
  }
  
  async createAuthor(insertAuthor: InsertAuthor): Promise<Author> {
    const now = new Date();
    const authorWithTimestamps = {
      ...insertAuthor,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.insert(authors)
      .values(authorWithTimestamps)
      .returning();
    return result[0];
  }
  
  async updateAuthor(id: number, updateData: Partial<InsertAuthor>): Promise<Author> {
    const now = new Date();
    const authorUpdate = { ...updateData, updatedAt: now };
    
    const result = await db.update(authors)
      .set(authorUpdate)
      .where(eq(authors.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteAuthor(id: number): Promise<void> {
    await db.delete(authors).where(eq(authors.id, id));
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }
  
  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db.select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const result = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return result[0];
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return result[0];
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    // Set updatedAt for new post
    const now = new Date();
    const postWithTimestamps = {
      ...post,
      updatedAt: now,
      createdAt: now,
      // If published is true and publishedAt is not set, set it to now
      publishedAt: post.published && !post.publishedAt ? now : post.publishedAt,
    };
    
    const result = await db.insert(blogPosts)
      .values(postWithTimestamps as any) // Type cast to bypass type checking temporarily
      .returning();
    return result[0];
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const now = new Date();
    const updateData: Record<string, any> = { ...post, updatedAt: now };
    
    // If being published for the first time, set publishedAt
    if (post.published === true) {
      const currentPost = await this.getBlogPostById(id);
      if (currentPost && !currentPost.published && !post.publishedAt) {
        updateData.publishedAt = now;
      }
    }
    
    const result = await db.update(blogPosts)
      .set(updateData as any) // Type cast to bypass type checking temporarily
      .where(eq(blogPosts.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Blog post with ID ${id} not found`);
    }
    
    return result[0];
  }
  
  async deleteBlogPost(id: number): Promise<void> {
    // First delete related captured URLs
    await db.delete(capturedUrls).where(eq(capturedUrls.blogPostId, id));
    
    // Then delete the blog post
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Blog post with ID ${id} not found`);
    }
  }
  
  async getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]> {
    return db.select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, authorId))
      .orderBy(desc(blogPosts.createdAt));
  }
  
  async getBlogPostAuthorUsername(authorId: number): Promise<string | undefined> {
    const result = await db.select({ username: users.username })
      .from(users)
      .where(eq(users.id, authorId))
      .limit(1);
    return result[0]?.username;
  }

  async getBlogPostAuthorName(authorId: number): Promise<string | undefined> {
    const result = await db.select({ name: authors.name })
      .from(authors)
      .where(eq(authors.id, authorId))
      .limit(1);
    return result[0]?.name;
  }

  async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    return db.select()
      .from(blogPosts)
      .where(and(
        eq(blogPosts.published, true),
        sql`${blogPosts.tags} @> ARRAY[${tag}]`
      ))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getAllBlogTags(): Promise<string[]> {
    const result = await db.select({ tags: blogPosts.tags })
      .from(blogPosts)
      .where(eq(blogPosts.published, true));
    
    const allTags = new Set<string>();
    result.forEach(row => {
      if (row.tags && Array.isArray(row.tags)) {
        row.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    return Array.from(allTags).sort();
  }
  
  // URL Capture operations
  async getCapturedUrlsByBlogPostId(blogPostId: number): Promise<CapturedUrl[]> {
    return db.select()
      .from(capturedUrls)
      .where(eq(capturedUrls.blogPostId, blogPostId))
      .orderBy(desc(capturedUrls.createdAt));
  }
  
  async createCapturedUrl(insertCapturedUrl: InsertCapturedUrl): Promise<CapturedUrl> {
    const now = new Date();
    const capturedUrlWithTimestamps = {
      ...insertCapturedUrl,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.insert(capturedUrls)
      .values(capturedUrlWithTimestamps as any)
      .returning();
    return result[0];
  }
  
  async updateCapturedUrl(id: number, capturedUrlUpdate: Partial<InsertCapturedUrl>): Promise<CapturedUrl> {
    const now = new Date();
    const updateData = { 
      ...capturedUrlUpdate, 
      updatedAt: now
    };
    
    const result = await db.update(capturedUrls)
      .set(updateData as any)
      .where(eq(capturedUrls.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Captured URL with ID ${id} not found`);
    }
    
    return result[0];
  }
  
  async deleteCapturedUrl(id: number): Promise<void> {
    await db.delete(capturedUrls).where(eq(capturedUrls.id, id));
  }
  
  async getAllCapturedUrls(): Promise<CapturedUrl[]> {
    return db.select()
      .from(capturedUrls)
      .orderBy(desc(capturedUrls.createdAt));
  }
  
  async getCapturedUrlsByDomain(domain: string): Promise<CapturedUrl[]> {
    return db.select()
      .from(capturedUrls)
      .where(eq(capturedUrls.domain, domain))
      .orderBy(desc(capturedUrls.createdAt));
  }

  // Vendor operations
  async getAllVendors(): Promise<Vendor[]> {
    return db.select()
      .from(vendors)
      .orderBy(vendors.name);
  }

  async getVendorById(id: number): Promise<Vendor | undefined> {
    const result = await db.select()
      .from(vendors)
      .where(eq(vendors.id, id));
    return result[0];
  }

  async getVendorBySlug(slug: string): Promise<Vendor | undefined> {
    const result = await db.select()
      .from(vendors)
      .where(eq(vendors.slug, slug));
    return result[0];
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    // Set timestamps
    const now = new Date();
    const vendorWithTimestamps = {
      ...insertVendor,
      createdAt: now,
      updatedAt: now,
    };
    
    console.log("Creating vendor with data:", vendorWithTimestamps);
    
    const result = await db.insert(vendors)
      .values(vendorWithTimestamps as any) // Type cast for timestamps
      .returning();
    return result[0];
  }

  async updateVendor(id: number, vendorUpdate: Partial<InsertVendor>): Promise<Vendor> {
    // Set updatedAt
    const now = new Date();
    const updateData = { 
      ...vendorUpdate, 
      updatedAt: now
    };
    
    console.log("Updating vendor with data:", updateData);
    
    const result = await db.update(vendors)
      .set(updateData as any) // Type cast for updatedAt
      .where(eq(vendors.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Vendor with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteVendor(id: number): Promise<void> {
    await db.delete(vendors).where(eq(vendors.id, id));
  }

  async getWorkspacesByVendorId(vendorId: number): Promise<Workspace[]> {
    return db.select()
      .from(workspaces)
      .where(eq(workspaces.vendorId, vendorId))
      .orderBy(desc(workspaces.createdAt));
  }

  // Workspace operations
  async getAllWorkspaces(): Promise<Workspace[]> {
    return db.select()
      .from(workspaces)
      .orderBy(desc(workspaces.createdAt));
  }

  async getWorkspaceById(id: number): Promise<Workspace | undefined> {
    const result = await db.select()
      .from(workspaces)
      .where(eq(workspaces.id, id));
    return result[0];
  }

  async getWorkspaceBySlug(slug: string): Promise<Workspace | undefined> {
    const result = await db.select()
      .from(workspaces)
      .where(eq(workspaces.slug, slug));
    return result[0];
  }

  async getWorkspacesByLocationId(locationId: number): Promise<Workspace[]> {
    return db.select()
      .from(workspaces)
      .where(eq(workspaces.locationId, locationId))
      .orderBy(desc(workspaces.createdAt));
  }

  async getWorkspacesByAreaId(areaId: number): Promise<Workspace[]> {
    return db.select()
      .from(workspaces)
      .where(eq(workspaces.areaId, areaId))
      .orderBy(desc(workspaces.createdAt));
  }

  async createWorkspace(insertWorkspace: InsertWorkspace): Promise<Workspace> {
    // Set timestamps
    const now = new Date();
    
    // Convert pricing fields from string to number if they're strings
    let processedWorkspace = {...insertWorkspace};
    if (typeof processedWorkspace.monthlyPrice === 'string') {
      processedWorkspace.monthlyPrice = parseFloat(processedWorkspace.monthlyPrice);
    }
    
    // Convert tier pricing fields from string to number if they're strings
    if (typeof processedWorkspace.tier1Price === 'string') {
      processedWorkspace.tier1Price = processedWorkspace.tier1Price ? parseFloat(processedWorkspace.tier1Price) : null;
    }
    if (typeof processedWorkspace.tier2Price === 'string') {
      processedWorkspace.tier2Price = processedWorkspace.tier2Price ? parseFloat(processedWorkspace.tier2Price) : null;
    }
    if (typeof processedWorkspace.tier3Price === 'string') {
      processedWorkspace.tier3Price = processedWorkspace.tier3Price ? parseFloat(processedWorkspace.tier3Price) : null;
    }
    
    const workspaceWithTimestamps = {
      ...processedWorkspace,
      createdAt: now,
      updatedAt: now,
    };
    
    console.log("Creating workspace with data:", workspaceWithTimestamps);
    
    const result = await db.insert(workspaces)
      .values(workspaceWithTimestamps as any) // Type cast for timestamps
      .returning();
    return result[0];
  }

  async updateWorkspace(id: number, workspaceUpdate: Partial<InsertWorkspace>): Promise<Workspace> {
    // Set updatedAt
    const now = new Date();
    
    // Process the update data
    let processedUpdate = {...workspaceUpdate};
    
    // Convert monthlyPrice from string to number if it's a string
    if (typeof processedUpdate.monthlyPrice === 'string') {
      processedUpdate.monthlyPrice = parseFloat(processedUpdate.monthlyPrice);
    }
    
    // Convert tier pricing fields from string to number if they're strings
    if (typeof processedUpdate.tier1Price === 'string') {
      processedUpdate.tier1Price = processedUpdate.tier1Price ? parseFloat(processedUpdate.tier1Price) : null;
    }
    if (typeof processedUpdate.tier2Price === 'string') {
      processedUpdate.tier2Price = processedUpdate.tier2Price ? parseFloat(processedUpdate.tier2Price) : null;
    }
    if (typeof processedUpdate.tier3Price === 'string') {
      processedUpdate.tier3Price = processedUpdate.tier3Price ? parseFloat(processedUpdate.tier3Price) : null;
    }
    
    const updateData = { 
      ...processedUpdate, 
      updatedAt: now
    };
    
    console.log("Updating workspace with data:", updateData);
    
    const result = await db.update(workspaces)
      .set(updateData as any) // Type cast for updatedAt
      .where(eq(workspaces.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Workspace with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteWorkspace(id: number): Promise<void> {
    await db.delete(workspaces).where(eq(workspaces.id, id));
  }

  // Sales Person operations
  async getAllSalesPersons(): Promise<SalesPerson[]> {
    return await db.select().from(salesPersons).orderBy(desc(salesPersons.createdAt));
  }

  async getSalesPersonById(id: number): Promise<SalesPerson | undefined> {
    const result = await db.select().from(salesPersons).where(eq(salesPersons.id, id));
    return result[0];
  }

  async getSalesPersonsByLocationId(locationId: number): Promise<SalesPerson[]> {
    return await db.select().from(salesPersons)
      .where(and(
        or(eq(salesPersons.locationId, locationId), isNull(salesPersons.locationId)),
        eq(salesPersons.isActive, true)
      ))
      .orderBy(salesPersons.name);
  }

  async createSalesPerson(insertSalesPerson: InsertSalesPerson): Promise<SalesPerson> {
    const result = await db.insert(salesPersons).values(insertSalesPerson).returning();
    return result[0];
  }

  async updateSalesPerson(id: number, salesPersonUpdate: Partial<InsertSalesPerson>): Promise<SalesPerson> {
    const result = await db.update(salesPersons)
      .set({ ...salesPersonUpdate, updatedAt: new Date() })
      .where(eq(salesPersons.id, id))
      .returning();
    return result[0];
  }

  async deleteSalesPerson(id: number): Promise<void> {
    await db.delete(salesPersons).where(eq(salesPersons.id, id));
  }

  // Pricing Catalog operations
  async getAllPricingCatalog(): Promise<PricingCatalog[]> {
    return await db.select().from(pricingCatalog).orderBy(desc(pricingCatalog.createdAt));
  }

  async getPricingCatalogByLocationId(locationId: number): Promise<PricingCatalog[]> {
    return await db.select().from(pricingCatalog)
      .where(and(
        eq(pricingCatalog.locationId, locationId),
        eq(pricingCatalog.isActive, true)
      ))
      .orderBy(pricingCatalog.serviceName);
  }

  async getPricingCatalogById(id: number): Promise<PricingCatalog | undefined> {
    const result = await db.select().from(pricingCatalog).where(eq(pricingCatalog.id, id));
    return result[0];
  }

  async createPricingCatalog(insertCatalog: InsertPricingCatalog): Promise<PricingCatalog> {
    const now = new Date();
    const catalogWithTimestamps = {
      ...insertCatalog,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.insert(pricingCatalog).values(catalogWithTimestamps as any).returning();
    return result[0];
  }

  async updatePricingCatalog(id: number, catalogUpdate: Partial<InsertPricingCatalog>): Promise<PricingCatalog> {
    const result = await db.update(pricingCatalog)
      .set({ ...catalogUpdate, updatedAt: new Date() })
      .where(eq(pricingCatalog.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Pricing catalog with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deletePricingCatalog(id: number): Promise<void> {
    await db.delete(pricingCatalog).where(eq(pricingCatalog.id, id));
  }

  // Order operations
  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getOrderByOrderId(orderId: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.orderId, orderId));
    return result[0];
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const now = new Date();
    const orderWithTimestamps = {
      ...insertOrder,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.insert(orders).values(orderWithTimestamps as any).returning();
    return result[0];
  }

  async updateOrder(id: number, orderUpdate: Partial<InsertOrder>): Promise<Order> {
    const result = await db.update(orders)
      .set({ ...orderUpdate, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    return result[0];
  }

  async updateOrderByOrderId(orderId: string, orderUpdate: Partial<InsertOrder>): Promise<Order> {
    const result = await db.update(orders)
      .set({ ...orderUpdate, updatedAt: new Date() })
      .where(eq(orders.orderId, orderId))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Order with order ID ${orderId} not found`);
    }
    
    return result[0];
  }

  async updateOrderByPaymentId(paymentId: string, orderUpdate: Partial<InsertOrder>): Promise<Order> {
    const result = await db.update(orders)
      .set({ ...orderUpdate, updatedAt: new Date() })
      .where(eq(orders.paymentId, paymentId))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Order with payment ID ${paymentId} not found`);
    }
    
    return result[0];
  }

  // DocuKit Category operations
  async getAllDocukitCategories(): Promise<DocukitCategory[]> {
    return await db.select().from(docukitCategories).orderBy(docukitCategories.name);
  }

  async getDocukitCategoryById(id: number): Promise<DocukitCategory | undefined> {
    const result = await db.select().from(docukitCategories).where(eq(docukitCategories.id, id));
    return result[0];
  }

  async getDocukitCategoryBySlug(slug: string): Promise<DocukitCategory | undefined> {
    const result = await db.select().from(docukitCategories).where(eq(docukitCategories.slug, slug));
    return result[0];
  }

  async createDocukitCategory(category: InsertDocukitCategory): Promise<DocukitCategory> {
    const result = await db.insert(docukitCategories).values(category).returning();
    return result[0];
  }

  async updateDocukitCategory(id: number, categoryUpdate: Partial<InsertDocukitCategory>): Promise<DocukitCategory> {
    const result = await db.update(docukitCategories)
      .set({ ...categoryUpdate, updatedAt: new Date() })
      .where(eq(docukitCategories.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteDocukitCategory(id: number): Promise<void> {
    await db.delete(docukitCategories).where(eq(docukitCategories.id, id));
  }

  // DocuKit Template operations
  async getAllDocukitTemplates(): Promise<DocukitTemplate[]> {
    return await db.select().from(docukitTemplates).orderBy(desc(docukitTemplates.createdAt));
  }

  async getDocukitTemplateById(id: number): Promise<DocukitTemplate | undefined> {
    const result = await db.select().from(docukitTemplates).where(eq(docukitTemplates.id, id));
    return result[0];
  }

  async getDocukitTemplateBySlug(slug: string): Promise<DocukitTemplate | undefined> {
    const result = await db.select().from(docukitTemplates).where(eq(docukitTemplates.slug, slug));
    return result[0];
  }

  async getDocukitTemplateWithCategoryBySlug(categorySlug: string, templateSlug: string): Promise<any | undefined> {
    const result = await db
      .select({
        id: docukitTemplates.id,
        title: docukitTemplates.title,
        slug: docukitTemplates.slug,
        description: docukitTemplates.description,
        categoryId: docukitTemplates.categoryId,
        downloadUrl: docukitTemplates.downloadUrl,
        previewUrl: docukitTemplates.previewUrl,
        formats: docukitTemplates.formats,
        features: docukitTemplates.features,
        downloadCount: docukitTemplates.downloadCount,
        rating: docukitTemplates.rating,
        ratingCount: docukitTemplates.ratingCount,
        isPopular: docukitTemplates.isPopular,
        isActive: docukitTemplates.isActive,
        categoryName: docukitCategories.name,
        categorySlug: docukitCategories.slug,
      })
      .from(docukitTemplates)
      .innerJoin(docukitCategories, eq(docukitTemplates.categoryId, docukitCategories.id))
      .where(
        and(
          eq(docukitTemplates.slug, templateSlug),
          eq(docukitCategories.slug, categorySlug),
          eq(docukitTemplates.isActive, true)
        )
      );
    
    return result[0];
  }

  async getDocukitTemplatesByCategoryId(categoryId: number): Promise<DocukitTemplate[]> {
    return await db.select().from(docukitTemplates)
      .where(eq(docukitTemplates.categoryId, categoryId))
      .orderBy(desc(docukitTemplates.downloadCount));
  }

  async createDocukitTemplate(template: InsertDocukitTemplate): Promise<DocukitTemplate> {
    const result = await db.insert(docukitTemplates).values(template).returning();
    return result[0];
  }

  async updateDocukitTemplate(id: number, templateUpdate: Partial<InsertDocukitTemplate>): Promise<DocukitTemplate> {
    const result = await db.update(docukitTemplates)
      .set({ ...templateUpdate, updatedAt: new Date() })
      .where(eq(docukitTemplates.id, id))
      .returning();
    
    if (!result || result.length === 0) {
      throw new Error(`Template with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteDocukitTemplate(id: number): Promise<void> {
    await db.delete(docukitTemplates).where(eq(docukitTemplates.id, id));
  }

  async incrementTemplateDownload(id: number): Promise<void> {
    await db.update(docukitTemplates)
      .set({ downloadCount: sql`${docukitTemplates.downloadCount} + 1` })
      .where(eq(docukitTemplates.id, id));
  }

  // Company Search operations
  async getAllCompanySearchHistory(): Promise<CompanySearch[]> {
    return await db.select().from(companySearchHistory).orderBy(desc(companySearchHistory.searchedAt));
  }

  async getCompanySearchHistoryByCin(cin: string): Promise<CompanySearch | undefined> {
    const result = await db.select().from(companySearchHistory).where(eq(companySearchHistory.cin, cin));
    return result[0];
  }

  async createCompanySearchHistory(companySearch: InsertCompanySearch): Promise<CompanySearch> {
    const result = await db.insert(companySearchHistory).values(companySearch).returning();
    return result[0];
  }

  // Company operations
  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.id, id));
    return result[0];
  }

  async getCompanyByCin(cin: string): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.cin, cin));
    return result[0];
  }

  async getCompanyBySlug(slug: string): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.slug, slug));
    return result[0];
  }

  async searchCompanies(query: string, limit: number = 20): Promise<Company[]> {
    const searchQuery = `%${query}%`;
    
    return await db
      .select()
      .from(companies)
      .where(
        or(
          ilike(companies.companyName, searchQuery),
          ilike(companies.cin, searchQuery),
          ilike(companies.companyStateCode, searchQuery),
          ilike(companies.companyIndustrialClassification, searchQuery),
          ilike(companies.registeredOfficeAddress, searchQuery)
        )
      )
      .orderBy(desc(companies.createdAt))
      .limit(limit);
  }

  async getCompaniesCount(): Promise<number> {
    const result = await db.select({ count: count() }).from(companies);
    return result[0].count;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const result = await db.insert(companies).values(company).returning();
    return result[0];
  }

  async getActiveCompaniesCount(): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(companies)
      .where(eq(companies.companyStatus, 'Active'));
    return result[0].count;
  }

  async getRecentlyAddedCompaniesCount(): Promise<number> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await db
      .select({ count: count() })
      .from(companies)
      .where(sql`${companies.createdAt} >= ${oneDayAgo}`);
    return result[0].count;
  }

  async getAllCompanyCins(): Promise<string[]> {
    const result = await db.select({ cin: companies.cin }).from(companies);
    return result.map(row => row.cin);
  }

  // SimplySetup/Comply User operations
  async getComplyUser(id: number): Promise<ComplyUser | undefined> {
    const result = await db.select().from(complyUsers).where(eq(complyUsers.id, id));
    return result[0];
  }

  async getComplyUserByEmail(email: string): Promise<ComplyUser | undefined> {
    const result = await db.select().from(complyUsers).where(eq(complyUsers.email, email));
    return result[0];
  }

  async createComplyUser(insertUser: Omit<InsertComplyUser, 'password'> & { passwordHash: string }): Promise<ComplyUser> {
    const result = await db.insert(complyUsers).values(insertUser).returning();
    return result[0];
  }

  async updateComplyUser(id: number, updateData: Partial<InsertComplyUser>): Promise<ComplyUser> {
    const result = await db
      .update(complyUsers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(complyUsers.id, id))
      .returning();
    return result[0];
  }

  async updateComplyUserPassword(id: number, hashedPassword: string): Promise<ComplyUser> {
    const result = await db
      .update(complyUsers)
      .set({ passwordHash: hashedPassword, updatedAt: new Date() })
      .where(eq(complyUsers.id, id))
      .returning();
    return result[0];
  }

  // GST Certificate operations
  async getGstCertificatesByUserId(userId: number): Promise<GstCertificate[]> {
    return db.select().from(gstCertificates).where(eq(gstCertificates.userId, userId)).orderBy(desc(gstCertificates.uploadedAt));
  }

  async getGstCertificateById(id: number): Promise<GstCertificate | undefined> {
    const result = await db.select().from(gstCertificates).where(eq(gstCertificates.id, id));
    return result[0];
  }

  async createGstCertificate(insertCertificate: InsertGstCertificate): Promise<GstCertificate> {
    const result = await db.insert(gstCertificates).values(insertCertificate).returning();
    return result[0];
  }

  async updateGstCertificate(id: number, updateData: Partial<InsertGstCertificate>): Promise<GstCertificate> {
    const result = await db
      .update(gstCertificates)
      .set(updateData)
      .where(eq(gstCertificates.id, id))
      .returning();
    return result[0];
  }

  async deleteGstCertificate(id: number): Promise<void> {
    await db.delete(gstCertificates).where(eq(gstCertificates.id, id));
  }

  // GST Filing operations
  async getGstFilingsByUserId(userId: number): Promise<GstFiling[]> {
    return db.select().from(gstFilings).where(eq(gstFilings.userId, userId)).orderBy(desc(gstFilings.dueDate));
  }

  async getGstFilingById(id: number): Promise<GstFiling | undefined> {
    const result = await db.select().from(gstFilings).where(eq(gstFilings.id, id));
    return result[0];
  }

  async getGstFilingsByGstin(gstin: string): Promise<GstFiling[]> {
    return db.select().from(gstFilings).where(eq(gstFilings.gstin, gstin)).orderBy(desc(gstFilings.dueDate));
  }

  async createGstFiling(insertFiling: InsertGstFiling): Promise<GstFiling> {
    const result = await db.insert(gstFilings).values(insertFiling).returning();
    return result[0];
  }

  async updateGstFiling(id: number, updateData: Partial<InsertGstFiling>): Promise<GstFiling> {
    const result = await db
      .update(gstFilings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(gstFilings.id, id))
      .returning();
    return result[0];
  }

  async deleteGstFiling(id: number): Promise<void> {
    await db.delete(gstFilings).where(eq(gstFilings.id, id));
  }

  async getOverdueFilings(): Promise<GstFiling[]> {
    const currentDate = new Date();
    return db.select().from(gstFilings)
      .where(and(
        sql`${gstFilings.dueDate} < ${currentDate}`,
        eq(gstFilings.status, 'not_filed')
      ))
      .orderBy(gstFilings.dueDate);
  }

  async getUpcomingFilings(days: number): Promise<GstFiling[]> {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
    return db.select().from(gstFilings)
      .where(and(
        sql`${gstFilings.dueDate} BETWEEN ${currentDate} AND ${futureDate}`,
        eq(gstFilings.status, 'not_filed')
      ))
      .orderBy(gstFilings.dueDate);
  }

  // GST Reminder operations
  async getGstRemindersByUserId(userId: number): Promise<GstReminder[]> {
    return db.select().from(gstReminders).where(eq(gstReminders.userId, userId)).orderBy(desc(gstReminders.scheduledAt));
  }

  async getGstReminderById(id: number): Promise<GstReminder | undefined> {
    const result = await db.select().from(gstReminders).where(eq(gstReminders.id, id));
    return result[0];
  }

  async createGstReminder(insertReminder: InsertGstReminder): Promise<GstReminder> {
    const result = await db.insert(gstReminders).values(insertReminder).returning();
    return result[0];
  }

  async updateGstReminder(id: number, updateData: Partial<InsertGstReminder>): Promise<GstReminder> {
    const result = await db
      .update(gstReminders)
      .set(updateData)
      .where(eq(gstReminders.id, id))
      .returning();
    return result[0];
  }

  async deleteGstReminder(id: number): Promise<void> {
    await db.delete(gstReminders).where(eq(gstReminders.id, id));
  }

  async getPendingReminders(): Promise<GstReminder[]> {
    const currentDate = new Date();
    return db.select().from(gstReminders)
      .where(and(
        sql`${gstReminders.scheduledAt} <= ${currentDate}`,
        eq(gstReminders.status, 'scheduled')
      ))
      .orderBy(gstReminders.scheduledAt);
  }

  // Alert operations
  async getAllAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts).orderBy(desc(alerts.createdAt));
  }

  async getActiveAlerts(): Promise<Alert[]> {
    const now = new Date();
    return await db
      .select()
      .from(alerts)
      .where(
        and(
          eq(alerts.isActive, true),
          or(isNull(alerts.endDate), sql`${alerts.endDate} > ${now}`)
        )
      )
      .orderBy(desc(alerts.priority), desc(alerts.createdAt));
  }

  async getAlertById(id: number): Promise<Alert | undefined> {
    const [alert] = await db.select().from(alerts).where(eq(alerts.id, id));
    return alert;
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const [alert] = await db.insert(alerts).values(insertAlert).returning();
    return alert;
  }

  async updateAlert(id: number, updateData: Partial<InsertAlert>): Promise<Alert> {
    const [updatedAlert] = await db
      .update(alerts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(alerts.id, id))
      .returning();
    return updatedAlert;
  }

  async deleteAlert(id: number): Promise<void> {
    await db.delete(alerts).where(eq(alerts.id, id));
  }
  
  // Offer operations
  async getAllOffers(): Promise<Offer[]> {
    return await db.select().from(offers).orderBy(offers.sortOrder, desc(offers.createdAt));
  }

  async getActiveOffers(): Promise<Offer[]> {
    return await db
      .select()
      .from(offers)
      .where(eq(offers.isActive, true))
      .orderBy(offers.sortOrder, desc(offers.createdAt));
  }

  async getOfferById(id: number): Promise<Offer | undefined> {
    const [offer] = await db.select().from(offers).where(eq(offers.id, id));
    return offer;
  }

  async createOffer(insertOffer: InsertOffer): Promise<Offer> {
    const [offer] = await db.insert(offers).values(insertOffer).returning();
    return offer;
  }

  async updateOffer(id: number, updateData: Partial<InsertOffer>): Promise<Offer> {
    const [updatedOffer] = await db
      .update(offers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(offers.id, id))
      .returning();
    return updatedOffer;
  }

  async deleteOffer(id: number): Promise<void> {
    await db.delete(offers).where(eq(offers.id, id));
  }

  // Menu Management operations
  async getAllMenuSections(): Promise<MenuSection[]> {
    return await db.select().from(menuSections).orderBy(menuSections.displayOrder);
  }

  async getMenuSectionsByCountry(countryCode: string): Promise<MenuSection[]> {
    return await db
      .select()
      .from(menuSections)
      .where(eq(menuSections.countryCode, countryCode))
      .orderBy(menuSections.displayOrder);
  }

  async getMenuSectionById(id: number): Promise<MenuSection | undefined> {
    const [section] = await db.select().from(menuSections).where(eq(menuSections.id, id));
    return section;
  }

  async createMenuSection(section: InsertMenuSection): Promise<MenuSection> {
    const [newSection] = await db.insert(menuSections).values(section).returning();
    return newSection;
  }

  async updateMenuSection(id: number, updateData: Partial<InsertMenuSection>): Promise<MenuSection> {
    const [updatedSection] = await db
      .update(menuSections)
      .set(updateData)
      .where(eq(menuSections.id, id))
      .returning();
    return updatedSection;
  }

  async deleteMenuSection(id: number): Promise<void> {
    await db.delete(menuSections).where(eq(menuSections.id, id));
  }

  async getMenuItemsBySection(sectionId: number): Promise<MenuItem[]> {
    return await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.sectionId, sectionId))
      .orderBy(menuItems.displayOrder);
  }

  async getMenuItemById(id: number): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async updateMenuItem(id: number, updateData: Partial<InsertMenuItem>): Promise<MenuItem> {
    const [updatedItem] = await db
      .update(menuItems)
      .set(updateData)
      .where(eq(menuItems.id, id))
      .returning();
    return updatedItem;
  }

  async deleteMenuItem(id: number): Promise<void> {
    await db.delete(menuItems).where(eq(menuItems.id, id));
  }

  // Services Module operations
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getServicesByCountry(countryCode: string): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(and(eq(services.countryCode, countryCode), eq(services.isActive, true)));
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Service Order operations
  async getAllServiceOrders(): Promise<ServiceOrder[]> {
    return await db
      .select({
        ...serviceOrders,
        service: services
      })
      .from(serviceOrders)
      .leftJoin(services, eq(serviceOrders.serviceId, services.id))
      .orderBy(desc(serviceOrders.createdAt));
  }

  async getServiceOrderById(id: number): Promise<ServiceOrder | undefined> {
    const [order] = await db.select().from(serviceOrders).where(eq(serviceOrders.id, id));
    return order;
  }

  async getServiceOrderByOrderId(orderId: string): Promise<ServiceOrder | undefined> {
    const [order] = await db.select().from(serviceOrders).where(eq(serviceOrders.orderId, orderId));
    return order;
  }

  async getServiceOrdersByService(serviceId: number): Promise<ServiceOrder[]> {
    return await db
      .select()
      .from(serviceOrders)
      .where(eq(serviceOrders.serviceId, serviceId))
      .orderBy(desc(serviceOrders.createdAt));
  }

  async getServiceOrdersByCustomerEmail(customerEmail: string): Promise<ServiceOrder[]> {
    return await db
      .select()
      .from(serviceOrders)
      .where(eq(serviceOrders.customerEmail, customerEmail))
      .orderBy(desc(serviceOrders.createdAt));
  }

  async createServiceOrder(order: InsertServiceOrder): Promise<ServiceOrder> {
    const [newOrder] = await db.insert(serviceOrders).values(order).returning();
    return newOrder;
  }

  async updateServiceOrder(id: number, updateData: Partial<InsertServiceOrder>): Promise<ServiceOrder> {
    const [updatedOrder] = await db
      .update(serviceOrders)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(serviceOrders.id, id))
      .returning();
    return updatedOrder;
  }

  async updateServiceOrderByOrderId(orderId: string, updateData: Partial<InsertServiceOrder>): Promise<ServiceOrder> {
    const [updatedOrder] = await db
      .update(serviceOrders)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(serviceOrders.orderId, orderId))
      .returning();
    return updatedOrder;
  }

  async getServiceOrdersByPaymentStatus(status: string): Promise<ServiceOrder[]> {
    return await db
      .select()
      .from(serviceOrders)
      .where(eq(serviceOrders.paymentStatus, status))
      .orderBy(desc(serviceOrders.createdAt));
  }

  async getServiceOrdersByOrderStatus(status: string): Promise<ServiceOrder[]> {
    return await db
      .select()
      .from(serviceOrders)
      .where(eq(serviceOrders.orderStatus, status))
      .orderBy(desc(serviceOrders.createdAt));
  }

  // Dynamic Pages operations
  async getAllDynamicPages(): Promise<DynamicPage[]> {
    return await db.select().from(dynamicPages).orderBy(desc(dynamicPages.createdAt));
  }

  async getDynamicPageById(id: number): Promise<DynamicPage | undefined> {
    const [page] = await db.select().from(dynamicPages).where(eq(dynamicPages.id, id));
    return page;
  }

  async getDynamicPageBySlug(slug: string): Promise<DynamicPage | undefined> {
    const [page] = await db.select().from(dynamicPages).where(eq(dynamicPages.slug, slug));
    return page;
  }

  async createDynamicPage(page: InsertDynamicPage): Promise<DynamicPage> {
    const [newPage] = await db.insert(dynamicPages).values(page).returning();
    return newPage;
  }

  async createDynamicPagesBulk(pages: InsertDynamicPage[]): Promise<DynamicPage[]> {
    if (pages.length === 0) return [];
    const newPages = await db.insert(dynamicPages).values(pages).returning();
    return newPages;
  }

  async updateDynamicPage(id: number, updateData: Partial<InsertDynamicPage>): Promise<DynamicPage> {
    const [updatedPage] = await db
      .update(dynamicPages)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(dynamicPages.id, id))
      .returning();
    return updatedPage;
  }

  async deleteDynamicPage(id: number): Promise<void> {
    await db.delete(dynamicPages).where(eq(dynamicPages.id, id));
  }

  async deleteDynamicPagesBulk(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(dynamicPages).where(sql`${dynamicPages.id} = ANY(${ids})`);
  }

  // SimplySetup Lead operations
  async getAllSimplySetupLeads(): Promise<SimplySetupLead[]> {
    return await db.select().from(simplySetupLeads).orderBy(desc(simplySetupLeads.createdAt));
  }

  async getSimplySetupLeadById(id: number): Promise<SimplySetupLead | undefined> {
    const [lead] = await db.select().from(simplySetupLeads).where(eq(simplySetupLeads.id, id));
    return lead;
  }

  async getSimplySetupLeadBySessionId(sessionId: string): Promise<SimplySetupLead | undefined> {
    const [lead] = await db.select().from(simplySetupLeads).where(eq(simplySetupLeads.sessionId, sessionId));
    return lead;
  }

  async createSimplySetupLead(lead: InsertSimplySetupLead): Promise<SimplySetupLead> {
    const [newLead] = await db.insert(simplySetupLeads).values(lead).returning();
    return newLead;
  }

  async updateSimplySetupLead(id: number, updateData: Partial<InsertSimplySetupLead>): Promise<SimplySetupLead> {
    const [updatedLead] = await db
      .update(simplySetupLeads)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(simplySetupLeads.id, id))
      .returning();
    return updatedLead;
  }

  async updateSimplySetupLeadBySessionId(sessionId: string, updateData: Partial<InsertSimplySetupLead>): Promise<SimplySetupLead> {
    const [updatedLead] = await db
      .update(simplySetupLeads)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(simplySetupLeads.sessionId, sessionId))
      .returning();
    return updatedLead;
  }

  async deleteSimplySetupLead(id: number): Promise<void> {
    await db.delete(simplySetupLeads).where(eq(simplySetupLeads.id, id));
  }

  async getSimplySetupLeadsByStatus(status: string): Promise<SimplySetupLead[]> {
    return await db
      .select()
      .from(simplySetupLeads)
      .where(eq(simplySetupLeads.status, status))
      .orderBy(desc(simplySetupLeads.createdAt));
  }

  // SimplySetup Document operations
  async getSimplySetupDocumentsByLeadId(leadId: number): Promise<SimplySetupDocument[]> {
    return await db
      .select()
      .from(simplySetupDocuments)
      .where(eq(simplySetupDocuments.leadId, leadId))
      .orderBy(desc(simplySetupDocuments.uploadedAt));
  }

  async getSimplySetupDocumentById(id: number): Promise<SimplySetupDocument | undefined> {
    const [document] = await db.select().from(simplySetupDocuments).where(eq(simplySetupDocuments.id, id));
    return document;
  }

  async createSimplySetupDocument(document: InsertSimplySetupDocument): Promise<SimplySetupDocument> {
    const [newDocument] = await db.insert(simplySetupDocuments).values(document).returning();
    return newDocument;
  }

  async updateSimplySetupDocument(id: number, updateData: Partial<InsertSimplySetupDocument>): Promise<SimplySetupDocument> {
    const [updatedDocument] = await db
      .update(simplySetupDocuments)
      .set(updateData)
      .where(eq(simplySetupDocuments.id, id))
      .returning();
    return updatedDocument;
  }

  async deleteSimplySetupDocument(id: number): Promise<void> {
    await db.delete(simplySetupDocuments).where(eq(simplySetupDocuments.id, id));
  }
}

export const storage = new DatabaseStorage();
