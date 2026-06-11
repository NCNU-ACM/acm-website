import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const groups = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/groups' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    order: z.number(),
    active: z.boolean(),
    tagline: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    color: z.string(),
    resources: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
    recruit: z.object({
      open: z.boolean(),
      description: z.string(),
    }).optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    group: z.enum(['all', 'system', 'international', 'game', 'case']),
    type: z.enum(['招募', '演講', '競賽', '工作坊', '其他']),
    status: z.enum(['upcoming', 'past']),
    cover: z.string().optional(),
    location: z.string().optional(),
    description: z.string(),
    registration: z.string().optional(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/members' }),
  schema: z.object({
    name: z.string(),
    group: z.enum(['system', 'international', 'game', 'case']),
    role: z.string(),
    year: z.number(),
    avatar: z.string().optional(),
    active: z.boolean(),
    contact: z.object({
      github: z.string().optional(),
      instagram: z.string().optional(),
      email: z.string().optional(),
    }).optional(),
  }),
});

const showcase = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/showcase' }),
  schema: z.object({
    title: z.string(),
    group: z.enum(['system', 'international', 'game', 'case']),
    date: z.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    group: z.enum(['all', 'system', 'international', 'game', 'case']),
    pinned: z.boolean().default(false),
  }),
});

export const collections = {
  groups,
  events,
  members,
  showcase,
  announcements,
};