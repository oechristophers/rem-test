import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Use swc for faster React transforms
import svgr from 'vite-plugin-svgr'; // For optimized SVG imports
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    viteCompression()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [
      '@tabler/icons-react',
      'motion-react',
    ],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['@tabler/icons-react'], // Mark external icons for better tree-shaking
    },
  },
});
