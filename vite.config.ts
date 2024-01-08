import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/transfermarkt": {
        target: "https://transfermarkt-api.vercel.app/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/transfermarkt/, ""),
      },
    },
  },
  plugins: [react()],
});
