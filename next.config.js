/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ["pages", "app", "components", "lib", "src", "cypress"],
    },
}

module.exports = nextConfig
