import svgr from "vite-plugin-svgr";
import { vitePlugin as remix } from "@remix-run/dev";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  plugins: [remix(), tsconfigPaths()],
  plugins: [remix(), tsconfigPaths(), svgr()],
});
