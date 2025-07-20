import { Metadata } from 'next'
import { seoMetadata } from './constants'

// Generate comprehensive metadata for pages
export const generateMetadata = (
  title?: string,
  description?: string,
  path?: string,
  image?: string
): Metadata => {
  const pageTitle = title ? `${title} | AUXO Data Co.` : seoMetadata.title
  const pageDescription = description || seoMetadata.description
  const pageUrl = path ? `${seoMetadata.url}${path}` : seoMetadata.url
  const pageImage = image || seoMetadata.ogImage

  return {
    metadataBase: new URL(seoMetadata.url),
    title: pageTitle,
    description: pageDescription,
    keywords: seoMetadata.keywords,
    authors: [{ name: "AUXO Data Co." }],
    creator: "AUXO Data Co.",
    publisher: "AUXO Data Co.",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: "website",
      url: pageUrl,
      siteName: "AUXO Data Co.",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

// JSON-LD structured data generators
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AUXO Data Co.",
  description: "Strategic data intelligence and consulting",
  url: seoMetadata.url,
  logo: `${seoMetadata.url}/logo.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
  sameAs: [],
})

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AUXO Data Co.",
  url: seoMetadata.url,
  description: seoMetadata.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${seoMetadata.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})

export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Strategic Data Intelligence",
  description: "Data frameworks that deliver a single source of truth, converting operational complexity into strategic dominance",
  provider: {
    "@type": "Organization",
    name: "AUXO Data Co.",
    url: seoMetadata.url,
  },
  serviceType: "Data Strategy Consulting",
  areaServed: "Global",
})

// SEO optimization utilities
export const optimizeForSearch = {
  // Generate breadcrumb schema
  generateBreadcrumbSchema: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  // Generate FAQ schema
  generateFAQSchema: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  // Generate article schema
  generateArticleSchema: (title: string, description: string, publishDate: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "AUXO Data Co.",
    },
    publisher: {
      "@type": "Organization",
      name: "AUXO Data Co.",
      logo: {
        "@type": "ImageObject",
        url: `${seoMetadata.url}/logo.svg`,
      },
    },
    datePublished: publishDate,
    dateModified: publishDate,
  }),
}