/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/images/**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'mixed-decls'],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Permissions-Policy',
  //           value: 'push=(self)'
  //         }
  //       ]
  //     }
  //   ]
  // },
};

export default nextConfig;
