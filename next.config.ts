import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok and network IP for HMR WebSocket connections
  allowedDevOrigins: ['ignition-harddisk-glaring.ngrok-free.dev', '192.168.110.95:3000', 'localhost:3000'],
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self "https://*.ngrok-free.dev" "https://*.ngrok.io" "http://localhost:3000"), camera=(self "https://*.ngrok-free.dev" "https://*.ngrok.io" "http://localhost:3000"), microphone=(self "https://*.ngrok-free.dev" "https://*.ngrok.io" "http://localhost:3000")',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
