/**
 * Enhanced Sitemap Generator Script
 * 
 * This script generates comprehensive sitemap files for the website including:
 * - Main sitemap.xml (sitemap index)
 * - Static pages sitemap (sitemap-static.xml)
 * - Locations sitemap (sitemap-locations.xml)
 * - Areas sitemap (sitemap-areas.xml)
 * - Blog sitemap (sitemap-blog.xml)
 * - Workspaces sitemap (sitemap-workspaces.xml)
 * - Companies sitemaps (sitemap-companies-1.xml, sitemap-companies-2.xml, etc.)
 * 
 * Handles 400,000+ pages with Google's 50,000 URL per sitemap limit
 * 
 * Usage:
 * - Run this script with Node.js: node scripts/generate-sitemap.js
 * - Generated sitemaps will be placed in client/public/
 * 
 * Note: This script should be run regularly to keep sitemaps updated
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const MAX_URLS_PER_SITEMAP = 50000; // Google's limit
const baseUrl = 'https://simplysetup.com';

async function fetchLocations() {
  try {
    const result = await pool.query('SELECT slug FROM locations ORDER BY slug');
    return result.rows.map(row => row.slug);
  } catch (err) {
    console.error('Error fetching locations:', err);
    return [];
  }
}

async function fetchAreas() {
  try {
    const result = await pool.query(`
      SELECT a.slug as area_slug, l.slug as location_slug 
      FROM areas a
      JOIN locations l ON a.location_id = l.id
      ORDER BY l.slug, a.slug
    `);
    return result.rows.map(row => `${row.location_slug}/${row.area_slug}`);
  } catch (err) {
    console.error('Error fetching areas:', err);
    return [];
  }
}

async function fetchBlogPosts() {
  try {
    const result = await pool.query(`
      SELECT slug FROM blog_posts
      WHERE published = true
      ORDER BY slug
    `);
    return result.rows.map(row => `blog/${row.slug}`);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    return [];
  }
}

async function fetchWorkspaces() {
  try {
    const result = await pool.query(`
      SELECT slug FROM workspaces
      WHERE slug IS NOT NULL AND slug != ''
      ORDER BY slug
    `);
    return result.rows.map(row => `virtual-office/${row.slug}`);
  } catch (err) {
    console.error('Error fetching workspaces:', err);
    return [];
  }
}

async function fetchCompanies(limit = null, offset = 0) {
  try {
    let query = `
      SELECT slug
      FROM companies
      WHERE slug IS NOT NULL AND slug != ''
      ORDER BY slug
    `;
    
    if (limit) {
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    
    const result = await pool.query(query);
    return result.rows.map(row => `companies/${row.slug}`);
  } catch (err) {
    console.error('Error fetching companies:', err);
    return [];
  }
}

async function getCompanyCount() {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) as count
      FROM companies
      WHERE slug IS NOT NULL AND slug != ''
    `);
    return parseInt(result.rows[0].count);
  } catch (err) {
    console.error('Error getting company count:', err);
    return 0;
  }
}

function generateXmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateUrlEntry(url, changefreq = 'weekly', priority = '0.5', lastmod = null) {
  let entry = '  <url>\n';
  entry += `    <loc>${escapeXml(baseUrl)}/${escapeXml(url.replace(/^\//, ''))}</loc>\n`;
  entry += `    <changefreq>${changefreq}</changefreq>\n`;
  entry += `    <priority>${priority}</priority>\n`;
  if (lastmod) {
    entry += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  entry += '  </url>\n';
  return entry;
}

function generateSitemapIndex(sitemapFiles) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemapFiles.forEach(filename => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/${filename}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}

function generateStaticSitemap() {
  let xml = generateXmlHeader();
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // Homepage
    { url: 'blog', priority: '0.8', changefreq: 'daily' },
    { url: 'companies', priority: '0.8', changefreq: 'daily' },
    { url: 'partnership/awfis', priority: '0.6', changefreq: 'monthly' },
    { url: 'terms-of-service', priority: '0.5', changefreq: 'monthly' },
    { url: 'privacy-policy', priority: '0.5', changefreq: 'monthly' },
    { url: 'sitemap', priority: '0.4', changefreq: 'weekly' }
  ];
  
  staticPages.forEach(page => {
    xml += generateUrlEntry(page.url, page.changefreq, page.priority);
  });
  
  xml += '</urlset>';
  return xml;
}

function generateLocationsSitemap(locations) {
  let xml = generateXmlHeader();
  
  locations.forEach(slug => {
    xml += generateUrlEntry(slug, 'weekly', '0.9');
  });
  
  xml += '</urlset>';
  return xml;
}

function generateAreasSitemap(areas) {
  let xml = generateXmlHeader();
  
  areas.forEach(path => {
    xml += generateUrlEntry(path, 'weekly', '0.8');
  });
  
  xml += '</urlset>';
  return xml;
}

function generateBlogSitemap(blogPosts) {
  let xml = generateXmlHeader();
  
  blogPosts.forEach(path => {
    xml += generateUrlEntry(path, 'monthly', '0.7');
  });
  
  xml += '</urlset>';
  return xml;
}

function generateWorkspacesSitemap(workspaces) {
  let xml = generateXmlHeader();
  
  workspaces.forEach(path => {
    xml += generateUrlEntry(path, 'weekly', '0.9');
  });
  
  xml += '</urlset>';
  return xml;
}

function generateCompaniesSitemap(companies) {
  let xml = generateXmlHeader();
  
  companies.forEach(path => {
    xml += generateUrlEntry(path, 'monthly', '0.6');
  });
  
  xml += '</urlset>';
  return xml;
}

async function generateSitemap() {
  console.log('🚀 Starting comprehensive sitemap generation...');
  
  try {
    const outputDir = path.join(__dirname, '..', 'client', 'public');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const sitemapFiles = [];
    
    // 1. Generate static pages sitemap
    console.log('📄 Generating static pages sitemap...');
    const staticSitemap = generateStaticSitemap();
    const staticPath = path.join(outputDir, 'sitemap-static.xml');
    fs.writeFileSync(staticPath, staticSitemap);
    sitemapFiles.push('sitemap-static.xml');
    console.log('✅ Static pages sitemap generated');
    
    // 2. Generate locations sitemap
    console.log('🌍 Generating locations sitemap...');
    const locations = await fetchLocations();
    const locationsSitemap = generateLocationsSitemap(locations);
    const locationsPath = path.join(outputDir, 'sitemap-locations.xml');
    fs.writeFileSync(locationsPath, locationsSitemap);
    sitemapFiles.push('sitemap-locations.xml');
    console.log(`✅ Locations sitemap generated (${locations.length} locations)`);
    
    // 3. Generate areas sitemap
    console.log('🏢 Generating areas sitemap...');
    const areas = await fetchAreas();
    const areasSitemap = generateAreasSitemap(areas);
    const areasPath = path.join(outputDir, 'sitemap-areas.xml');
    fs.writeFileSync(areasPath, areasSitemap);
    sitemapFiles.push('sitemap-areas.xml');
    console.log(`✅ Areas sitemap generated (${areas.length} areas)`);
    
    // 4. Generate blog sitemap
    console.log('📝 Generating blog sitemap...');
    const blogPosts = await fetchBlogPosts();
    const blogSitemap = generateBlogSitemap(blogPosts);
    const blogPath = path.join(outputDir, 'sitemap-blog.xml');
    fs.writeFileSync(blogPath, blogSitemap);
    sitemapFiles.push('sitemap-blog.xml');
    console.log(`✅ Blog sitemap generated (${blogPosts.length} posts)`);
    
    // 5. Generate workspaces sitemap
    console.log('🏢 Generating workspaces sitemap...');
    const workspaces = await fetchWorkspaces();
    const workspacesSitemap = generateWorkspacesSitemap(workspaces);
    const workspacesPath = path.join(outputDir, 'sitemap-workspaces.xml');
    fs.writeFileSync(workspacesPath, workspacesSitemap);
    sitemapFiles.push('sitemap-workspaces.xml');
    console.log(`✅ Workspaces sitemap generated (${workspaces.length} workspaces)`);
    
    // 6. Generate companies sitemaps (chunked due to size)
    console.log('🏢 Generating companies sitemaps...');
    const totalCompanies = await getCompanyCount();
    console.log(`📊 Total companies to process: ${totalCompanies}`);
    
    const companyChunks = Math.ceil(totalCompanies / MAX_URLS_PER_SITEMAP);
    console.log(`📦 Splitting into ${companyChunks} sitemap files`);
    
    for (let i = 0; i < companyChunks; i++) {
      const offset = i * MAX_URLS_PER_SITEMAP;
      const companies = await fetchCompanies(MAX_URLS_PER_SITEMAP, offset);
      
      if (companies.length > 0) {
        const companiesSitemap = generateCompaniesSitemap(companies);
        const companiesPath = path.join(outputDir, `sitemap-companies-${i + 1}.xml`);
        fs.writeFileSync(companiesPath, companiesSitemap);
        sitemapFiles.push(`sitemap-companies-${i + 1}.xml`);
        console.log(`✅ Companies sitemap ${i + 1} generated (${companies.length} companies)`);
      }
    }
    
    // 7. Generate main sitemap index
    console.log('🗂️ Generating main sitemap index...');
    const sitemapIndex = generateSitemapIndex(sitemapFiles);
    const indexPath = path.join(outputDir, 'sitemap.xml');
    fs.writeFileSync(indexPath, sitemapIndex);
    console.log('✅ Main sitemap index generated');
    
    // Summary
    console.log('\n🎉 Sitemap generation completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • ${sitemapFiles.length} sitemap files generated`);
    console.log(`   • ${locations.length} location pages`);
    console.log(`   • ${areas.length} area pages`);
    console.log(`   • ${blogPosts.length} blog posts`);
    console.log(`   • ${workspaces.length} workspace pages`);
    console.log(`   • ${totalCompanies} company pages`);
    console.log(`   • Total URLs: ${locations.length + areas.length + blogPosts.length + workspaces.length + totalCompanies + 7} pages`);
    console.log(`   • All files saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  } finally {
    // Close database connection
    await pool.end();
  }
}

// Execute the function if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap().catch(console.error);
}

export { generateSitemap };