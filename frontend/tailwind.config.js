/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                'pop-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '50%': { opacity: '1', transform: 'scale(1.02)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'envelope-reveal': {
                    '0%': { opacity: '0', transform: 'translateY(100%) scale(0.5)' },
                    '60%': { opacity: '1', transform: 'translateY(-10px) scale(1.02)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                }
            },
            animation: {
                'pop-in': 'pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'envelope-reveal': 'envelope-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }
        },
    },
    plugins: [],
}
