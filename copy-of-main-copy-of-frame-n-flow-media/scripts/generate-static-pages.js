import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to pre-render
const routes = [
    '/',
    '/approach',
    '/services',
    '/contact',
    '/founder-bhanudeep',
    '/work',
    '/insights',
    '/growth-partner',
    '/growth-partner/apply',
    '/growth-partner/signup',
    '/growth-partner/login'
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('🚀 Starting static page generation...');

// Read the base index.html
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Generate static HTML for each route
routes.forEach(route => {
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
        // Add canonical URL
        const canonical = `<link rel="canonical" href="https://framenflowmedia.in${route}" />`;
        head.insertAdjacentHTML('beforeend', canonical);

        // Add Schema.org Organization markup (global)
        const orgSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Frame n Flow Media",
      "url": "https://framenflowmedia.in",
      "description": "AI-powered multimedia marketing agency focused on business research, growth strategy, and performance marketing.",
      "founder": {
        "@type": "Person",
        "name": "Bhanu Deep"
      }
    }
    </script>`;
        head.insertAdjacentHTML('beforeend', orgSchema);

        // Add route-specific schema
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
        "programPrerequisites": "Strong communication skills, self-motivated mindset",
        "financialAidEligible": false,
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
    console.log(`✅ Generated: ${outputFile}`);
});

console.log('✨ Static page generation complete!');
