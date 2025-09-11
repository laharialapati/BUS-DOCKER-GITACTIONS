// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/busbooking/',  // <-- set this to your context path
  plugins: [react()],
});
