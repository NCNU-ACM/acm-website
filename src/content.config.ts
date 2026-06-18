import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const groups = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/groups' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    order: z.number(),
    tagline: z.string(),
    description: z.string(),
    color: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    group: z.string(),
    type: z.enum(['招募', '演講', '競賽', '工作坊', '其他']),
    location: z.string().optional(),
    description: z.string(),
    registration: z.string().optional(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/members' }),
  schema: z.object({
    name: z.string(),
    group: z.string().optional(),
    role: z.string(),
    bio: z.string().optional(),
    contact: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

const showcase = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/showcase' }),
  schema: z.object({
    title: z.string(),
    group: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

export const collections = {
  groups,
  events,
  members,
  showcase,
};