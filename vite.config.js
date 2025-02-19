import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    allowedHosts: [
      'c099-106-213-81-56.ngrok-free.app'
    ]
  },

  theme: {
    
    extend: {
      keyframes: {
       
      },
     
      
     
    },
  },
});
