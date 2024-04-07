/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main_color: "var(--text-primary-color)",
            },
            screens: {
                'xs': '320px',
            },
        },
    },
    plugins: [],
}