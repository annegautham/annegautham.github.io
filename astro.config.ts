import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

export default defineConfig({
  site: SITE.website,
  output: "static",
  integrations: [
    tailwind({ applyBaseStyles: false }), 
    react(), 
    mdx({
      remarkPlugins: [
        remarkMath, // Process math FIRST
        remarkToc,
        remarkReadingTime,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkMath,
      remarkReadingTime,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
  // image: {
  //   service: {
  //     entrypoint: "astro/assets/services/static",
  //   },
  // },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
