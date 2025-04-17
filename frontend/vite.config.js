import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api/v1": "https://medicare-booking-backend.vercel.app",
    },
  },
  plugins: [tailwindcss(), react()],
});
