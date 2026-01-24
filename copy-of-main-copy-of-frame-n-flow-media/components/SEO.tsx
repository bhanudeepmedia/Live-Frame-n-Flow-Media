import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    type?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    image = '/og-image.jpg', // Default OG image
    type = 'website'
}) => {
    const siteUrl = 'https://framenflow.media'; // Assuming this is the domain, or replace with actual
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
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
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Frame n Flow Media",
                    "url": siteUrl,
                    "logo": `${siteUrl}/logo.png`,
                    "description": description,
                    "sameAs": [
                        "https://twitter.com/framenflow",
                        "https://linkedin.com/company/framenflow"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
