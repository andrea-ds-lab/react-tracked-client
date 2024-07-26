// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket': {
        target: 'ws://localhost:4000',
        ws: true
      }
    }
  }
});
