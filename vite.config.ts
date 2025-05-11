import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "test.tehrantc.com",
    },
    plugins: [react(), tailwindcss(), basicSsl()],
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV), // Define global variable
    },
  };
});
