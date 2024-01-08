import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/transfermarkt": {
        target: "https://transfermarkt-api-psi.vercel.app/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/transfermarkt/, ""),
      },
      "/fotmob": {
        target: "https://www.fotmob.com/api/search/searchData?term=",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fotmob/, ""),
      },
    },
  },
  plugins: [react()],
});
