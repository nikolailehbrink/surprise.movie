import svgr from "vite-plugin-svgr";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
// Give vite the ability to resolve imports using TypeScript's path mapping, which is done in tsconfig.json
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    svgr(),
  ],
});
