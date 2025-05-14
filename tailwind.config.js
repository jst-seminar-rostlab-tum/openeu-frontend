/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}', // Tailwind will scan all relevant files in src/
  ],
  theme: {
    extend: {}, // Empty, ready to extend later
  },
  plugins: [], // No plugins yet
};
