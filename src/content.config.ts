// Visibility Spec-enforced schema for the blog collection.
// Every post must declare these fields. Zod fails the build if anything is missing,
// so you cannot accidentally publish a post without proper SEO metadata.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

      // Optional categorisation
      category: z
        .enum([
          'performance',
          'commentary',
          'essays',
          'tutorials',
        ])
        .optional(),
      tags: z.array(z.string()).default([]),

      // Set true to hide from listings (useful for drafts you want deployed but not surfaced)
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
