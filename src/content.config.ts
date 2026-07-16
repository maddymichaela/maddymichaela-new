import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  // Legacy journal collection. New personal work should live in "projects".
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const projects = defineCollection({
  // Main portfolio collection: work case studies and personal projects.
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx,mdoc}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(['work', 'personal']).default('personal'),
      personalCategory: z.enum(['cyberdeck', 'nas', 'crafts', 'other']).optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
    }),
});

const site = defineCollection({
  loader: file('src/site-config.yml'),
});

const cv = defineCollection({
  loader: file('src/content/cv.yml'),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    component: z.string().optional(),
    collection: z.string().optional(),
    limit: z.number().optional(),
    viewAllHref: z.string().optional(),
    viewAllLabel: z.string().optional(),
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          datetime: z.string().optional(),
          href: z.string().optional(),
        }),
      )
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog, cv, projects, site };
