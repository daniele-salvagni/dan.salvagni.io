import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: ["*.md", "*.mdx"],
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    author: z.string().optional(),
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
  loader: glob({
    pattern: ["*.md", "*.mdx"],
    base: "./src/content/notes",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, software, notes };
