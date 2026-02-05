import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to pre-render with specific Metadata
const routes = [
  {
    path: '/',
    // Use default title/desc from index.html, or override here if needed
  },
  {
    path: '/about',
    title: "About Frame n Flow Media | Strategy-First Marketing Agency",
    description: "Frame n Flow Media is a strategy-first marketing agency founded in 2025 by Bhanu Deep. We specialize in business intelligence, performance marketing, AI product visuals, and growth systems."
  },
  {
    path: '/approach',
    title: "Our Approach | Frame n Flow Media",
    description: "Our strategy-first approach bridges the gap between creative chaos and business logic. Market Research, Growth Systems, and AI execution."
  },
  {
    path: '/services',
    title: "Services | Frame n Flow Media - Marketing & AI",
    description: "Explore our services: Business Intelligence, AI Visuals, Performance Marketing, and Automated Growth Systems."
  },
  {
    path: '/contact',
    title: "Contact Us | Frame n Flow Media - Book Your Strategy Call",
    description: "Schedule a free marketing audit with Frame n Flow Media. We analyze your funnel, identify leaks, and propose a roadmap for growth."
  },
  {
    path: '/founder-bhanudeep',
    title: "Founder Bhanu Deep | Frame n Flow Media",
    description: "Meet Bhanu Deep, the founder and chief strategist behind Frame n Flow Media."
  },
  {
    path: '/work',
    title: "Our Work | Frame n Flow Media",
    description: "Case studies and success stories from Frame n Flow Media clients."
  },
  {
    path: '/insights',
    title: "Insights | Frame n Flow Media",
    description: "Marketing insights, trends, and strategies for business growth."
  },
  {
    path: '/product-marketing',
    title: "Product & Review Marketing | Frame n Flow Media",
    description: "Scale your E-Commerce or Retail Brand with high-fidelity AI Visuals and ROAS-focused acquisition systems."
  },
  {
    path: '/service-marketing',
    title: "Service Business Marketing | Frame n Flow Media",
    description: "High-Ticket Lead Generation for Service Businesses. Local SEO, Automated Booking Systems, and Reputation Management."
  },
  {
    path: '/startup-marketing',
    title: "Startup Growth Marketing | Frame n Flow Media",
    description: "Go-to-Market Strategies for Startups. MVP Validation, Growth Hacking, and Investor-Ready Traction Metrics."
  },
  {
    path: '/realtor-marketing',
    title: "Real Estate Marketing | Frame n Flow Media",
    description: "Luxury Real Estate Marketing. Cinematic Property Tours, Lead Qualification, and Personal Branding for Top Agents."
  },
  {
    path: '/privacy-policy',
    title: "Privacy Policy | Frame n Flow Media",
    description: "Privacy Policy for Frame n Flow Media."
  },
  {
    path: '/terms-of-service',
    title: "Terms of Service | Frame n Flow Media",
    description: "Terms of Service for Frame n Flow Media."
  },
  { path: '/growth-partner' },
  { path: '/growth-partner/apply' },
  { path: '/growth-partner/signup' },
  { path: '/growth-partner/login' }
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('🚀 Starting static page generation...');

try {
  // Read the base index.html
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Generate static HTML for each route
  routes.forEach(routeConfig => {
    const route = routeConfig.path;
    const routePath = route === '/' ? '' : route;
    const outputDir = path.join(distDir, routePath);
    const outputFile = path.join(outputDir, 'index.html');

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Parse HTML and inject meta tags based on route
    const root = parse(baseHtml);
    const head = root.querySelector('head');

    if (head) {
      // Update Title
      if (routeConfig.title) {
        const titleTag = root.querySelector('title');
        if (titleTag) {
          titleTag.set_content(routeConfig.title);
        } else {
          head.insertAdjacentHTML('afterbegin', `<title>${routeConfig.title}</title>`);
        }
        // Update OG Title
        const ogTitle = root.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', routeConfig.title);
        // Update Twitter Title
        const twTitle = root.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', routeConfig.title);
      }

      // Update Description (and OG/Twitter Description)
      if (routeConfig.description) {
        const descMeta = root.querySelector('meta[name="description"]');
        if (descMeta) {
          descMeta.setAttribute('content', routeConfig.description);
        } else {
          head.insertAdjacentHTML('beforeend', `<meta name="description" content="${routeConfig.description}" />`);
        }
        // Update OG Description
        const ogDesc = root.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', routeConfig.description);
        // Update Twitter Description
        const twDesc = root.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', routeConfig.description);
      }

      // Add canonical URL with trailing slash (to match directory structure behavior)
      const canonicalUrl = `https://framenflowmedia.in${route === '/' ? '/' : (route.endsWith('/') ? route : route + '/')}`;
      // Remove existing canonical to avoid duplicates if present in base
      const existingCanonical = root.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.setAttribute('href', canonicalUrl);
      } else {
        head.insertAdjacentHTML('beforeend', `<link rel="canonical" href="${canonicalUrl}" />`);
      }

      // Add route-specific schema logic if needed
      if (route === '/growth-partner') {
        const programSchema = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          "name": "Growth Partner Program",
          "description": "Performance-based partnership where individuals connect qualified leads with Frame n Flow Media and earn 20-30% commission",
          "provider": {
            "@type": "Organization",
            "name": "Frame n Flow Media",
            "url": "https://framenflowmedia.in"
          },
          "occupationalCredentialAwarded": "Growth Partner",
          "offers": {
            "@type": "Offer",
            "category": "Commission-based partnership",
            "description": "20-30% commission on successful client conversions"
          }
        }
        </script>`;
        head.insertAdjacentHTML('beforeend', programSchema);
      }
    }

    // Write the file
    fs.writeFileSync(outputFile, root.toString(), 'utf-8');
    console.log(`✅ Generated: ${outputFile} | ${routeConfig.title || 'Default Title'}`);
  });

  console.log('✨ Static page generation complete!');

} catch (error) {
  console.error('Error in static generation:', error);
}
