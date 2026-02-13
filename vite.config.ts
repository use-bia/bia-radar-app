import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
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
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "BIA Radar App",
        short_name: "BIA Radar",
        description: "A radar chart app for BIA data visualization.",
        theme_color: "#050505",
        lang: "pt-BR",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
