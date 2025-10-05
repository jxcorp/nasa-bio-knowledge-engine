// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url"; // Import fileURLToPath from 'url' module

// Get the equivalent of __filename and __dirname in an ES module
// This is the correct, robust way to define __dirname in a module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: `/`,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Use the correctly defined __dirname for the alias resolution
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  // Ensures Vite treats CSV files as simple assets (URLs) for fetching
  assetsInclude: ["**/*.csv"],
});
