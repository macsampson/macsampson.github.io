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
            // Sizes come from custom properties so the whole scale can step up
            // on small screens in one place (see index.css). Desktop values are
            // 15 / 14.4 / 13.5 / 10px.
            fontSize: {
                base: ['var(--fs-base)', '1.6'],
                meta: ['var(--fs-meta)', '1.6'],
                small: ['var(--fs-small)', '1.6'],
                kicker: ['var(--fs-kicker)', '1.4'],
            },
            maxWidth: {
                measure: '720px',
            },
        },
    },
    plugins: [],
}
