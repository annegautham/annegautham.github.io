import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().optional(), // for sidebar sorting within subjects
    description: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    color: z.enum(['red', 'blue', 'green', 'purple', 'orange', 'teal', 'pink', 'indigo']).optional(), // color theme for the subject
  }),
});

export const collections = { blog, notes };
