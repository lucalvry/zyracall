import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export type OGImageType = 'default' | 'comparison' | 'alternative' | 'rates' | 'about';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: object | object[];
  noIndex?: boolean;
  // Dynamic OG image properties
  ogImageTitle?: string;
  ogImageSubtitle?: string;
  ogImageType?: OGImageType;
}

// Generate dynamic OG image URL
export const generateOGImageUrl = (
  title: string,
  subtitle: string,
  type: OGImageType = 'default'
): string => {
  const params = new URLSearchParams({
    title,
    subtitle,
    type,
  });
  return `https://rixpasynhccgkoumpaan.supabase.co/functions/v1/og-image?${params.toString()}`;
};

// Organization schema for site-wide use
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZyraCall",
  url: "https://zyracall.com",
  logo: "https://zyracall.com/logo.png",
  description: "Browser-based international calling service with transparent pay-as-you-go pricing.",
  sameAs: [
    "https://twitter.com/zyracall",
    "https://facebook.com/zyracall",
    "https://linkedin.com/company/zyracall"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"]
  }
};

// WebSite schema for site-wide use
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZyraCall",
  url: "https://zyracall.com",
  description: "Make international calls from your browser. No app downloads, transparent pricing, 200+ countries.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zyracall.com/rates?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Helper to generate breadcrumb schema
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Helper to generate comparison page schema
export const generateComparisonSchema = (
  competitorName: string,
  pageUrl: string,
  zyraDescription: string,
  competitorDescription: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `ZyraCall vs ${competitorName} Comparison`,
  description: `Compare ZyraCall and ${competitorName} for international calling.`,
  url: pageUrl,
  about: [
    {
      "@type": "Thing",
      name: "Voice over IP",
      sameAs: "https://en.wikipedia.org/wiki/Voice_over_IP",
    },
    {
      "@type": "Thing",
      name: "International calling",
      sameAs: "https://en.wikipedia.org/wiki/International_call",
    },
  ],
  mentions: {
    "@type": "Thing",
    name: competitorName,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "VoIP Service Comparison",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "ZyraCall",
        description: zyraDescription,
        brand: { "@type": "Brand", name: "ZyraCall" },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          description: "Pay-as-you-go per-minute rates"
        }
      },
      {
        "@type": "Product",
        position: 2,
        name: competitorName,
        description: competitorDescription,
        brand: { "@type": "Brand", name: competitorName }
      }
    ]
  }
});

// Helper to generate alternative page schema
export const generateAlternativeSchema = (
  alternativeTo: string,
  pageUrl: string,
  description: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Best ${alternativeTo} Alternative for International Calls`,
  description,
  url: pageUrl,
  mainEntity: {
    "@type": "Product",
    name: "ZyraCall",
    description: `Browser-based international calling service as a ${alternativeTo} alternative`,
    brand: { "@type": "Brand", name: "ZyraCall" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: "Pay-as-you-go per-minute rates",
      availability: "https://schema.org/InStock"
    }
  }
});

// Helper to generate speakable schema for AI/voice assistant citation
export const generateSpeakableSchema = (
  pageUrl: string,
  pageName: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageName,
  url: pageUrl,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable]", "h1", "h2"]
  }
});

// Helper to generate HowTo schema
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: { name: string; text: string; url?: string }[],
  totalTime?: string
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  ...(totalTime && { totalTime }),
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.url && { url: step.url }),
  })),
});

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  breadcrumbs,
  structuredData,
  noIndex = false,
  ogImageTitle,
  ogImageSubtitle,
  ogImageType = 'default',
}: SEOHeadProps) => {
  const schemas: object[] = [];
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }
  
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemas.push(...structuredData);
    } else {
      schemas.push(structuredData);
    }
  }

  // Generate dynamic OG image if title/subtitle provided, otherwise use static ogImage
  const finalOgImage = ogImageTitle && ogImageSubtitle
    ? generateOGImageUrl(ogImageTitle, ogImageSubtitle, ogImageType)
    : ogImage || "https://zyracall.com/og-default.png";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ZyraCall" />
      <meta property="og:image" content={finalOgImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
