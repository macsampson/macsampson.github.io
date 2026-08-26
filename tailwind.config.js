/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#fdfaf6',  // Cream
                primary: '#1c1917',     // Near-black, headings and titles
                body: '#585654',        // Softer neutral grey, body copy
                secondary: '#605d59',   // Metadata
                rule: '#e7e5e4',        // Hairline borders
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                display: ['Satoshi', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            fontSize: {
                base: ['15px', '1.6'],
                small: ['13.5px', '1.6'],
                kicker: ['10px', '1.4'],
            },
            maxWidth: {
                measure: '720px',
            },
        },
    },
    plugins: [],
}
