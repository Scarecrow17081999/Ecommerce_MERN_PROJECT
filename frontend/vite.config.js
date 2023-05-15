import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // string shorthand for simple case
      "/api": "http://localhost:3000",
      // with options if you need to use change origin
    },
  },
  build: {
    /** If you set esmExternals to true, this plugins assumes that 
      all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
  },
});
// "proxy": "http://localhost:3000/"
