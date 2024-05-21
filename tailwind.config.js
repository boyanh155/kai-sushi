/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/_pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "golden": "linear-gradient(0deg, #8C773E 26.32%, rgba(215, 206, 184, 0.88) 100%)",
            },
            colors: {
                "golden": "#8C773E",
                "golden-1": "#8C773E",
                "subtle-1": "#959595",
            },

            animation: {
                "bounce-fade-in": "_bounce-fade-in 1s linear infinite",
            },
            keyframes: {
                "_bounce-fade-in": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-10px)"
                    },
                    "50%": {
                        opacity: 1,
                        transform: "translateY(0)"
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(-10px)"
                    }
                },
            },
            screens: {
                "xxs": "380px",
            }
        },

    },
    plugins: [require('daisyui')],
    daisyui: { themes: ['winter'] }
}