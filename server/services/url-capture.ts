import { storage } from "../storage";
import type { InsertCapturedUrl } from "@shared/schema";

// URL detection regex patterns
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
const DOMAIN_REGEX = /^https?:\/\/(?:www\.)?([^\/]+)/;

export interface DetectedUrl {
  url: string;
  domain: string;
  linkText?: string;
  linkType: 'internal' | 'external' | 'inbound' | 'outbound';
  startIndex: number;
  endIndex: number;
}

export class UrlCaptureService {
  private currentDomain: string;

  constructor(currentDomain: string = 'aaddress.in') {
    this.currentDomain = currentDomain;
  }

  /**
   * Extract URLs from text content
   */
  extractUrls(content: string): DetectedUrl[] {
    const urls: DetectedUrl[] = [];
    let match;

    while ((match = URL_REGEX.exec(content)) !== null) {
      const url = match[0];
      const domain = this.extractDomain(url);
      const linkType = this.determineLinkType(domain);

      urls.push({
        url,
        domain,
        linkType,
        startIndex: match.index,
        endIndex: match.index + url.length
      });
    }

    return urls;
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    const match = url.match(DOMAIN_REGEX);
    return match ? match[1] : new URL(url).hostname;
  }

  /**
   * Determine if URL is internal or external
   */
  private determineLinkType(domain: string): 'internal' | 'external' | 'inbound' | 'outbound' {
    if (domain === this.currentDomain || domain === `www.${this.currentDomain}`) {
      return 'internal';
    }
    return 'external'; // For now, treat all external links as outbound
  }

  /**
   * Convert plain URLs to clickable links with proper SEO attributes
   */
  linkifyContent(content: string): string {
    return content.replace(URL_REGEX, (url) => {
      const domain = this.extractDomain(url);
      const linkType = this.determineLinkType(domain);
      
      // Build link attributes
      const attributes: string[] = [];
      
      // Add target="_blank" for external links
      if (linkType === 'external') {
        attributes.push('target="_blank"');
        attributes.push('rel="noopener noreferrer"');
      }
      
      // Add nofollow for certain domains (can be configured)
      if (this.shouldAddNoFollow(domain)) {
        const existingRel = attributes.find(attr => attr.startsWith('rel='));
        if (existingRel) {
          const relIndex = attributes.indexOf(existingRel);
          attributes[relIndex] = existingRel.replace('"', ' nofollow"');
        } else {
          attributes.push('rel="nofollow"');
        }
      }

      const attributeString = attributes.length > 0 ? ` ${attributes.join(' ')}` : '';
      return `<a href="${url}"${attributeString}>${url}</a>`;
    });
  }

  /**
   * Determine if a domain should have nofollow attribute
   */
  private shouldAddNoFollow(domain: string): boolean {
    // Add domains that should be nofollowed
    const nofollowDomains = [
      'facebook.com',
      'twitter.com',
      'instagram.com',
      'linkedin.com'
    ];
    
    return nofollowDomains.some(nofollowDomain => 
      domain.includes(nofollowDomain)
    );
  }

  /**
   * Capture URLs from blog post content and store in database
   */
  async captureUrlsFromBlogPost(blogPostId: number, content: string): Promise<void> {
    const urls = this.extractUrls(content);
    
    // Clear existing captured URLs for this blog post
    const existingUrls = await storage.getCapturedUrlsByBlogPostId(blogPostId);
    for (const existingUrl of existingUrls) {
      await storage.deleteCapturedUrl(existingUrl.id);
    }

    // Insert new captured URLs
    for (const detectedUrl of urls) {
      const capturedUrl: InsertCapturedUrl = {
        blogPostId,
        url: detectedUrl.url,
        domain: detectedUrl.domain,
        linkType: detectedUrl.linkType,
        linkText: detectedUrl.linkText,
        isNoFollow: this.shouldAddNoFollow(detectedUrl.domain),
        isSponsored: false,
        status: 'active'
      };

      await storage.createCapturedUrl(capturedUrl);
    }
  }

  /**
   * Get SEO link analysis for a blog post
   */
  async getLinkAnalysis(blogPostId: number) {
    const capturedUrls = await storage.getCapturedUrlsByBlogPostId(blogPostId);
    
    const analysis = {
      totalLinks: capturedUrls.length,
      internalLinks: capturedUrls.filter(url => url.linkType === 'internal').length,
      externalLinks: capturedUrls.filter(url => url.linkType === 'external').length,
      nofollowLinks: capturedUrls.filter(url => url.isNoFollow).length,
      domains: [...new Set(capturedUrls.map(url => url.domain))],
      topDomains: this.getTopDomains(capturedUrls),
      recommendations: this.generateSEORecommendations(capturedUrls)
    };

    return analysis;
  }

  /**
   * Get top domains by link count
   */
  private getTopDomains(urls: any[]) {
    const domainCounts = urls.reduce((acc, url) => {
      acc[url.domain] = (acc[url.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count }));
  }

  /**
   * Generate SEO recommendations based on link analysis
   */
  private generateSEORecommendations(urls: any[]): string[] {
    const recommendations: string[] = [];
    
    const internalCount = urls.filter(url => url.linkType === 'internal').length;
    const externalCount = urls.filter(url => url.linkType === 'external').length;
    const totalCount = urls.length;

    if (totalCount === 0) {
      recommendations.push("Consider adding relevant links to improve SEO and user experience");
    }

    if (internalCount < externalCount) {
      recommendations.push("Consider adding more internal links to improve site navigation and SEO");
    }

    if (externalCount > 0 && internalCount === 0) {
      recommendations.push("Add internal links to keep users on your website longer");
    }

    if (totalCount > 10) {
      recommendations.push("Consider reducing the number of external links to maintain link juice");
    }

    return recommendations;
  }
}

// Export singleton instance
export const urlCaptureService = new UrlCaptureService();