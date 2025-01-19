import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    emoji: z.string().optional(),
    issue: z.number().optional(),
    image: z.string().optional(),
  }),
});

const software = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    emoji: z.string().optional(),
  }),
});

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, software, notes };
