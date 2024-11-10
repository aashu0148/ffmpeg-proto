import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@api": "/src/api",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@context": "/src/context",
    },
  },
  define: {
    global: {},
  },
});
