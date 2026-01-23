/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#e2e8f0', // Slate 200 - Main text
                primaryHover: '#f8fafc', // Slate 50 - Hover text
                secondary: '#94a3b8', // Slate 400 - Muted accents
                background: '#0f172a', // Slate 900 - Deep blue background
                glass: 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity
                glassBorder: 'rgba(255, 255, 255, 0.08)',
            },
            fontFamily: {
                spectral: ['Spectral', 'serif'],
                merriweather: ['Merriweather', 'serif'],
            },
        },
    },
    plugins: [],
}
