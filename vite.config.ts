import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:3000', // Replace with your API server URL
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       headers: {
  //         'Access-Control-Allow-Origin': '*', // Allow requests from any origin (change to specific origins if needed)
  //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //         'Access-Control-Allow-Headers':
  //           'Origin, X-Requested-With, Content-Type, Accept',
  //         'Access-Control-Allow-Credentials': 'true', // Set to 'true' if you want to allow credentials (cookies, authorization headers, etc.)
  //       },
  //     },
  //   },
  // },
});
