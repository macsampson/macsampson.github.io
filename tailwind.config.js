/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1a1a1a',       // Near-black text
                primaryHover: '#000000',  // Black hover
                secondary: '#7c736a',     // Warm muted gray
                background: '#f8f6f3',    // Warm white
                glass: 'rgba(255, 255, 255, 0.9)',
                glassBorder: 'rgba(0, 0, 0, 0.08)',
            },
            fontFamily: {
                spectral: ['Spectral', 'serif'],
                merriweather: ['Merriweather', 'serif'],
            },
        },
    },
    plugins: [],
}
