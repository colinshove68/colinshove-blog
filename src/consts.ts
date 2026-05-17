// Site-wide constants. Edit here and they update everywhere.

export const SITE_TITLE = "Colin Shove's Blog";
export const SITE_TAGLINE =
  'Ideas to help small businesses perform better. Personal blog, no affiliation, no products to sell.';
export const SITE_DESCRIPTION =
  'Ideas to help small businesses perform better. Personal blog, no affiliation, no products to sell.';
export const SITE_URL = 'https://colinshove.com';

export const AUTHOR = {
  name: 'Colin Shove',
  url: 'https://colinshove.com',
  jobTitle: 'Web Designer and Developer',
  sameAs: [
    // Add LinkedIn, GitHub, etc. as you publish them.
  ],
};

// Used by Open Graph, Twitter cards, and the default hero fallback.
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

// Audience filter labels. Order here = order on the homepage filter strip.
// Slugs are used in URLs and frontmatter, labels are what readers see.
export const AUDIENCES = [
  { slug: 'local-businesses', label: 'Local Businesses' },
  { slug: 'professional-services', label: 'Professional Services' },
  { slug: 'trades', label: 'Trades' },
  { slug: 'salons', label: 'Salons' },
] as const;

export type AudienceSlug = (typeof AUDIENCES)[number]['slug'];

// Zapier webhook for newsletter signups and download requests.
export const ZAPIER_WEBHOOK_URL =
  'https://hooks.zapier.com/hooks/catch/8754155/4obb9h6/';

// HyvorTalk configuration for comments.
// Sign up at https://talk.hyvor.com/, add colinshove.com as a website,
// then paste your numeric Website ID here. Free tier supports up to
// 5,000 page views per month.
export const HYVORTALK = {
  enabled: true,
  websiteId: '15426',
};
