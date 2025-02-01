import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://152.42.130.200:8086",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
