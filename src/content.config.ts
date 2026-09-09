import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Domain the project belongs to (e.g. SECURITY, AI, BLOCKCHAIN) */
    domain: z.array(z.string()).default([]),
    /** Technical capability it demonstrates (e.g. MACHINE LEARNING, FULL STACK) */
    capability: z.array(z.string()).default([]),
    /** Work type (e.g. RESEARCH) */
    workType: z.array(z.string()).default([]),
    /** Search-only technical concepts/keywords (not shown as visible tags) */
    keywords: z.array(z.string()).default([]),
    /** Optional project-specific metadata strip (TYPE / STATUS / ROLE / DOMAIN) */
    meta: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    github: z.string().url().optional(),
    deployed: z.string().url().optional(),
    /** Visual source + treatment type */
    visual: z
      .object({
        type: z.enum(['screenshot', 'screenshot-atmosphere', 'conceptual', 'composite']),
        source: z.string().optional(),
        alt: z.string().optional(),
      })
      .optional(),
    /** Show in the /projects atlas (false = homepage-only item) */
    atlas: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
