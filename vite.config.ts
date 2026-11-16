import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig(({ command }) => {
  if (command === "serve" && !process.env.VITEST) {
    return {
      root: resolve(__dirname, "dev"),
      server: {
        port: 5173,
        open: false,
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
    };
  }

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: resolve(__dirname, "dist"),
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "src/hoas-light-widget.ts"),
        name: "HoasLightWidget",
        formats: ["es"],
        fileName: () => "hoas-light-widget.js",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  };
});
