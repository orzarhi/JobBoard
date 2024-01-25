/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'oegrx3lglebik03y.public.blob.vercel-storage.com'
            }
        ]
    }
}

module.exports = nextConfig
