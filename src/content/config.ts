import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      banner: image(),
      description: z.string(),
      screenshots: z.array(image()),
      startedAt: z.number(),
      href: z.string().url().optional(),
      tags: z.array(z.string()),
      githubUrl: z.string().url().optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z.object({
      banner: image(),
      createdAt: z.string(),
      description: z.string(),
      href: z.string().url(),
      title: z.string(),
      publisher: z.string(),
      tags: z.array(z.string()).optional(),
      timeInMinutes: z.number().default(5),
    }),
});

export const collections = {
  projects,
  publications,
};
