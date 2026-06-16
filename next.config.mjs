/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Generates static HTML files for File Manager upload
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true, // ✅ Required for static export (next/image still works visually)
  },
  
  // ✅ Optional but recommended for subfolder hosting
  // Uncomment these IF you upload to theintegrty.com/portfolio
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio',
  
  trailingSlash: true, // ✅ Helps with routing on shared hosting
};

export default nextConfig;