import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",

  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    devtools(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "CNAME",
          dest: "./",
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
