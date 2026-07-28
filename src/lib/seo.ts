/**
 * Single source of truth for anything that ends up in <head> or structured data.
 * Change the domain here and canonicals, the sitemap, RSS and JSON-LD all follow.
 */

export const site = {
  name: 'maldev wiki',
  /** must match `site` in astro.config.ts */
  url: 'https://maldev.thehackersbrain.dev',
  tagline: 'Every technique, read from both sides.',
  description:
    'An open knowledge base for malware research — injection, evasion, persistence and C2, each technique paired with the detection logic that catches it.',
  locale: 'en_GB',
  /** 1200×630, served from our own origin */
  ogImage: '/og.png',
  repo: 'https://github.com/thehackersbrain/maldev-wiki',
  license: 'https://creativecommons.org/licenses/by-sa/4.0/',
} as const;

/** The person behind the wiki — credited in the footer and in structured data. */
export const creator = {
  name: 'Gaurav Raj',
  handle: 'thehackersbrain',
  url: 'https://github.com/thehackersbrain',
} as const;

const creatorPerson = {
  '@type': 'Person',
  name: creator.name,
  alternateName: `@${creator.handle}`,
  url: creator.url,
  sameAs: [creator.url],
};

/** Absolute URL for a path, without a trailing slash on nested routes. */
export function absolute(path: string, base: URL | string = site.url): string {
  return new URL(path, base).href;
}

interface ArticleMeta {
  title: string;
  description: string;
  updated: string;
  author: string;
  authorUrl?: string;
  mitre: string;
  platform: string[];
  tags: string[];
  category: string;
}

/** schema.org TechArticle — the closest fit for a documented technique. */
export function techArticleJsonLd(url: string, a: ArticleMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': url,
    headline: a.title,
    description: a.description,
    url,
    datePublished: a.updated,
    dateModified: a.updated,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: a.author,
      url: a.authorUrl ?? `https://github.com/${a.author}`,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      founder: creatorPerson,
    },
    isAccessibleForFree: true,
    license: site.license,
    /** the MITRE id is the strongest entity signal these pages carry */
    identifier: a.mitre,
    keywords: [a.mitre, a.category, ...a.platform, ...a.tags].join(', '),
    proficiencyLevel: 'Expert',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[], currentUrl: string) {
  // Intermediate crumbs without an href (grouping labels like "Image Replacement")
  // are navigational only — including them would repeat the current URL twice.
  const trail = items.filter((item, i) => item.href !== undefined || i === items.length - 1);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? absolute(item.href) : currentUrl,
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: 'en',
    creator: creatorPerson,
    author: creatorPerson,
    license: site.license,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function collectionJsonLd(url: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
  };
}
