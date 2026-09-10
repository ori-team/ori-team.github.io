import { defineConfig } from "astro/config";
// @unocss/astro quebra o build com Vite 8/rolldown ("reading 'get'");
// o plugin Vite direto funciona — ver uno.config.ts.
import UnoCSS from "unocss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Deploy: GitHub Pages da org (https://ori-team.github.io/oriteam-website/).
  // Links internos usam src/lib/url.ts para respeitar este base.
  site: "https://ori-team.github.io",
  base: "/oriteam-website",
  vite: {
    plugins: [UnoCSS()],
  },
  integrations: [mdx(), sitemap()],
});
