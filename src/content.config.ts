import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Páginas de detalhe geradas por scripts/sync-readmes.mjs (generated: true).
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { projects };
