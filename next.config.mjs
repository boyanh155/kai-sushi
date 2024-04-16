import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
       async rewrites() {
        return [{
            source: '/api/:path*',
            destination: 'https://www.kaisushilounge.com/:path*',
        }, ]
    },
}

const withNextIntl = createNextIntlPlugin("./src/libs/i18n.ts");

export default withNextIntl(nextConfig);