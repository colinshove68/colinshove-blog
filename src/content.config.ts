// Visibility Spec-enforced schema for the blog collection.
// Every post must declare these fields. Zod fails the build if anything is missing,
// so you cannot accidentally publish a post without proper SEO metadata.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const audienceSlug = z.enum([
  'local-businesses',
  'professional-services',
  'trades',
  'salons',
]);

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      // Display title (what readers see at the top of the post)
      title: z.string().max(80),

      // SEO title (what shows in the <title> tag and search results)
      seoTitle: z.string().max(60),

      // Meta description, capped at the length Google typically renders
      metaDescription: z.string().min(70).max(160),

      // Slug must match the filename. Used in canonical URLs and breadcrumbs.
      slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),

      // Dates
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      // Authorship
      author: z.string().default('Colin Shove'),

      // Search intent: informational, commercial, transactional, navigational
      intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),

      // What this post is trying to make the reader do
      goal: z.string().min(10),

      // Keyword strategy
      primaryKeyword: z.string().min(2),
      secondaryKeywords: z.array(z.string()).default([]),

      // Hero image (required, with required alt text)
      heroImage: image(),
      heroImageAlt: z.string().min(5),

      // Audience targeting (drives the homepage filter)
      // At least one required. Use all four if the post is genuinely for everyone.
      audiences: z.array(audienceSlug).min(1),

      // Optional freeform tags for cross-cutting topics
      tags: z.array(z.string()).default([]),

      // Optional downloadable assets (PDFs, DOCX, XLSX, ZIP, audio).
      // Each download is gated by an email form before the link reveals.
      downloads: z
        .array(
          z.object({
            id: z.string().regex(/^[a-z0-9-]+$/, 'download id must be kebab-case'),
            label: z.string(),
            description: z.string().optional(),
            file: z.string().startsWith('/'), // e.g. "/downloads/your-file.pdf"
            fileType: z.string().optional(), // "PDF", "DOCX", etc. Auto-derived if missing.
            size: z.string().optional(), // "2.4 MB"
          })
        )
        .default([]),

      // Set true to hide from listings (useful for drafts you want deployed but not surfaced)
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
