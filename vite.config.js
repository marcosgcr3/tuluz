import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      let inlinedHtml = html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          const cssContent = chunk.source;
          // Replace stylesheet link tag with inlined style tag
          const linkRegex = new RegExp(`<link[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*${fileName}["'][^>]*>`, 'gi');
          if (linkRegex.test(inlinedHtml)) {
            inlinedHtml = inlinedHtml.replace(linkRegex, `<style>${cssContent}</style>`);
          } else {
            // Alternatively replace any link referencing fileName
            const genericLinkRegex = new RegExp(`<link[^>]*href=["'][^"']*${fileName}["'][^>]*>`, 'gi');
            inlinedHtml = inlinedHtml.replace(genericLinkRegex, `<style>${cssContent}</style>`);
          }
        }
      }
      return inlinedHtml;
    }
  };
}

export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    }
  }
});
