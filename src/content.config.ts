import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categories } from './data/categories';

const categorySlugs = categories.map((c) => c.slug) as [string, ...string[]];

const techniques = defineCollection({
  loader: glob({ base: './src/content/techniques', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** MITRE ATT&CK id, e.g. T1055.012 */
    mitre: z.string(),
    category: z.enum(categorySlugs),
    /** breadcrumb segment between the category and the page */
    group: z.string().optional(),
    summary: z.string(),
    platform: z.array(z.enum(['Windows', 'Linux', 'macOS'])).nonempty(),
    /** pill row under the breadcrumb, after the MITRE id and platforms */
    tags: z.array(z.string()).default([]),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'use YYYY-MM-DD'),
    author: z.string(),
    /** overrides the default https://github.com/<author> profile link */
    authorUrl: z.string().url().optional(),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
    /** ordered API chain rendered above the reference implementation */
    callChain: z
      .array(z.object({ call: z.string(), desc: z.string(), dll: z.string() }))
      .default([]),
    /** detection cards; every merged page must ship at least one */
    detections: z.array(z.object({ src: z.string(), text: z.string() })).default([]),
    related: z
      .array(z.object({ mitre: z.string(), title: z.string(), desc: z.string(), href: z.string().optional() }))
      .default([]),
    labKit: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

export const collections = { techniques };
