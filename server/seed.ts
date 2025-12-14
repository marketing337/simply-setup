import { db } from './db';
import { locations, offices, testimonials } from '@shared/schema';
import { indianCitiesData } from '../client/src/lib/indianCities';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');
  
  try {
    // Seed locations from our list of Indian cities
    console.log('Seeding locations...');
    
    // Create an array to hold all location insert operations
    const locationInserts = [];
    
    for (const city of indianCitiesData) {
      // First check if the location already exists (by slug)
      const existingLocation = await db.select().from(locations).where(eq(locations.slug, city.slug));
      
      if (existingLocation.length === 0) {
        locationInserts.push({
          name: city.name,
          slug: city.slug,
          description: city.description,
          heroImage: city.heroImage || "https://images.unsplash.com/photo-1601954554599-d8a3035b3ad8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          officeImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
          mainAddress: city.mainAddress,
          phoneNumber: city.phoneNumber,
          email: city.email
        });
      }
    }
    
    if (locationInserts.length > 0) {
      await db.insert(locations).values(locationInserts);
      console.log(`Inserted ${locationInserts.length} new locations`);
    } else {
      console.log('No new locations to insert');
    }
    
    // Add sample offices and testimonials for some major cities
    console.log('Seeding offices and testimonials...');
    
    // Find Pune location
    const puneLocation = await db.select().from(locations).where(eq(locations.slug, 'pune'));
    
    if (puneLocation.length > 0) {
      const puneLocationId = puneLocation[0].id;
      
      // Check if offices already exist for Pune
      const existingPuneOffices = await db.select().from(offices).where(eq(offices.locationId, puneLocationId));
      
      if (existingPuneOffices.length === 0) {
        // Add offices for Pune
        await db.insert(offices).values([
          {
            locationId: puneLocationId,
            name: "Pune Business Hub",
            address: "Koregaon Park, Pune, Maharashtra",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            features: ["Premium business address", "Private meeting rooms", "Mail handling services", "Reception services"],
            badge: "Premium",
            badgeColor: "blue"
          },
          {
            locationId: puneLocationId,
            name: "Pune Tech Park",
            address: "Hinjewadi Phase 1, Pune, Maharashtra",
            image: "https://images.unsplash.com/photo-1622126824536-75eb8df91054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
            features: ["IT hub address", "Conference facilities", "Mail forwarding", "Business lounge access"],
            badge: "Popular",
            badgeColor: "green"
          },
          {
            locationId: puneLocationId,
            name: "Pune Downtown Center",
            address: "FC Road, Pune, Maharashtra",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            features: ["Downtown landmark address", "Meeting room credits", "Mail collection & scanning", "Virtual receptionist"],
            badge: "Central",
            badgeColor: "amber"
          }
        ]);
        console.log('Added offices for Pune');
      }
      
      // Check if testimonials already exist for Pune
      const existingPuneTestimonials = await db.select().from(testimonials).where(eq(testimonials.locationId, puneLocationId));
      
      if (existingPuneTestimonials.length === 0) {
        // Add testimonials for Pune
        await db.insert(testimonials).values([
          {
            locationId: puneLocationId,
            name: "Priya Sharma",
            company: "TechInnovate Solutions",
            content: "Having a prestigious business address in Pune's Koregaon Park has dramatically improved our brand perception. The mail handling and meeting room facilities are excellent, and the staff is always professional.",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
            rating: 5
          },
          {
            locationId: puneLocationId,
            name: "Rahul Desai",
            company: "GrowthFirst Ventures",
            content: "As a startup in Pune's competitive market, having a virtual office has given us credibility without the overhead. The professional call answering service ensures we never miss important client calls.",
            avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            rating: 5
          },
          {
            locationId: puneLocationId,
            name: "Anita Patel",
            company: "Global Business Consultants",
            content: "We expanded to Pune last year and the virtual office service made our transition seamless. The meeting rooms are perfect for client meetings, and having a local presence has helped us win more business.",
            avatar: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            rating: 4
          }
        ]);
        console.log('Added testimonials for Pune');
      }
    }
    
    // Find Mumbai location
    const mumbaiLocation = await db.select().from(locations).where(eq(locations.slug, 'mumbai'));
    
    if (mumbaiLocation.length > 0) {
      const mumbaiLocationId = mumbaiLocation[0].id;
      
      // Check if offices already exist for Mumbai
      const existingMumbaiOffices = await db.select().from(offices).where(eq(offices.locationId, mumbaiLocationId));
      
      if (existingMumbaiOffices.length === 0) {
        // Add offices for Mumbai
        await db.insert(offices).values([
          {
            locationId: mumbaiLocationId,
            name: "Mumbai Financial Center",
            address: "Bandra Kurla Complex, Mumbai, Maharashtra",
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            features: ["Prime financial district address", "Executive meeting rooms", "Mail forwarding services", "Professional receptionist"],
            badge: "Premium",
            badgeColor: "blue"
          },
          {
            locationId: mumbaiLocationId,
            name: "Mumbai Business Hub",
            address: "Andheri East, Mumbai, Maharashtra",
            image: "https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            features: ["Well-connected location", "Conference rooms", "Mail handling", "Business support services"],
            badge: "Popular",
            badgeColor: "green"
          }
        ]);
        console.log('Added offices for Mumbai');
      }
    }
    
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function if this file is executed directly
// We're using ESM, so we don't check for require.main
// This only runs when the function is imported and called manually

export default seed;