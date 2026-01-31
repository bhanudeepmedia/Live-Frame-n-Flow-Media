import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    type?: string;
    schema?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    image = '/og-image.jpg', // Default OG image
    type = 'website',
    noindex = false,
    schema
}) => {
    const siteUrl = 'https://framenflowmedia.in';
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    const defaultKeywords = "AI Marketing Agency, Digital Marketing USA, Marketing Agency India, Strategy First Marketing, AI Visuals, Growth Automation, Frame n Flow Media";

    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Frame n Flow Media",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "description": description,
        "areaServed": ["United States", "United Kingdom", "India", "Europe"],
        "founder": {
            "@type": "Person",
            "name": "Bhanu Deep"
        },
        "sameAs": [
            "https://twitter.com/framenflow",
            "https://linkedin.com/company/framenflow"
        ]
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={defaultKeywords} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullCanonical} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Schema.org for Google */}
            <script type="application/ld+json">
                {JSON.stringify(schema || defaultSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
