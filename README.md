# replit.md

## Overview

This project is a virtual office booking platform designed for the Indian market, facilitating GST registration and business establishment through virtual addresses. It functions as a marketplace connecting businesses with virtual office spaces across major Indian cities, featuring integrated payment processing, content management, and customer relationship functionalities. The platform aims to simplify business setup and compliance for Indian enterprises.

## User Preferences

Preferred communication style: Simple, everyday language.
Customer authentication design: Simplified forms requiring only Phone and Password for both login and registration.
UI requirements: Include navbar and footer on customer authentication pages.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript and Vite
- **Routing**: Wouter
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Components**: Radix UI primitives with Tailwind CSS via shadcn/ui
- **Styling**: Tailwind CSS with custom PostCSS
- **Performance**: Lazy loading, image optimization, content visibility optimizations
- **Design Decisions**: TASA Orbiter Font family (Text, Display, Deck variants, Medium and SemiBold weights) for typography; clean visual presentation with minimal branding in navigation.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM
- **Authentication**: Passport.js (local strategy, session management)
- **API Design**: RESTful APIs for CRUD operations

### Data Storage
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Session Storage**: Express sessions
- **File Storage**: Static file serving
- **Caching**: Browser-based caching with manual invalidation

### Key Features
- **Virtual Office Management**: Location-based listings, multi-tier pricing, geographic organization, vendor management.
- **Content Management System**: SEO-optimized blog, AI-powered content generation (OpenAI GPT-4o), document template management (DocuKit), URL capture and redirect system.
- **Business Tools**: Company search (CIN lookup), business calculators, lead capture (Zoho integration), WhatsApp integration.
- **Payment Processing**: Razorpay integration, order and pricing catalog management.
- **Administrative Interface**: Comprehensive dashboard, user authentication/authorization, data import/export, sales team management.
- **Customer Portal System**: Simplified customer account creation with phone/password authentication, customer dashboard for order tracking and service browsing, profile management, integrated with existing Comply authentication infrastructure.
- **GST Compliance System**: Dedicated user management, JWT-based authentication, document upload (PDF, DOC, XLS, images), OCR integration (Tesseract.js) for data extraction from certificates, simulated GSP API for filing history and due dates.
- **SEO Optimization**: Extensive structured data (Schema.org, JSON-LD), comprehensive meta tags, AI-friendly content sections, sitemap optimization with proper XML escaping and high priority for workspaces.
- **Security**: Content Security Policy, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options headers, proper form attributes and security notices for login forms.

## External Dependencies

- **Razorpay**: Payment gateway.
- **WhatsApp Business API**: Customer communication.
- **Zoho Forms**: Lead capture and CRM integration.
- **OpenAI GPT-4o**: AI for content generation and business advice.
- **Neon Database**: Serverless PostgreSQL.
- **Google Services**: Analytics, Search Console, site verification, Google Fonts (Montserrat, Open Sans - *note: replaced by TASA Orbiter, but listed in original dependencies*).
- **Radix UI**: UI component primitives.
- **Lucide Icons**: Iconography.
- **Tesseract.js**: OCR for GST certificate data extraction.