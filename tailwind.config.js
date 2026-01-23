/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#463a2e',
                primaryHover: '#4d3219',
                secondary: '#e2d9c9',
                glass: 'rgba(255, 255, 255, 0.1)',
                glassBorder: 'rgba(255, 255, 255, 0.2)',
            },
            fontFamily: {
                spectral: ['Spectral', 'serif'],
                merriweather: ['Merriweather', 'serif'],
            },
        },
    },
    plugins: [],
}
