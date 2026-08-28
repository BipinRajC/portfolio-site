import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'research', 'shipped', 'paused']),
    tags: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        paper: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .default({}),
    /** 1..3 — order on the homepage Selected Work block */
    featured: z.number().optional(),
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
