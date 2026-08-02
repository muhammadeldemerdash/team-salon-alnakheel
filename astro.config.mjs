import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://teamsalon-alnakheel.sa",
  output: "static",
  trailingSlash: "never",
  compressHTML: false,
  build: {
    format: "file"
  }
});
