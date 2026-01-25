import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

/**
 * Vite plugin to generate .txt and .json mirror endpoints for all pages
 * Runs after build to extract content from rendered HTML
 */
export default function generateMirrorEndpoints() {
    return {
        name: 'generate-mirror-endpoints',
        closeBundle() {
            const distDir = path.resolve(process.cwd(), 'dist');

            // Routes to process
            const routes = [
                { path: '/', name: 'home' },
                { path: '/approach', name: 'approach' },
                { path: '/services', name: 'services' },
                { path: '/contact', name: 'contact' },
                { path: '/founder-bhanudeep', name: 'founder' },
                { path: '/work', name: 'work' },
                { path: '/insights', name: 'insights' },
                { path: '/growth-partner', name: 'growth-partner' },
            ];

            console.log('\n📄 Generating mirror endpoints (.txt and .json)...\n');

            routes.forEach(({ path: routePath, name }) => {
                const htmlPath = routePath === '/'
                    ? path.join(distDir, 'index.html')
                    : path.join(distDir, routePath.slice(1), 'index.html');

                if (!fs.existsSync(htmlPath)) {
                    console.warn(`⚠️  HTML not found for ${routePath}, skipping...`);
                    return;
                }

                const html = fs.readFileSync(htmlPath, 'utf-8');
                const root = parse(html);

                // Extract content
                const title = root.querySelector('title')?.text || name;
                const metaDesc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';

                // Extract all text content (this will be populated by react-helmet-async)
                const sections = [];

                // Try to extract from meta tags first (since actual content is CSR)
                sections.push({
                    heading: title,
                    content: metaDesc
                });

                // Generate .txt file
                const txtContent = `${title}\n${'='.repeat(title.length)}\n\n${metaDesc}\n\nURL: https://framenflowmedia.in${routePath}\n\nNote: This is a client-side rendered React application. For full content, please visit the URL above or refer to the static documentation files:\n- /llms.txt\n- /ai.json\n- /growth-partner-program.md\n- /growth-partner-info.html`;

                const txtPath = path.join(distDir, `${name}.txt`);
                fs.writeFileSync(txtPath, txtContent, 'utf-8');
                console.log(`✅ Generated: ${name}.txt`);

                // Generate .json file
                const jsonContent = {
                    page: title,
                    url: `https://framenflowmedia.in${routePath}`,
                    description: metaDesc,
                    sections: sections,
                    note: "This is a client-side rendered React application. For complete content extraction, refer to static documentation files.",
                    staticResources: [
                        "https://framenflowmedia.in/llms.txt",
                        "https://framenflowmedia.in/ai.json",
                        "https://framenflowmedia.in/growth-partner-program.md",
                        "https://framenflowmedia.in/growth-partner-info.html"
                    ]
                };

                const jsonPath = path.join(distDir, `${name}.json`);
                fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf-8');
                console.log(`✅ Generated: ${name}.json`);
            });

            console.log('\n✨ Mirror endpoint generation complete!\n');
        }
    };
}
