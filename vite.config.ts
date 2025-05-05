import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    // Less aggressive minification to avoid antivirus flags
    minify: 'terser',
    terserOptions: {
      compress: {
        // Reduce optimization levels to prevent suspicious-looking code
        sequences: false,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: false,
        drop_console: false,
      },
      mangle: {
        // Keep variable names slightly more readable
        toplevel: false,
      },
      format: {
        // Improve readability of output
        comments: false,
        beautify: false,
      },
    },
    rollupOptions: {
      output: {
        // Split chunks to avoid large files that might trigger antivirus
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
