/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'food-ordering-app11.s3.eu-north-1.amazonaws.com',
            },
        ]
    }
};

export default nextConfig;
